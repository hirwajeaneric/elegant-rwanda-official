import { Metadata } from "next";
import { PageWrapper } from "@/components/layout/PageWrapper";

export const metadata: Metadata = {
  title: "Contact Elegant Rwanda: Inquire About Tours & Services",
  description: "Get in touch with Elegant Rwanda for personalized travel quotes, tour bookings, and expert travel advice. We're here to help plan your perfect Rwanda adventure.",
  keywords: [
    "Contact Elegant Rwanda",
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
                    <span className="text-2xl">📍</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Office Address</h3>
                    <p className="text-muted-foreground">
                      KG 123 Street<br />
                      Kigali, Rwanda
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">📞</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <p className="text-muted-foreground">
                      +250 788 123 456<br />
                      +250 788 123 457
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">✉️</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-muted-foreground">
                      info@elegantrwanda.com<br />
                      bookings@elegantrwanda.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🕒</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Business Hours</h3>
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
              <p className="text-primary font-semibold">+250 788 123 999</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-border">
            <h2 className="text-2xl font-display font-semibold mb-6">Send us a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">First Name *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Enter your first name"
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Last Name *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Enter your last name"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="Enter your email address"
                  required
                />
              </div>

              <div>
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  className="form-input"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="form-label">Subject *</label>
                <select className="form-input" required aria-label="Select a subject for your message">
                  <option value="">Select a subject</option>
                  <option value="tour-inquiry">Tour Inquiry</option>
                  <option value="booking">Booking Request</option>
                  <option value="custom-package">Custom Package</option>
                  <option value="general">General Question</option>
                  <option value="feedback">Feedback</option>
                </select>
              </div>

              <div>
                <label className="form-label">Message *</label>
                <textarea
                  className="form-input resize-none"
                  rows={5}
                  placeholder="Tell us about your travel plans, questions, or requirements..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full btn-primary text-lg py-3"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-display font-semibold mb-6 text-center">Find Us</h2>
          <div className="bg-muted rounded-2xl p-8 text-center">
            <p className="text-muted-foreground mb-4">
              Interactive map will be embedded here showing our office location in Kigali.
            </p>
            <div className="w-full h-64 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg border border-border flex items-center justify-center">
              <span className="text-muted-foreground">Google Maps Integration</span>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
