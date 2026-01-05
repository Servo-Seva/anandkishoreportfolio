import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

function json(res: any, status: number, body: unknown) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(body));
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function escapeHtml(input: unknown) {
  return String(input)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function devContactApi(opts: {
  resendApiKey?: string;
  toEmail?: string;
  fromEmail?: string;
}) {
  return {
    name: "dev-contact-api",
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        if (req.url !== "/api/contact") return next();
        if (req.method !== "POST") {
          res.setHeader("Allow", "POST");
          return json(res, 405, { ok: false, error: "Method not allowed" });
        }

        const apiKey = opts.resendApiKey;
        if (!isNonEmptyString(apiKey)) {
          return json(res, 500, {
            ok: false,
            error: "Missing RESEND_API_KEY for local dev",
          });
        }

        const chunks: Uint8Array[] = [];
        req.on("data", (chunk: Uint8Array) => chunks.push(chunk));
        req.on("end", async () => {
          let payload: any;
          try {
            const raw = Buffer.concat(chunks).toString("utf8");
            payload = raw ? JSON.parse(raw) : {};
          } catch {
            return json(res, 400, { ok: false, error: "Invalid JSON" });
          }

          const name = isNonEmptyString(payload?.name)
            ? payload.name.trim()
            : "";
          const email = isNonEmptyString(payload?.email)
            ? payload.email.trim()
            : "";
          const message = isNonEmptyString(payload?.message)
            ? payload.message.trim()
            : "";

          if (!name || !email || !message) {
            return json(res, 400, { ok: false, error: "Missing fields" });
          }

          if (
            name.length > 100 ||
            email.length > 200 ||
            message.length > 5000
          ) {
            return json(res, 400, { ok: false, error: "Input too long" });
          }

          const to = isNonEmptyString(opts.toEmail)
            ? opts.toEmail
            : "anandkishore060@gmail.com";
          const from = isNonEmptyString(opts.fromEmail)
            ? opts.fromEmail
            : "onboarding@resend.dev";
          const subject = `New portfolio inquiry: ${name}`;

          const safeName = escapeHtml(name);
          const safeEmail = escapeHtml(email);
          const safeMessage = escapeHtml(message);
          const receivedAt = new Date().toISOString();

          const text = `New message from your portfolio\n\nName: ${name}\nEmail: ${email}\nReceived: ${receivedAt}\n\nMessage:\n${message}`;

          const html = `
            <div style="background:#f6f7fb;padding:24px">
              <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e7e9ee;border-radius:12px;overflow:hidden">
                <div style="padding:20px 24px;border-bottom:1px solid #e7e9ee;background:#ffffff">
                  <p style="margin:0;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#6b7280">Portfolio Contact</p>
                  <h1 style="margin:6px 0 0;font-size:18px;line-height:1.3;color:#111827">New inquiry received</h1>
                </div>

                <div style="padding:20px 24px">
                  <table role="presentation" style="width:100%;border-collapse:separate;border-spacing:0 10px">
                    <tr>
                      <td style="width:120px;color:#6b7280;font-size:13px">From</td>
                      <td style="color:#111827;font-size:13px;font-weight:600">${safeName}</td>
                    </tr>
                    <tr>
                      <td style="width:120px;color:#6b7280;font-size:13px">Email</td>
                      <td style="color:#111827;font-size:13px"><a href="mailto:${safeEmail}" style="color:#2563eb;text-decoration:none">${safeEmail}</a></td>
                    </tr>
                    <tr>
                      <td style="width:120px;color:#6b7280;font-size:13px">Received</td>
                      <td style="color:#111827;font-size:13px">${escapeHtml(
                        receivedAt
                      )}</td>
                    </tr>
                  </table>

                  <div style="margin-top:12px">
                    <p style="margin:0 0 8px;color:#6b7280;font-size:13px">Message</p>
                    <div style="background:#f9fafb;border:1px solid #e7e9ee;border-radius:10px;padding:14px">
                      <div style="white-space:pre-wrap;color:#111827;font-size:14px;line-height:1.55">${safeMessage}</div>
                    </div>
                  </div>
                </div>

                <div style="padding:14px 24px;border-top:1px solid #e7e9ee;background:#ffffff">
                  <p style="margin:0;color:#6b7280;font-size:12px">Reply to this email to respond (Reply-To is set to the sender).</p>
                </div>
              </div>
            </div>
          `;

          try {
            const response = await fetch("https://api.resend.com/emails", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                from,
                to,
                subject,
                html,
                text,
                reply_to: email,
              }),
            });

            if (!response.ok) {
              const text = await response.text().catch(() => "");
              return json(res, 502, {
                ok: false,
                error: "Email provider error",
                details: text.slice(0, 500),
              });
            }

            return json(res, 200, { ok: true });
          } catch {
            return json(res, 502, { ok: false, error: "Failed to send" });
          }
        });
      });
    },
  };
}

