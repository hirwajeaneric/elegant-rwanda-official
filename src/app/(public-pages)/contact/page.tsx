import { Metadata } from "next";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/forms/ContactForm";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Contact Elegant Travel and Tours: Inquire About Tours & Services",
  description: "Get in touch with Elegant Travel and Tours for personalized travel quotes, tour bookings, and expert travel advice. We're here to help plan your perfect Rwanda adventure.",
  keywords: [
    "Contact Elegant Travel and Tours",
    "Rwanda travel inquiry",
    "Tour booking Rwanda",
    "Travel consultation Rwanda",
    "Customer support Rwanda"
  ],
};

export default function ContactPage() {
  return (
    <PageWrapper>
      <div className="container-elegant py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Get in{" "}
            <span className="text-primary">Touch</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to start planning your Rwanda adventure? We&apos;re here to help create the perfect
            travel experience for you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-display font-semibold mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-2xl"><MapPin className="h-6 w-6" /></span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-2xl">Office Address</h3>
                    <p className="text-muted-foreground">
                      KG 123 Street<br />
                      Kigali, Rwanda
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-2xl"><Phone className="h-6 w-6" /></span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-2xl">Phone</h3>
                    <p className="text-muted-foreground">
                      +250 787 095 392<br />
                      {/* +250 788 123 457 */}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-2xl"><Mail className="h-6 w-6" /></span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-2xl">Email</h3>
                    <p className="text-muted-foreground">
                      info@elegantrwanda.com<br />
                      bookings@elegantrwanda.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-2xl"><Clock className="h-6 w-6" /></span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-2xl">Business Hours</h3>
                    <p className="text-muted-foreground">
                      Monday - Friday: 8:00 AM - 6:00 PM<br />
                      Saturday: 9:00 AM - 4:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-6 border border-primary/20">
              <h3 className="text-lg font-semibold mb-3">Emergency Support</h3>
              <p className="text-muted-foreground text-sm mb-3">
                For urgent matters outside business hours, please call our 24/7 emergency line:
              </p>
              <p className="text-primary font-semibold">+250 787 095 392</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-border">
            <h2 className="text-2xl font-display font-semibold mb-6">Send us a Message</h2>
            <ContactForm />
          </div>
        </div>

        {/* Map Section */}
        {/* <div className="mt-16">
          <h2 className="text-2xl font-display font-semibold mb-6 text-center">Find Us</h2>
          <div className="bg-muted rounded-2xl p-8 text-center">
            <p className="text-muted-foreground mb-4">
              Interactive map will be embedded here showing our office location in Kigali.
            </p>
            <div className="w-full h-64 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg border border-border flex items-center justify-center">
              <span className="text-muted-foreground">Google Maps Integration</span>
            </div>
          </div>
        </div> */}
      </div>
    </PageWrapper>
  );
}
