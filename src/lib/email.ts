"use server";

import nodemailer from "nodemailer";
const { EMAIL, EMAIL_PASSWORD, EMAIL_CLIENT, ADMIN_EMAIL_1, ADMIN_EMAIL_2 } =
  process.env;

function requiredEnv() {
  if (!EMAIL || !EMAIL_PASSWORD) {
    throw new Error("Email credentials are not configured");
  }
}

const transporter = (() => {
  requiredEnv();
  return nodemailer.createTransport({
    service: EMAIL_CLIENT || "gmail",
    auth: {
      user: EMAIL,
      pass: EMAIL_PASSWORD,
    },
  });
})();

type FieldValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | FieldValue[]
  | Record<string, unknown>;

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function renderFieldRows(data: Record<string, FieldValue>): string {
  const rows: string[] = [];

  const formatValue = (value: FieldValue): string => {
    if (value === null || value === undefined) return "—";
    if (Array.isArray(value)) return value.map(formatValue).join(", ");
    if (typeof value === "object") {
      return Object.entries(value as Record<string, FieldValue>)
        .map(([k, v]) => `${k}: ${formatValue(v)}`)
        .join("; ");
    }
    return String(value);
  };

  Object.entries(data).forEach(([label, value]) => {
    rows.push(`
      <tr>
        <td style="padding:8px 12px;border:1px solid #e5e7eb;background:#f8fafc;font-weight:600;color:#0f172a;">
          ${escapeHtml(label)}
        </td>
        <td style="padding:8px 12px;border:1px solid #e5e7eb;background:#ffffff;color:#0f172a;">
          ${escapeHtml(formatValue(value))}
        </td>
      </tr>
    `);
  });

  return rows.join("");
}

function baseTemplate({
  title,
  intro,
  fields,
  footerNote,
}: {
  title: string;
  intro: string;
  fields: Record<string, FieldValue>;
  footerNote?: string;
}) {
  const footer =
    footerNote ?? "We will get back to you shortly with a detailed response.";
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#f8fafc;padding:32px 0;">
      <tr>
        <td align="center">
          <table role="presentation" cellpadding="0" cellspacing="0" width="640" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 10px 40px rgba(15,23,42,0.08);">
            <tr>
              <td style="background:#0f172a;color:#ffffff;padding:28px 32px;font-family:Inter,Arial,sans-serif;">
                <div style="font-size:24px;font-weight:700;letter-spacing:-0.02em;">Elegant Travel and Tours</div>
                <div style="margin-top:6px;font-size:14px;color:#e2e8f0;">Delivering tailored experiences across Rwanda</div>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 32px;font-family:Inter,Arial,sans-serif;color:#0f172a;">
                <div style="font-size:20px;font-weight:700;margin-bottom:8px;">${escapeHtml(
                  title
                )}</div>
                <div style="font-size:15px;color:#475569;line-height:1.6;margin-bottom:20px;">
                  ${escapeHtml(intro)}
                </div>
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-size:14px;line-height:1.5;">
                  <tbody>
                    ${renderFieldRows(fields)}
                  </tbody>
                </table>
                <div style="margin-top:24px;padding:16px;border-radius:12px;background:#0ea5e910;color:#075985;font-size:14px;line-height:1.6;border:1px solid #0ea5e933;">
                  ${escapeHtml(footer)}
                </div>
              </td>
            </tr>
            <tr>
              <td style="background:#0f172a;color:#e2e8f0;padding:24px 32px;font-family:Inter,Arial,sans-serif;font-size:13px;line-height:1.6;">
                <div style="font-weight:600;color:#f8fafc;">Elegant Travel and Tours</div>
                <div>Kigali, Rwanda</div>
                <div><a href="https://elegantrwanda.rw" style="color:#38bdf8;text-decoration:none;">elegantrwanda.rw</a></div>
                <div style="margin-top:12px;color:#cbd5e1;">You are receiving this message because a request was submitted on elegantrwanda.rw.</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;
}

const formSubjectMap: Record<string, string> = {
  "air-travel": "New Air Travel Assistance Request",
  contact: "New Contact Form Submission",
  "cab-booking": "New Cab Booking Request",
  "car-rental": "New Car Rental Booking",
  "tour-booking": "New Tour Booking Request",
  inquiry: "New General Inquiry",
  "event-registration": "New Event Registration",
  "events-newsletter": "New Events Newsletter Signup",
  newsletter: "New Newsletter Signup",
};

export async function sendFormEmails({
  formType,
  data,
  userEmail,
  userName,
}: {
  formType: string;
  data: Record<string, FieldValue>;
  userEmail?: string;
  userName?: string;
}) {
  requiredEnv();

  const to = [EMAIL, ADMIN_EMAIL_1, ADMIN_EMAIL_2].filter(Boolean) as string[];
  if (!to.length) {
    throw new Error("No admin recipients configured");
  }

  const subject = formSubjectMap[formType] || `New ${formType} submission`;
  const adminHtml = baseTemplate({
    title: subject,
    intro:
      "A new request has been submitted on elegantrwanda.rw. Details are below:",
    fields: data,
    footerNote: "Please reply to the guest promptly with a tailored quotation.",
  });

  await transporter.sendMail({
    from: `Elegant Travel and Tours <${EMAIL}>`,
    to,
    subject,
    html: adminHtml,
    replyTo: userEmail || EMAIL,
  });

  if (userEmail) {
    const confirmationHtml = baseTemplate({
      title: "We have received your request",
      intro: `Hello ${
        userName || "there"
      }, thank you for reaching out to Elegant Travel and Tours. We have your request and will respond with a tailored quotation shortly.`,
      fields: data,
      footerNote:
        "Need immediate assistance? Reply to this email and our team will prioritize your request.",
    });

    await transporter.sendMail({
      from: `Elegant Travel and Tours <${EMAIL}>`,
      to: userEmail,
      subject: "We received your request",
      html: confirmationHtml,
      replyTo: EMAIL,
    });
  }
}
