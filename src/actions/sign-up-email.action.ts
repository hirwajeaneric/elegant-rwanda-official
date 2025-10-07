"use server"

import { auth } from "@/lib/auth";

export async function signUpEmailAction(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!name) {
        return { error: "Name is required" };
    }

    if (!email) {
        return { error: "Email is required" };
    }

    if (!password) {
        return { error: "Password is required" };
    }

    try {
        await auth.api.signUpEmail({
            body: {
                name,
                email,
                password,
            },
        });
        return { error: null };
    } catch (error) {
        if (error instanceof Error) {
            return { error: "Oops! Something went wrong while registering" };
        }
        return { error: "Internal server error" };
    }
}