"use server";

import nodemailer from "nodemailer";
import { getRequestDisplayConfig, getRequestDisplayRows } from "@/lib/request-display";

const { EMAIL, EMAIL_PASSWORD, EMAIL_CLIENT, ADMIN_EMAIL_1, ADMIN_EMAIL_2 } =
  process.env;

const formTypeToRequestType: Record<string, string> = {
  "air-travel": "AIR_TRAVEL",
  "cab-booking": "CAB_BOOKING",
  "car-rental": "CAR_RENTAL",
  "tour-booking": "TOUR_BOOKING",
  contact: "CONTACT",
  inquiry: "INQUIRY",
  "event-registration": "EVENT_REGISTRATION",
  "events-newsletter": "EVENTS_NEWSLETTER",
};

function getTransporter() {
  if (!EMAIL || !EMAIL_PASSWORD) {
    throw new Error("Email credentials are not configured (EMAIL, EMAIL_PASSWORD)");
  }
  return nodemailer.createTransport({
    service: EMAIL_CLIENT || "gmail",
    auth: { user: EMAIL, pass: EMAIL_PASSWORD },
  });
}

let _transporter: ReturnType<typeof nodemailer.createTransport> | null = null;
function transporter() {
  if (!_transporter) _transporter = getTransporter();
  return _transporter;
}

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

