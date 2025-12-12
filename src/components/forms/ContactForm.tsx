"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { toast } from "sonner";
import { submitFormToEmail } from "@/lib/client-submit";

interface ContactFormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

const defaultValues: ContactFormData = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
};

const schema = z.object({
    firstName: z.string("Your first name is required").min(2),
    lastName: z.string("Your last name is required").min(2),
    email: z.string("Your email is required").email(),
    phone: z.string("Your phone is required").min(9),
    subject: z.string("A subject is required").min(5),
    message: z.string("Your message is required").min(5),
});

export default function ContactForm() {
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset, setValue } = useForm<ContactFormData>({
        defaultValues,
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: ContactFormData) => {
        try {
            await submitFormToEmail({
                formType: "contact",
                data: data as Record<string, unknown>,
                userEmail: data.email,
                userName: `${data.firstName} ${data.lastName}`.trim(),
            });
            toast.success("Thank you for contacting us. We’ve received your request.");
            reset();
        } catch (error) {
            console.error(error);
            toast.error("We could not send your request. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white rounded-lg w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm md:text-base">First Name *</Label>
                    <Input id="firstName" {...register("firstName")} placeholder="Enter your first name" className="border-gray-300"/>
                    {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm md:text-base">Last Name *</Label>
                    <Input id="lastName" {...register("lastName")} placeholder="Enter your last name" className="border-gray-300"/>
                    {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="email" className="text-sm md:text-base">Email *</Label>
                <Input id="email" {...register("email")} placeholder="Enter your email" className="border-gray-300"/>
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm md:text-base">Phone *</Label>
                <Input id="phone" {...register("phone")} placeholder="Enter your phone number" className="border-gray-300"/>
                {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="subject" className="text-sm md:text-base">Subject *</Label>
                <Select onValueChange={(value) => setValue("subject", value)} defaultValue={defaultValues.subject}>
                    <SelectTrigger className="border-gray-300 w-full">
                        <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Tours">Tours</SelectItem>
                        <SelectItem value="Air Ticket Booking">Air Ticket Booking</SelectItem>
                        <SelectItem value="Cab Booking">Cab Booking</SelectItem>
                        <SelectItem value="Car Rental">Car Rental</SelectItem>
                        <SelectItem value="Air Travel Assistance">Air Travel Assistance</SelectItem>
                        <SelectItem value="Air-ticket Assistance">Air-ticket Assistance</SelectItem>    
                        <SelectItem value="Events">Upcoming Events</SelectItem>
                        <SelectItem value="General">General Inquiry</SelectItem>
                    </SelectContent>
                </Select>
                {errors.subject && <p className="text-red-500">{errors.subject.message}</p>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="message" className="text-sm md:text-base">Message *</Label>
                <Textarea id="message" {...register("message")} placeholder="Tell us about your travel plans, questions, or requirements..." rows={5} className="border-gray-300" />
                {errors.message && <p className="text-red-500">{errors.message.message}</p>}
            </div>
            <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full btn-primary rounded-full text-lg py-4"
            >
                {isSubmitting ? (
                    <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2 inline-block" />
                        Sending...
                    </>
                ) : (
                    "Send Message"
                )}
            </Button>
            <p className="text-sm text-muted-foreground">By submitting this form, you agree to our <Link href="/privacy-policy" className="text-primary">Privacy Policy</Link> and <Link href="/terms-of-service" className="text-primary">Terms of Service</Link>.</p>
        </form>
    )
}