function devBookCallApi(opts: {
  serviceAccountEmail?: string;
  privateKey?: string;
  calendarId?: string;
  timeZone?: string;
  impersonateUser?: string;
  resendApiKey?: string;
}) {
  const TIME_STEP_MINUTES = 30;
  const pad2 = (n: number) => String(n).padStart(2, "0");

  const minutesToTimeLabel = (totalMinutes: number) => {
    const hours24 = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const period = hours24 >= 12 ? "PM" : "AM";
    const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
    return `${pad2(hours12)}:${pad2(minutes)} ${period}`;
  };

  const convertTo24Hour = (timeLabel: string) => {
    const [hourMin, period] = timeLabel.split(" ");
    let [hours, minutes] = hourMin.split(":").map(Number);
    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;
    return `${pad2(hours)}:${pad2(minutes)}:00`;
  };

  const formatLocalDateTime = (date: Date) => {
    return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(
      date.getDate()
    )}T${pad2(date.getHours())}:${pad2(date.getMinutes())}:${pad2(
      date.getSeconds()
    )}`;
  };

  const addMinutesToLocalDateTime = (
    dateValue: string,
    time24: string,
    minutesToAdd: number
  ) => {
    const [y, m, d] = dateValue.split("-").map(Number);
    const [hh, mm, ss] = time24.split(":").map(Number);

    const base = new Date(Date.UTC(y, m - 1, d, hh, mm, ss || 0));
    const added = new Date(base.getTime() + minutesToAdd * 60 * 1000);

    const dateOut = `${added.getUTCFullYear()}-${pad2(
      added.getUTCMonth() + 1
    )}-${pad2(added.getUTCDate())}`;
    const timeOut = `${pad2(added.getUTCHours())}:${pad2(
      added.getUTCMinutes()
    )}:${pad2(added.getUTCSeconds())}`;

    return { date: dateOut, time24: timeOut };
  };

  const generateTimeSlots = (startMinutes: number, endMinutes: number) => {
    const slots: string[] = [];
    for (
      let minutes = startMinutes;
      minutes < endMinutes;
      minutes += TIME_STEP_MINUTES
    ) {
      slots.push(minutesToTimeLabel(minutes));
    }
    return slots;
  };

  const isSameDate = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const getAllowedSlotsForDate = (dateObj: Date) => {
    const day = dateObj.getDay();
    const isWeekend = day === 0 || day === 6;

    if (isWeekend) return generateTimeSlots(0, 24 * 60);

    return [
      ...generateTimeSlots(9 * 60, 11 * 60),
      ...generateTimeSlots(18 * 60, 21 * 60),
    ];
  };

  const getTimeSlotsForDate = (dateValue: string) => {
    if (!dateValue) return [];
    const dateObj = new Date(`${dateValue}T00:00:00`);
    const baseSlots = getAllowedSlotsForDate(dateObj);

    const now = new Date();
    if (!isSameDate(dateObj, now)) return baseSlots;

    return baseSlots.filter(
      (slot) =>
        new Date(`${dateValue}T${convertTo24Hour(slot)}`).getTime() >
        now.getTime()
    );
  };

  return {
    name: "dev-book-call-api",
    configureServer(server: any) {
      server.middlewares.use((req: any, res: any, next: any) => {
        if (req.url !== "/api/book-call") return next();
        if (req.method !== "POST") {
          res.setHeader("Allow", "POST");
          return json(res, 405, { ok: false, error: "Method not allowed" });
        }

        if (
          !isNonEmptyString(opts.serviceAccountEmail) ||
          !isNonEmptyString(opts.privateKey) ||
          !isNonEmptyString(opts.calendarId)
        ) {
          return json(res, 500, {
            ok: false,
            error: "Missing Google Calendar env vars for local dev",
          });
        }

        const chunks: Uint8Array[] = [];
        req.on("data", (chunk: Uint8Array) => chunks.push(chunk));
        req.on("end", async () => {
          let payload: any;
          try {
            const raw = Buffer.concat(chunks).toString("utf8");
            payload = raw ? JSON.parse(raw) : {};
          } catch {
            return json(res, 400, { ok: false, error: "Invalid JSON" });
          }

          const name = isNonEmptyString(payload?.name)
            ? payload.name.trim()
            : "";
          const email = isNonEmptyString(payload?.email)
            ? payload.email.trim()
            : "";
          const topic = isNonEmptyString(payload?.topic)
            ? payload.topic.trim()
            : "";
          const selectedDate = isNonEmptyString(payload?.selectedDate)
            ? payload.selectedDate.trim()
            : "";
          const selectedTime = isNonEmptyString(payload?.selectedTime)
            ? payload.selectedTime.trim()
            : "";

          if (!name || !email || !selectedDate || !selectedTime) {
            return json(res, 400, { ok: false, error: "Missing fields" });
          }

          if (!/^\d{4}-\d{2}-\d{2}$/.test(selectedDate)) {
            return json(res, 400, { ok: false, error: "Invalid date" });
          }

          const allowedSlots = getTimeSlotsForDate(selectedDate);
          if (!allowedSlots.includes(selectedTime)) {
            return json(res, 400, { ok: false, error: "Invalid time" });
          }

          const now = new Date();
          const startDate = new Date(
            `${selectedDate}T${convertTo24Hour(selectedTime)}`
          );
          const end = addMinutesToLocalDateTime(
            selectedDate,
            convertTo24Hour(selectedTime),
            30
          );
          if (!(startDate.getTime() > now.getTime())) {
            return json(res, 400, {
              ok: false,
              error: "Time must be in the future",
            });
          }

          try {
            const privateKey = opts.privateKey;
            const serviceAccountEmail = opts.serviceAccountEmail;
            const calendarId = opts.calendarId;
            const timeZone = opts.timeZone;
            const impersonateUser = opts.impersonateUser;

            if (
              !isNonEmptyString(privateKey) ||
              !isNonEmptyString(serviceAccountEmail) ||
              !isNonEmptyString(calendarId)
            ) {
              return json(res, 500, {
                ok: false,
                error: "Missing Google Calendar env vars for local dev",
              });
            }

            const [googleModule, crypto] = await Promise.all([
              (new Function('return import("googleapis")') as any)(),
              import("node:crypto"),
            ]);
            const { google } = googleModule as any;

            const auth = new google.auth.JWT({
              email: serviceAccountEmail,
              key: privateKey.replace(/\\n/g, "\n"),
              scopes: ["https://www.googleapis.com/auth/calendar"],
              subject: isNonEmptyString(impersonateUser)
                ? impersonateUser
                : undefined,
            });

            const calendar = google.calendar({ version: "v3", auth });
            const requestId = crypto.randomUUID();

            const summary = topic
              ? `Discovery Call: ${topic}`
              : `Discovery Call with ${name}`;
            const description = [
              "Booked via anandportfolio.site",
              "",
              `Name: ${name}`,
              `Email: ${email}`,
              topic ? `Topic: ${topic}` : undefined,
            ]
              .filter(Boolean)
              .join("\n");

            const tz = opts.timeZone || "Asia/Kolkata";
            const offset = "+05:30";

            const startDateTime = `${selectedDate}T${convertTo24Hour(
              selectedTime
            )}${offset}`;
            const endDateTime = `${end.date}T${end.time24}${offset}`;

            const inviteAttendee = isNonEmptyString(impersonateUser);

            const baseEventBody = {
              summary,
              description,
              start: {
                dateTime: startDateTime,
                timeZone: tz,
              },
              end: {
                dateTime: endDateTime,
                timeZone: tz,
              },
              ...(inviteAttendee ? { attendees: [{ email }] } : {}),
            };

            let result: any;
            let meetLink: string | null = null;

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

              const event: any = result.data;
              meetLink =
                event?.hangoutLink ||
                event?.conferenceData?.entryPoints?.find(
                  (e: any) => e.entryPointType === "video"
                )?.uri ||
                null;
            } catch (meetErr: any) {
              // If Meet creation fails (e.g., personal Gmail), create event without Meet
              const meetErrMsg =
                meetErr?.response?.data?.error?.message ||
                meetErr?.message ||
                "";
              if (
                meetErrMsg.toLowerCase().includes("conference") ||
                meetErr?.code === 400
              ) {
                result = await calendar.events.insert({
                  calendarId,
                  requestBody: baseEventBody,
                  sendUpdates: inviteAttendee ? "all" : "none",
                });
              } else {
                throw meetErr;
              }
            }

            const event: any = result.data;
            const eventLink = event?.htmlLink || null;

            // Send email notifications via Resend
            const resendApiKey = opts.resendApiKey;
            const ownerEmail = "anandkishore060@gmail.com";

            // Format date for email
            const dateFormatted = new Date(selectedDate).toLocaleDateString(
              "en-IN",
              {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              }
            );

            if (isNonEmptyString(resendApiKey)) {
              // Owner notification email
              const ownerEmailHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:'Segoe UI',sans-serif;">
  <div style="max-width:600px;margin:40px auto;background:#1a1a2e;border-radius:16px;overflow:hidden;">
    <div style="background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);padding:30px;text-align:center;">
      <h1 style="margin:0;color:#fff;font-size:24px;">📅 New Call Booking!</h1>
    </div>
    <div style="padding:40px;color:#a0aec0;">
      <p><strong style="color:#fff;">Name:</strong> ${name}</p>
      <p><strong style="color:#fff;">Email:</strong> <a href="mailto:${email}" style="color:#667eea;">${email}</a></p>
      <p><strong style="color:#fff;">Date:</strong> ${dateFormatted}</p>
      <p><strong style="color:#fff;">Time:</strong> ${selectedTime} IST</p>
      ${
        topic
          ? `<p><strong style="color:#fff;">Topic:</strong> ${topic}</p>`
          : ""
      }
      ${
        eventLink
          ? `<p><a href="${eventLink}" style="color:#667eea;">View in Calendar</a></p>`
          : ""
      }
      ${
        meetLink
          ? `<p><a href="${meetLink}" style="color:#10b981;">Join Meet</a></p>`
          : ""
      }
    </div>
  </div>
</body>
</html>`;

              // Booker confirmation email
              const bookerEmailHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:'Segoe UI',sans-serif;">
  <div style="max-width:600px;margin:40px auto;background:#1a1a2e;border-radius:16px;overflow:hidden;">
    <div style="background:linear-gradient(135deg,#10b981 0%,#059669 100%);padding:30px;text-align:center;">
      <h1 style="margin:0;color:#fff;font-size:24px;">✅ Call Confirmed!</h1>
    </div>
    <div style="padding:40px;color:#a0aec0;">
      <p style="color:#fff;font-size:18px;">Hi ${name}!</p>
      <p>Your discovery call with Anand Kishore has been scheduled:</p>
      <p><strong style="color:#fff;">Date:</strong> ${dateFormatted}</p>
      <p><strong style="color:#fff;">Time:</strong> ${selectedTime} IST</p>
      <p><strong style="color:#fff;">Duration:</strong> 30 minutes</p>
      ${
        meetLink
          ? `<p><a href="${meetLink}" style="display:inline-block;background:#10b981;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;margin-top:16px;">🎥 Join Google Meet</a></p>`
          : eventLink
          ? `<p><a href="${eventLink}" style="display:inline-block;background:#10b981;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;margin-top:16px;">📅 View Calendar Event</a></p><p style="color:#fbbf24;margin-top:12px;">📌 A Google Meet link will be shared before the call.</p>`
          : `<p style="color:#fbbf24;">📌 A meeting link will be sent to you separately.</p>`
      }
      <p style="margin-top:24px;">Looking forward to speaking with you!</p>
    </div>
  </div>
</body>
</html>`;

              // Send emails and await them
              await Promise.all([
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
                }).catch(() => null),
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
                }).catch(() => null),
              ]);
            }

            return json(res, 200, {
              ok: true,
              meetLink,
              eventLink,
              eventId: event?.id || null,
            });
          } catch (err: any) {
            const status = err?.code || err?.response?.status;
            const message =
              err?.response?.data?.error?.message ||
              err?.message ||
              "Unknown error";
            return json(res, 502, {
              ok: false,
              error: "Failed to create meeting",
              status: status || null,
              details: String(message).slice(0, 500),
            });
          }
        });
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const resendApiKey = env.RESEND_API_KEY || process.env.RESEND_API_KEY;
  const toEmail = env.CONTACT_TO_EMAIL || process.env.CONTACT_TO_EMAIL;
  const fromEmail = env.RESEND_FROM_EMAIL || process.env.RESEND_FROM_EMAIL;

  const googleServiceAccountEmail =
    env.GOOGLE_SERVICE_ACCOUNT_EMAIL ||
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const googlePrivateKey =
    env.GOOGLE_PRIVATE_KEY || process.env.GOOGLE_PRIVATE_KEY;
  const googleCalendarId =
    env.GOOGLE_CALENDAR_ID || process.env.GOOGLE_CALENDAR_ID;
  const googleTimeZone =
    env.GOOGLE_CALENDAR_TIMEZONE || process.env.GOOGLE_CALENDAR_TIMEZONE;
  const googleImpersonateUser =
    env.GOOGLE_IMPERSONATE_USER || process.env.GOOGLE_IMPERSONATE_USER;

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      mode === "development" && componentTagger(),
      mode === "development" &&
        devContactApi({ resendApiKey, toEmail, fromEmail }),
      mode === "development" &&
        devBookCallApi({
          serviceAccountEmail: googleServiceAccountEmail,
          privateKey: googlePrivateKey,
          calendarId: googleCalendarId,
          timeZone: googleTimeZone,
          impersonateUser: googleImpersonateUser,
          resendApiKey: resendApiKey,
        }),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