// Design system colors (converted from oklch to hex)
const colors = {
  primary: "#059669", // Emerald Green
  secondary: "#1e3a8a", // Deep Blue
  accent: "#f59e0b", // Gold/Amber
  background: "#ffffff", // White
  foreground: "#1e293b", // Dark text (slate-900)
  muted: "#64748b", // Muted text (slate-500)
  mutedBg: "#f1f5f9", // Muted background (slate-100)
  accentBg: "#fef3c7", // Amber-100
  accentText: "#92400e", // Amber-800
  border: "#e2e8f0", // Border color
};

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
        <td style="padding:8px 12px;border:1px solid ${colors.border};background:${colors.mutedBg};font-weight:600;color:${colors.foreground};">
          ${escapeHtml(label)}
        </td>
        <td style="padding:8px 12px;border:1px solid ${colors.border};background:${colors.background};color:${colors.foreground};">
          ${escapeHtml(formatValue(value))}
        </td>
      </tr>
    `);
  });

  return rows.join("");
}

function renderStructuredSections(type: string, data: Record<string, unknown>): string {
  const sections = getRequestDisplayRows(type, data as Record<string, unknown>);
  if (sections.length === 0) return renderFieldRows(data as Record<string, FieldValue>);

  const parts: string[] = [];
  sections.forEach((section) => {
    parts.push(
      `<div style="margin-bottom:20px;"><div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:${colors.muted};margin-bottom:10px;">${escapeHtml(section.section)}</div><table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-size:14px;"><tbody>`
    );
    section.rows.forEach((row) => {
      parts.push(`
        <tr><td style="padding:6px 0 6px 0;border-bottom:1px solid ${colors.border};vertical-align:top;width:140px;font-weight:600;color:${colors.muted};">${escapeHtml(row.label)}</td><td style="padding:6px 0 6px 0;border-bottom:1px solid ${colors.border};color:${colors.foreground};">${escapeHtml(row.value)}</td></tr>
      `);
    });
    parts.push("</tbody></table></div>");
  });
  return parts.join("");
}

/**
 * Email header with HTML/CSS logo (matching auth layout design)
 */
function getEmailHeader(): string {
  return `
    <tr>
      <td style="background:${colors.primary};color:#ffffff;padding:28px 32px;font-family:Inter,Arial,sans-serif;text-align:center;">
        <div style="margin-bottom:16px;text-align:center;">
          <div style="line-height:1.2;text-align:center;">
            <div style="font-size:24px;font-weight:700;letter-spacing:-0.02em;color:#ffffff;font-family:Inter,Arial,sans-serif;text-align:center;margin-bottom:4px;">
              Elegant Travel & Tours
            </div>
            <div style="font-size:20px;font-weight:700;color:#ffffff;font-family:Inter,Arial,sans-serif;text-align:center;">
              ET&T
            </div>
          </div>
        </div>
        <div style="margin-top:8px;font-size:14px;color:#d1fae5;text-align:center;">Delivering tailored experiences across Rwanda</div>
      </td>
    </tr>
  `;
}

function baseTemplate({
  title,
  intro,
  fields,
  footerNote,
  structuredHtml,
}: {
  title: string;
  intro: string;
  fields: Record<string, FieldValue>;
  footerNote?: string;
  structuredHtml?: string;
}) {
  const footer =
    footerNote ?? "We will get back to you shortly with a detailed response.";
  const bodyHtml = structuredHtml ?? `
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;font-size:14px;line-height:1.5;">
      <tbody>${renderFieldRows(fields)}</tbody>
    </table>`;
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:${colors.mutedBg};padding:32px 0;">
      <tr>
        <td align="center">
          <table role="presentation" cellpadding="0" cellspacing="0" width="640" style="background:${colors.background};border-radius:16px;overflow:hidden;box-shadow:0 10px 40px rgba(5,150,105,0.08);">
            ${getEmailHeader()}
            <tr>
              <td style="padding:28px 32px;font-family:Inter,Arial,sans-serif;color:${colors.foreground};">
                <div style="font-size:20px;font-weight:700;margin-bottom:8px;color:${colors.foreground};">${escapeHtml(
                  title
                )}</div>
                <div style="font-size:15px;color:${colors.muted};line-height:1.6;margin-bottom:20px;">
                  ${escapeHtml(intro)}
                </div>
                ${bodyHtml}
                <div style="margin-top:24px;padding:16px;border-radius:12px;background:${colors.accentBg};color:${colors.accentText};font-size:14px;line-height:1.6;border:1px solid ${colors.accent};">
                  ${escapeHtml(footer)}
                </div>
              </td>
            </tr>
            <tr>
              <td style="background:${colors.primary};color:#d1fae5;padding:24px 32px;font-family:Inter,Arial,sans-serif;font-size:13px;line-height:1.6;">
                <div style="font-weight:600;color:#ffffff;">Elegant Travel & Tours</div>
                <div>Kigali, Rwanda</div>
                <div><a href="https://elegantrwanda.rw" style="color:#ffffff;text-decoration:none;">elegantrwanda.rw</a></div>
                <div style="margin-top:12px;color:#a7f3d0;">You are receiving this message because a request was submitted on elegantrwanda.rw.</div>
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
  data: Record<string, unknown>;
  userEmail?: string;
  userName?: string;
}) {
  const envEmail = EMAIL;
  const to = [envEmail, ADMIN_EMAIL_1, ADMIN_EMAIL_2].filter(Boolean) as string[];
  if (!to.length || !envEmail) {
    throw new Error("No admin recipients configured (EMAIL or ADMIN_EMAIL_1/2)");
  }

  const subject = formSubjectMap[formType] || `New ${formType} submission`;
  const requestType = formTypeToRequestType[formType];
  const structuredBody =
    requestType && getRequestDisplayConfig(requestType)
      ? renderStructuredSections(requestType, data as Record<string, FieldValue>)
      : undefined;

  const adminHtml = baseTemplate({
    title: subject,
    intro:
      "A new request has been submitted on elegantrwanda.rw. Details are below:",
    fields: data as Record<string, FieldValue>,
    footerNote: "Please reply to the guest promptly with a tailored quotation.",
    structuredHtml: structuredBody,
  });

  await transporter().sendMail({
    from: `Elegant Travel & Tours <${envEmail}>`,
    to,
    subject,
    html: adminHtml,
    replyTo: userEmail || envEmail,
  });

  if (userEmail) {
    const confirmationHtml = baseTemplate({
      title: "We have received your request",
      intro: `Hello ${
        userName || "there"
      }, thank you for reaching out to Elegant Travel & Tours. We have your request and will respond with a tailored quotation shortly.`,
      fields: data as Record<string, FieldValue>,
      footerNote:
        "Need immediate assistance? Reply to this email and our team will prioritize your request.",
      structuredHtml: structuredBody,
    });

    await transporter().sendMail({
      from: `Elegant Travel & Tours <${envEmail}>`,
      to: userEmail,
      subject: "We received your request",
      html: confirmationHtml,
      replyTo: envEmail,
    });
  }
}
