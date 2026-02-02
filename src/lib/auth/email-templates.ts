import nodemailer from "nodemailer";

const { EMAIL } = process.env;

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_CLIENT || "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

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

/**
 * Send OTP email
 */
export async function sendOTPEmail(
  email: string,
  otp: string,
  purpose: "REGISTRATION" | "PASSWORD_RESET" | "EMAIL_VERIFICATION"
) {
  const purposeText = {
    REGISTRATION: "complete your registration",
    PASSWORD_RESET: "reset your password",
    EMAIL_VERIFICATION: "verify your email address",
  }[purpose];

  const html = `
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:${colors.mutedBg};padding:32px 0;">
      <tr>
        <td align="center">
          <table role="presentation" cellpadding="0" cellspacing="0" width="640" style="background:${colors.background};border-radius:16px;overflow:hidden;box-shadow:0 10px 40px rgba(5,150,105,0.08);">
            ${getEmailHeader()}
            <tr>
              <td style="padding:28px 32px;font-family:Inter,Arial,sans-serif;color:${colors.foreground};">
                <div style="font-size:20px;font-weight:700;margin-bottom:8px;color:${colors.foreground};">Verification Code</div>
                <div style="font-size:15px;color:${colors.muted};line-height:1.6;margin-bottom:20px;">
                  Use the code below to ${purposeText}:
                </div>
                <div style="text-align:center;padding:24px;background:${colors.mutedBg};border-radius:12px;margin:24px 0;">
                  <div style="font-size:32px;font-weight:700;letter-spacing:8px;color:${colors.primary};font-family:monospace;">
                    ${otp}
                  </div>
                </div>
                <div style="margin-top:24px;padding:16px;border-radius:12px;background:${colors.accentBg};color:${colors.accentText};font-size:14px;line-height:1.6;border:1px solid ${colors.accent};">
                  <strong>Security Note:</strong> This code will expire in 10 minutes. Never share this code with anyone.
                </div>
              </td>
            </tr>
            <tr>
              <td style="background:${colors.primary};color:#d1fae5;padding:24px 32px;font-family:Inter,Arial,sans-serif;font-size:13px;line-height:1.6;">
                <div style="font-weight:600;color:#ffffff;">Elegant Travel & Tours</div>
                <div>Kigali, Rwanda</div>
                <div><a href="https://elegantrwanda.rw" style="color:#ffffff;text-decoration:none;">elegantrwanda.rw</a></div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;

  await transporter.sendMail({
    from: `Elegant Travel & Tours <${EMAIL}>`,
    to: email,
    subject: `Your verification code - ${otp}`,
    html,
  });
}

/**
 * Send password reset email
 */
export async function sendPasswordResetEmail(
  email: string,
  resetToken: string,
  resetUrl: string
) {
  const html = `
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:${colors.mutedBg};padding:32px 0;">
      <tr>
        <td align="center">
          <table role="presentation" cellpadding="0" cellspacing="0" width="640" style="background:${colors.background};border-radius:16px;overflow:hidden;box-shadow:0 10px 40px rgba(5,150,105,0.08);">
            ${getEmailHeader()}
            <tr>
              <td style="padding:28px 32px;font-family:Inter,Arial,sans-serif;color:${colors.foreground};">
                <div style="font-size:20px;font-weight:700;margin-bottom:8px;color:${colors.foreground};">Reset Your Password</div>
                <div style="font-size:15px;color:${colors.muted};line-height:1.6;margin-bottom:20px;">
                  We received a request to reset your password. Click the button below to proceed:
                </div>
                <div style="text-align:center;margin:24px 0;">
                  <a href="${resetUrl}" style="display:inline-block;padding:14px 28px;background:${colors.primary};color:#ffffff;text-decoration:none;border-radius:8px;font-weight:600;font-size:15px;">
                    Reset Password
                  </a>
                </div>
                <div style="margin-top:24px;padding:16px;border-radius:12px;background:${colors.accentBg};color:${colors.accentText};font-size:14px;line-height:1.6;border:1px solid ${colors.accent};">
                  <strong>Security Note:</strong> This link will expire in 1 hour. If you didn't request this, please ignore this email.
                </div>
                <div style="margin-top:16px;font-size:13px;color:${colors.muted};">
                  Or copy and paste this link into your browser:<br/>
                  <span style="word-break:break-all;color:${colors.primary};">${resetUrl}</span>
                </div>
              </td>
            </tr>
            <tr>
              <td style="background:${colors.primary};color:#d1fae5;padding:24px 32px;font-family:Inter,Arial,sans-serif;font-size:13px;line-height:1.6;">
                <div style="font-weight:600;color:#ffffff;">Elegant Travel & Tours</div>
                <div>Kigali, Rwanda</div>
                <div><a href="https://elegantrwanda.rw" style="color:#ffffff;text-decoration:none;">elegantrwanda.rw</a></div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;

  await transporter.sendMail({
    from: `Elegant Travel & Tours <${EMAIL}>`,
    to: email,
    subject: "Reset Your Password",
    html,
  });
}

