"use client";

type FormPayload = {
  formType: string;
  data: Record<string, unknown>;
  userEmail?: string;
  userName?: string;
};

export async function submitFormToEmail(payload: FormPayload) {
  const response = await fetch("/api/send-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error?.error || "Unable to send email");
  }
}
