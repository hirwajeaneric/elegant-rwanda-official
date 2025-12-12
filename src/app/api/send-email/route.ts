import { NextResponse } from "next/server";
import { sendFormEmails } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { formType, data, userEmail, userName } = body ?? {};

    if (!formType || !data || typeof data !== "object") {
      return NextResponse.json(
        { error: "Invalid payload. Provide formType and data." },
        { status: 400 }
      );
    }

    await sendFormEmails({
      formType,
      data,
      userEmail,
      userName,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Email sending failed", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
