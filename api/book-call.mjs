function isNonEmptyString(value) {
    return typeof value === "string" && value.trim().length > 0;
}

function json(res, status, body) {
    res.statusCode = status;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(JSON.stringify(body));
}

function minutesToTimeLabel(totalMinutes) {
    const hours24 = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const period = hours24 >= 12 ? "PM" : "AM";
    const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
    const pad2 = (n) => String(n).padStart(2, "0");
    return `${pad2(hours12)}:${pad2(minutes)} ${period}`;
}

function convertTo24Hour(timeLabel) {
    const [hourMin, period] = timeLabel.split(" ");
    let [hours, minutes] = hourMin.split(":").map(Number);
    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`;
}

function generateTimeSlots(startMinutes, endMinutes, stepMinutes) {
    const slots = [];
    for (let minutes = startMinutes; minutes < endMinutes; minutes += stepMinutes) {
        slots.push(minutesToTimeLabel(minutes));
    }
    return slots;
}

function pad2(n) {
    return String(n).padStart(2, "0");
}

function formatLocalDateTime(date) {
    return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}T${pad2(
        date.getHours(),
    )}:${pad2(date.getMinutes())}:${pad2(date.getSeconds())}`;
}

function addMinutesToLocalDateTime(dateValue, time24, minutesToAdd) {
    const [y, m, d] = dateValue.split("-").map(Number);
    const [hh, mm, ss] = time24.split(":").map(Number);

    // Treat the provided date/time as a naive local time and do arithmetic in UTC.
    // We'll later add an explicit offset (default +05:30) in the RFC3339 string.
    const base = new Date(Date.UTC(y, m - 1, d, hh, mm, ss || 0));
    const added = new Date(base.getTime() + minutesToAdd * 60 * 1000);

    const dateOut = `${added.getUTCFullYear()}-${pad2(added.getUTCMonth() + 1)}-${pad2(
        added.getUTCDate(),
    )}`;
    const timeOut = `${pad2(added.getUTCHours())}:${pad2(added.getUTCMinutes())}:${pad2(
        added.getUTCSeconds(),
    )}`;

    return { date: dateOut, time24: timeOut };
}

function getAllowedSlotsForDate(dateObj) {
    const step = 30;
    const day = dateObj.getDay();
    const isWeekend = day === 0 || day === 6;

    if (isWeekend) {
        return generateTimeSlots(0, 24 * 60, step);
    }

    return [
        ...generateTimeSlots(9 * 60, 11 * 60, step),
        ...generateTimeSlots(18 * 60, 21 * 60, step),
    ];
}