/**
 * Send new user account credentials email
 */
export async function sendNewUserAccountEmail(
  email: string,
  name: string,
  password: string,
  role: string,
  requirePasswordReset: boolean,
  loginUrl: string
) {
  const roleMap: Record<string, string> = {
    ADMIN: "Administrator",
    CONTENT_MANAGER: "Content Manager",
    EDITOR: "Editor",
  };
  const roleDisplay = roleMap[role] || role;

  const passwordResetSection = requirePasswordReset
    ? `
    <div style="margin-top:24px;padding:16px;border-radius:12px;background:${colors.accentBg};color:${colors.accentText};font-size:14px;line-height:1.6;border:1px solid ${colors.accent};">
      <strong>Important:</strong> You will be required to change your password immediately after your first login for security purposes.
    </div>
  `
    : "";

  const html = `
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:${colors.mutedBg};padding:32px 0;">
      <tr>
        <td align="center">
          <table role="presentation" cellpadding="0" cellspacing="0" width="640" style="background:${colors.background};border-radius:16px;overflow:hidden;box-shadow:0 10px 40px rgba(5,150,105,0.08);">
            ${getEmailHeader()}
            <tr>
              <td style="padding:28px 32px;font-family:Inter,Arial,sans-serif;color:${colors.foreground};">
                <div style="font-size:20px;font-weight:700;margin-bottom:8px;color:${colors.foreground};">Welcome to Elegant Travel & Tours!</div>
                <div style="font-size:15px;color:${colors.muted};line-height:1.6;margin-bottom:20px;">
                  Hello ${escapeHtml(name)},
                </div>
                <div style="font-size:15px;color:${colors.muted};line-height:1.6;margin-bottom:20px;">
                  An administrator has created an account for you with the role of <strong>${roleDisplay}</strong>. Your account credentials are provided below:
                </div>
                <div style="padding:20px;background:${colors.mutedBg};border-radius:12px;margin:24px 0;">
                  <div style="margin-bottom:12px;">
                    <div style="font-size:12px;font-weight:600;color:${colors.muted};text-transform:uppercase;letter-spacing:0.05em;margin-bottom:4px;">Email Address</div>
                    <div style="font-size:15px;font-weight:600;color:${colors.primary};font-family:monospace;">${escapeHtml(email)}</div>
                  </div>
                  <div>
                    <div style="font-size:12px;font-weight:600;color:${colors.muted};text-transform:uppercase;letter-spacing:0.05em;margin-bottom:4px;">Temporary Password</div>
                    <div style="font-size:15px;font-weight:600;color:${colors.primary};font-family:monospace;">${escapeHtml(password)}</div>
                  </div>
                </div>
                ${passwordResetSection}
                <div style="text-align:center;margin:24px 0;">
                  <a href="${loginUrl}" style="display:inline-block;padding:14px 28px;background:${colors.primary};color:#ffffff;text-decoration:none;border-radius:8px;font-weight:600;font-size:15px;">
                    Login to Dashboard
                  </a>
                </div>
                <div style="margin-top:24px;padding:16px;border-radius:12px;background:${colors.accentBg};color:${colors.accentText};font-size:14px;line-height:1.6;border:1px solid ${colors.accent};">
                  <strong>Security Note:</strong> Please keep your credentials secure and do not share them with anyone. We recommend changing your password after your first login.
                </div>
              </td>
            </tr>
            <tr>
              <td style="background:${colors.primary};color:#d1fae5;padding:24px 32px;font-family:Inter,Arial,sans-serif;font-size:13px;line-height:1.6;">
                <div style="font-weight:600;color:#ffffff;">Elegant Travel & Tours</div>
                <div>Kigali, Rwanda</div>
                <div><a href="https://elegantrwanda.rw" style="color:#ffffff;text-decoration:none;">elegantrwanda.rw</a></div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;

  await transporter.sendMail({
    from: `Elegant Travel & Tours <${EMAIL}>`,
    to: email,
    subject: "Your Account Has Been Created - Elegant Travel & Tours",
    html,
  });
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
