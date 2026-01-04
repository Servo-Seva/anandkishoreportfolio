const DEFAULT_TO_EMAIL = "anandkishore060@gmail.com";

function isNonEmptyString(value) {
    return typeof value === "string" && value.trim().length > 0;
}

function json(res, status, body) {
    res.statusCode = status;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(JSON.stringify(body));
}

export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.setHeader("Allow", "POST");
        return json(res, 405, { ok: false, error: "Method not allowed" });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!isNonEmptyString(apiKey)) {
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
    const message = isNonEmptyString(payload?.message) ? payload.message.trim() : "";

    if (!name || !email || !message) {
        return json(res, 400, { ok: false, error: "Missing fields" });
    }

    if (name.length > 100 || email.length > 200 || message.length > 5000) {
        return json(res, 400, { ok: false, error: "Input too long" });
    }

    const to = isNonEmptyString(process.env.CONTACT_TO_EMAIL)
        ? process.env.CONTACT_TO_EMAIL
        : DEFAULT_TO_EMAIL;

    const from = isNonEmptyString(process.env.RESEND_FROM_EMAIL)
        ? process.env.RESEND_FROM_EMAIL
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
              <td style="color:#111827;font-size:13px">${escapeHtml(receivedAt)}</td>
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
            return json(res, 502, { ok: false, error: "Email provider error", details: text.slice(0, 500) });
        }

        return json(res, 200, { ok: true });
    } catch {
        return json(res, 502, { ok: false, error: "Failed to send" });
    }
}

function escapeHtml(input) {
    return String(input)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}
