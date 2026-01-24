import nodemailer from "nodemailer";

const { EMAIL } = process.env;

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_CLIENT || "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

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
                <div style="font-size:20px;font-weight:700;margin-bottom:8px;">Verification Code</div>
                <div style="font-size:15px;color:#475569;line-height:1.6;margin-bottom:20px;">
                  Use the code below to ${purposeText}:
                </div>
                <div style="text-align:center;padding:24px;background:#f1f5f9;border-radius:12px;margin:24px 0;">
                  <div style="font-size:32px;font-weight:700;letter-spacing:8px;color:#0f172a;font-family:monospace;">
                    ${otp}
                  </div>
                </div>
                <div style="margin-top:24px;padding:16px;border-radius:12px;background:#fef3c7;color:#92400e;font-size:14px;line-height:1.6;border:1px solid #fde68a;">
                  <strong>Security Note:</strong> This code will expire in 10 minutes. Never share this code with anyone.
                </div>
              </td>
            </tr>
            <tr>
              <td style="background:#0f172a;color:#e2e8f0;padding:24px 32px;font-family:Inter,Arial,sans-serif;font-size:13px;line-height:1.6;">
                <div style="font-weight:600;color:#f8fafc;">Elegant Travel and Tours</div>
                <div>Kigali, Rwanda</div>
                <div><a href="https://elegantrwanda.rw" style="color:#38bdf8;text-decoration:none;">elegantrwanda.rw</a></div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;

  await transporter.sendMail({
    from: `Elegant Travel and Tours <${EMAIL}>`,
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
                <div style="font-size:20px;font-weight:700;margin-bottom:8px;">Reset Your Password</div>
                <div style="font-size:15px;color:#475569;line-height:1.6;margin-bottom:20px;">
                  We received a request to reset your password. Click the button below to proceed:
                </div>
                <div style="text-align:center;margin:24px 0;">
                  <a href="${resetUrl}" style="display:inline-block;padding:14px 28px;background:#0f172a;color:#ffffff;text-decoration:none;border-radius:8px;font-weight:600;font-size:15px;">
                    Reset Password
                  </a>
                </div>
                <div style="margin-top:24px;padding:16px;border-radius:12px;background:#fef3c7;color:#92400e;font-size:14px;line-height:1.6;border:1px solid #fde68a;">
                  <strong>Security Note:</strong> This link will expire in 1 hour. If you didn't request this, please ignore this email.
                </div>
                <div style="margin-top:16px;font-size:13px;color:#64748b;">
                  Or copy and paste this link into your browser:<br/>
                  <span style="word-break:break-all;color:#0f172a;">${resetUrl}</span>
                </div>
              </td>
            </tr>
            <tr>
              <td style="background:#0f172a;color:#e2e8f0;padding:24px 32px;font-family:Inter,Arial,sans-serif;font-size:13px;line-height:1.6;">
                <div style="font-weight:600;color:#f8fafc;">Elegant Travel and Tours</div>
                <div>Kigali, Rwanda</div>
                <div><a href="https://elegantrwanda.rw" style="color:#38bdf8;text-decoration:none;">elegantrwanda.rw</a></div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;

  await transporter.sendMail({
    from: `Elegant Travel and Tours <${EMAIL}>`,
    to: email,
    subject: "Reset Your Password",
    html,
  });
}