export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.setHeader("Allow", "POST");
        return json(res, 405, { ok: false, error: "Method not allowed" });
    }

    const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKeyRaw = process.env.GOOGLE_PRIVATE_KEY;
    const calendarId = process.env.GOOGLE_CALENDAR_ID;
    const timeZone = process.env.GOOGLE_CALENDAR_TIMEZONE || "Asia/Kolkata";
    const utcOffset = process.env.GOOGLE_CALENDAR_UTC_OFFSET || "+05:30";
    const impersonateUser = process.env.GOOGLE_IMPERSONATE_USER;

    if (!isNonEmptyString(serviceAccountEmail) || !isNonEmptyString(privateKeyRaw) || !isNonEmptyString(calendarId)) {
        return json(res, 500, { ok: false, error: "Server not configured" });
    }

    let payload;
    try {
        payload = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    } catch {
        return json(res, 400, { ok: false, error: "Invalid JSON" });
    }

    const name = isNonEmptyString(payload?.name) ? payload.name.trim() : "";
    const email = isNonEmptyString(payload?.email) ? payload.email.trim() : "";
    const topic = isNonEmptyString(payload?.topic) ? payload.topic.trim() : "";
    const selectedDate = isNonEmptyString(payload?.selectedDate) ? payload.selectedDate.trim() : "";
    const selectedTime = isNonEmptyString(payload?.selectedTime) ? payload.selectedTime.trim() : "";

    if (!name || !email || !selectedDate || !selectedTime) {
        return json(res, 400, { ok: false, error: "Missing fields" });
    }

    if (name.length > 100 || email.length > 200 || topic.length > 200) {
        return json(res, 400, { ok: false, error: "Input too long" });
    }

    // Basic date format guard: YYYY-MM-DD
    if (!/^\d{4}-\d{2}-\d{2}$/.test(selectedDate)) {
        return json(res, 400, { ok: false, error: "Invalid date" });
    }

    const dateObj = new Date(`${selectedDate}T00:00:00`);
    if (Number.isNaN(dateObj.getTime())) {
        return json(res, 400, { ok: false, error: "Invalid date" });
    }

    const allowedSlots = getAllowedSlotsForDate(dateObj);
    if (!allowedSlots.includes(selectedTime)) {
        return json(res, 400, { ok: false, error: "Invalid time" });
    }

    const now = new Date();
    const startIsoLocal = `${selectedDate}T${convertTo24Hour(selectedTime)}`;
    const startDate = new Date(startIsoLocal);
    const end = addMinutesToLocalDateTime(selectedDate, convertTo24Hour(selectedTime), 30);

    if (!(startDate.getTime() > now.getTime())) {
        return json(res, 400, { ok: false, error: "Time must be in the future" });
    }

    // Lazy-load to keep cold start smaller when misconfigured.
    const [{ google }, crypto] = await Promise.all([
        import("googleapis"),
        import("node:crypto"),
    ]);

    const privateKey = privateKeyRaw.replace(/\\n/g, "\n");
    const auth = new google.auth.JWT({
        email: serviceAccountEmail,
        key: privateKey,
        scopes: ["https://www.googleapis.com/auth/calendar"],
        subject: isNonEmptyString(impersonateUser) ? impersonateUser : undefined,
    });

    const calendar = google.calendar({ version: "v3", auth });
    const requestId = crypto.randomUUID();

    const summary = topic ? `Discovery Call: ${topic}` : `Discovery Call with ${name}`;
    const description = [
        "Booked via anandportfolio.site",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        topic ? `Topic: ${topic}` : undefined,
    ]
        .filter(Boolean)
        .join("\n");

    try {
        const startDateTime = `${selectedDate}T${convertTo24Hour(selectedTime)}${utcOffset}`;
        const endDateTime = `${end.date}T${end.time24}${utcOffset}`;

        const inviteAttendee = isNonEmptyString(impersonateUser);

        const baseEventBody = {
            summary,
            description,
            start: {
                dateTime: startDateTime,
                timeZone,
            },
            end: {
                dateTime: endDateTime,
                timeZone,
            },
            ...(inviteAttendee ? { attendees: [{ email }] } : {}),
        };

        let result;
        let meetLink = null;

        // Try creating with Google Meet first
        try {
            result = await calendar.events.insert({
                calendarId,
                conferenceDataVersion: 1,
                requestBody: {
                    ...baseEventBody,
                    conferenceData: {
                        createRequest: {
                            requestId,
                            conferenceSolutionKey: { type: "hangoutsMeet" },
                        },
                    },
                },
                sendUpdates: inviteAttendee ? "all" : "none",
            });

            const event = result.data;
            meetLink = event?.hangoutLink || event?.conferenceData?.entryPoints?.find((e) => e.entryPointType === "video")?.uri || null;
        } catch (meetErr) {
            // If Meet creation fails (e.g., personal Gmail), create event without Meet
            const meetErrMsg = meetErr?.response?.data?.error?.message || meetErr?.message || "";
            if (meetErrMsg.toLowerCase().includes("conference") || meetErr?.code === 400) {
                result = await calendar.events.insert({
                    calendarId,
                    requestBody: baseEventBody,
                    sendUpdates: inviteAttendee ? "all" : "none",
                });
            } else {
                throw meetErr;
            }
        }

        const event = result.data;
        const eventLink = event?.htmlLink || null;

        // Send email notifications via Resend
        const resendApiKey = process.env.RESEND_API_KEY;
        const ownerEmail = "anandkishore060@gmail.com";

        // Format date/time for email
        const dateFormatted = new Date(selectedDate).toLocaleDateString("en-IN", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });

        if (isNonEmptyString(resendApiKey)) {
            const emailPromises = [];

            // Email to YOU (the owner) - notification of new booking
            const ownerEmailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0a;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#1a1a2e 0%,#16213e 100%);border-radius:16px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,0.5);">
          
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);padding:30px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:600;">📅 New Call Booking!</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding:40px;">
              <p style="color:#a0aec0;font-size:16px;margin:0 0 24px 0;">Someone has booked a discovery call with you:</p>
              
              <!-- Booking Details Card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(255,255,255,0.05);border-radius:12px;border:1px solid rgba(255,255,255,0.1);margin-bottom:24px;">
                <tr>
                  <td style="padding:24px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.1);">
                          <span style="color:#667eea;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Name</span><br>
                          <span style="color:#ffffff;font-size:16px;font-weight:500;">${name}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.1);">
                          <span style="color:#667eea;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Email</span><br>
                          <a href="mailto:${email}" style="color:#ffffff;font-size:16px;font-weight:500;text-decoration:none;">${email}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.1);">
                          <span style="color:#667eea;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Date</span><br>
                          <span style="color:#ffffff;font-size:16px;font-weight:500;">${dateFormatted}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.1);">
                          <span style="color:#667eea;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Time</span><br>
                          <span style="color:#ffffff;font-size:16px;font-weight:500;">${selectedTime} IST</span>
                        </td>
                      </tr>
                      ${topic ? `
                      <tr>
                        <td style="padding:8px 0;">
                          <span style="color:#667eea;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Topic</span><br>
                          <span style="color:#ffffff;font-size:16px;font-weight:500;">${topic}</span>
                        </td>
                      </tr>
                      ` : ""}
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- Action Buttons -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  ${eventLink ? `<td style="padding-right:8px;">
                    <a href="${eventLink}" style="display:block;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:#ffffff;text-decoration:none;padding:14px 24px;border-radius:8px;font-weight:600;text-align:center;">View in Calendar</a>
                  </td>` : ""}
                  ${meetLink ? `<td style="padding-left:8px;">
                    <a href="${meetLink}" style="display:block;background:rgba(255,255,255,0.1);color:#ffffff;text-decoration:none;padding:14px 24px;border-radius:8px;font-weight:600;text-align:center;border:1px solid rgba(255,255,255,0.2);">Join Meet</a>
                  </td>` : ""}
                </tr>
              </table>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

            // Email to BOOKER - confirmation
            const bookerEmailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0a;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#1a1a2e 0%,#16213e 100%);border-radius:16px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,0.5);">
          
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#10b981 0%,#059669 100%);padding:30px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:600;">✅ Call Confirmed!</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding:40px;">
              <p style="color:#ffffff;font-size:18px;margin:0 0 8px 0;">Hi ${name}!</p>
              <p style="color:#a0aec0;font-size:16px;margin:0 0 24px 0;">Your discovery call with Anand Kishore has been scheduled. Here are your booking details:</p>
              
              <!-- Booking Details Card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(255,255,255,0.05);border-radius:12px;border:1px solid rgba(255,255,255,0.1);margin-bottom:24px;">
                <tr>
                  <td style="padding:24px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.1);">
                          <span style="color:#10b981;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Date</span><br>
                          <span style="color:#ffffff;font-size:16px;font-weight:500;">${dateFormatted}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.1);">
                          <span style="color:#10b981;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Time</span><br>
                          <span style="color:#ffffff;font-size:16px;font-weight:500;">${selectedTime} IST</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;">
                          <span style="color:#10b981;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Duration</span><br>
                          <span style="color:#ffffff;font-size:16px;font-weight:500;">30 minutes</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              ${meetLink ? `
              <!-- Meet Link -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                <tr>
                  <td>
                    <a href="${meetLink}" style="display:block;background:linear-gradient(135deg,#10b981 0%,#059669 100%);color:#ffffff;text-decoration:none;padding:16px 24px;border-radius:8px;font-weight:600;text-align:center;font-size:16px;">🎥 Join Google Meet</a>
                  </td>
                </tr>
              </table>
              ` : eventLink ? `
              <!-- Calendar Event Link -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                <tr>
                  <td>
                    <a href="${eventLink}" style="display:block;background:linear-gradient(135deg,#10b981 0%,#059669 100%);color:#ffffff;text-decoration:none;padding:16px 24px;border-radius:8px;font-weight:600;text-align:center;font-size:16px;">📅 View Calendar Event</a>
                  </td>
                </tr>
              </table>
              <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(245,158,11,0.1);border-radius:8px;border:1px solid rgba(245,158,11,0.3);margin-bottom:24px;">
                <tr>
                  <td style="padding:16px;">
                    <p style="color:#fbbf24;margin:0;font-size:14px;">📌 A Google Meet link will be shared with you before the call.</p>
                  </td>
                </tr>
              </table>
              ` : `
              <!-- No Meet Link Note -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(245,158,11,0.1);border-radius:8px;border:1px solid rgba(245,158,11,0.3);margin-bottom:24px;">
                <tr>
                  <td style="padding:16px;">
                    <p style="color:#fbbf24;margin:0;font-size:14px;">📌 A meeting link will be sent to you separately before the call.</p>
                  </td>
                </tr>
              </table>
              `}
              
              <p style="color:#a0aec0;font-size:14px;margin:0;">Looking forward to speaking with you!</p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px;border-top:1px solid rgba(255,255,255,0.1);">
              <p style="color:#64748b;font-size:12px;margin:0;text-align:center;">
                Anand Kishore • <a href="https://anandportfolio.site" style="color:#64748b;">anandportfolio.site</a>
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

            // Send email to owner
            emailPromises.push(
                fetch("https://api.resend.com/emails", {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${resendApiKey}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        from: "Booking <noreply@anandportfolio.site>",
                        to: [ownerEmail],
                        subject: `📅 New Booking: ${name} - ${dateFormatted} at ${selectedTime}`,
                        html: ownerEmailHtml,
                    }),
                }).catch(() => null)
            );

            // Send confirmation to booker
            emailPromises.push(
                fetch("https://api.resend.com/emails", {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${resendApiKey}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        from: "Anand Kishore <noreply@anandportfolio.site>",
                        to: [email],
                        subject: `✅ Your call with Anand is confirmed - ${dateFormatted}`,
                        html: bookerEmailHtml,
                    }),
                }).catch(() => null)
            );

            // Don't await - let emails send in background (don't block response)
            await Promise.all(emailPromises);
        }

        return json(res, 200, {
            ok: true,
            meetLink,
            eventLink,
            eventId: event?.id || null,
            emailsSent: true,
        });
    } catch (err) {
        const status = err?.code || err?.response?.status;
        const message = err?.response?.data?.error?.message || err?.message || "Unknown error";
        return json(res, 502, {
            ok: false,
            error: "Failed to create meeting",
            status: status || null,
            details: String(message).slice(0, 500),
        });
    }
}
