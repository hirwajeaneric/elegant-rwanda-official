"use server"

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function signInEmailAction(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email) {
        return { error: "Email is required" };
    }

    if (!password) {
        return { error: "Password is required" };
    }

    try {
        await auth.api.signInEmail({
            headers: await headers(),
            body: {
                email,  
                password,
            },
        });

        return { error: null };
    } catch (error) {
        if (error instanceof Error) {
            return { error: error.message };
        }
        return { error: "Internal server error" };
    }
}