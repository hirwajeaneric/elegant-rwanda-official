import { Metadata } from "next";
import { PageWrapper } from "@/components/layout/PageWrapper";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Terms of Service | Elegant Rwanda",
  description: "Read our terms of service and conditions for using Elegant Rwanda's travel services, tours, and accommodations.",
  keywords: "terms of service, terms and conditions, Elegant Rwanda, travel terms",
  openGraph: {
    title: "Terms of Service | Elegant Rwanda",
    description: "Read our terms of service and conditions for using Elegant Rwanda's travel services, tours, and accommodations.",
    type: "website",
    url: "https://elegantrwanda.com/terms",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service | Elegant Rwanda",
    description: "Read our terms of service and conditions for using Elegant Rwanda's travel services, tours, and accommodations.",
  },
};

export default function TermsOfServicePage() {
  return (
    <PageWrapper>
      <section className="py-24 bg-gradient-to-r from-primary to-primary/80">
        <div className="container-elegant text-center text-white">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
            Terms of Service
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Please read these terms and conditions carefully before using our services.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-elegant">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <div className="mb-12">
              <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
                Last Updated: January 2025
              </h2>
              <p className="text-gray-600">
                These Terms of Service (&quot;Terms&quot;) govern your use of Elegant Rwanda&apos;s website and services. By accessing or using our services, you agree to be bound by these Terms.
              </p>
            </div>

            <div className="space-y-12">
              <div>
                <h3 className="text-2xl font-display font-semibold text-gray-900 mb-4">
                  1. Acceptance of Terms
                </h3>
                <p className="text-gray-600">
                  By accessing and using Elegant Rwanda&apos;s website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-display font-semibold text-gray-900 mb-4">
                  2. Description of Service
                </h3>
                <p className="text-gray-600 mb-4">
                  Elegant Rwanda provides travel and tourism services including but not limited to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>Tour packages and guided experiences</li>
                  <li>Car rental and transportation services</li>
                  <li>Cab booking and airport transfers</li>
                  <li>Air travel assistance and visa support</li>
                  <li>Event organization and group travel</li>
                  <li>Hotel and accommodation bookings</li>
                  <li>Travel consultation and planning</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-display font-semibold text-gray-900 mb-4">
                  3. Booking and Reservations
                </h3>
                <div className="space-y-4 text-gray-600">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Reservation Process</h4>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>All bookings must be made through our official channels</li>
                      <li>Reservations are confirmed upon receipt of payment or deposit</li>
                      <li>We reserve the right to refuse service to anyone</li>
                      <li>Prices are subject to change without notice</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Payment Terms</h4>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Full payment may be required at time of booking</li>
                      <li>Deposits are non-refundable unless otherwise specified</li>
                      <li>We accept major credit cards and bank transfers</li>
                      <li>All prices are quoted in USD unless otherwise stated</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-display font-semibold text-gray-900 mb-4">
                  4. Cancellation and Refund Policy
                </h3>
                <div className="space-y-4 text-gray-600">
                  <p>Our cancellation policy varies by service type:</p>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Tours and Events</h4>
                    <ul className="list-disc pl-6 space-y-1">
                      <li><strong>30+ days:</strong> Full refund minus processing fees</li>
                      <li><strong>15-29 days:</strong> 75% refund</li>
                      <li><strong>7-14 days:</strong> 50% refund</li>
                      <li><strong>Less than 7 days:</strong> No refund</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Car Rentals and Transfers</h4>
                    <ul className="list-disc pl-6 space-y-1">
                      <li><strong>24+ hours:</strong> Full refund</li>
                      <li><strong>Less than 24 hours:</strong> 50% refund</li>
                      <li><strong>No-show:</strong> No refund</li>
                    </ul>
                  </div>
                  
                  <p className="text-sm text-gray-500 mt-4">
                    * Weather-related cancellations may be rescheduled at no additional cost
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-display font-semibold text-gray-900 mb-4">
                  5. Travel Requirements and Documentation
                </h3>
                <div className="space-y-4 text-gray-600">
                  <p>It is your responsibility to ensure you have:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Valid passport with at least 6 months validity</li>
                    <li>Required visas and travel permits</li>
                    <li>Appropriate travel insurance</li>
                    <li>Vaccination certificates if required</li>
                    <li>Any necessary medical documentation</li>
                  </ul>
                  <p>
                    Elegant Rwanda is not responsible for denied entry, deportation, or any other immigration issues due to improper documentation.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-display font-semibold text-gray-900 mb-4">
                  6. Health and Safety
                </h3>
                <div className="space-y-4 text-gray-600">
                  <p>Your safety is our priority, but you acknowledge that:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Travel involves inherent risks and dangers</li>
                    <li>You participate in activities at your own risk</li>
                    <li>You must follow safety instructions from our guides</li>
                    <li>We are not liable for accidents or injuries</li>
                    <li>You should have appropriate travel insurance</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-display font-semibold text-gray-900 mb-4">
                  7. Code of Conduct
                </h3>
                <div className="space-y-4 text-gray-600">
                  <p>While using our services, you agree to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Respect local customs and traditions</li>
                    <li>Follow environmental protection guidelines</li>
                    <li>Behave respectfully toward other travelers and staff</li>
                    <li>Not engage in illegal activities</li>
                    <li>Follow all safety instructions and guidelines</li>
                  </ul>
                  <p>
                    Violation of these guidelines may result in immediate termination of services without refund.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-display font-semibold text-gray-900 mb-4">
                  8. Limitation of Liability
                </h3>
                <p className="text-gray-600 mb-4">
                  Elegant Rwanda&apos;s liability is limited to the amount paid for the specific service. We are not liable for:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>Personal injury or death</li>
                  <li>Loss or damage of personal property</li>
                  <li>Travel delays or cancellations due to circumstances beyond our control</li>
                  <li>Acts of nature, war, terrorism, or government actions</li>
                  <li>Third-party service provider actions</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-display font-semibold text-gray-900 mb-4">
                  9. Force Majeure
                </h3>
                <p className="text-gray-600">
                  We are not liable for any failure to perform due to circumstances beyond our reasonable control, including but not limited to natural disasters, war, terrorism, government actions, or other events that make it impossible or impractical to provide services.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-display font-semibold text-gray-900 mb-4">
                  10. Privacy and Data Protection
                </h3>
                <p className="text-gray-600">
                  Your privacy is important to us. Please review our Privacy Policy, which also governs your use of our services, to understand our practices regarding the collection and use of your personal information.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-display font-semibold text-gray-900 mb-4">
                  11. Intellectual Property
                </h3>
                <p className="text-gray-600">
                  All content on our website, including text, graphics, logos, images, and software, is the property of Elegant Rwanda and is protected by copyright laws. You may not reproduce, distribute, or create derivative works without our written permission.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-display font-semibold text-gray-900 mb-4">
                  12. Governing Law and Disputes
                </h3>
                <p className="text-gray-600 mb-4">
                  These Terms are governed by the laws of Rwanda. Any disputes arising from these Terms or our services will be resolved through:
                </p>
                <ol className="list-decimal pl-6 space-y-2 text-gray-600">
                  <li>Direct communication and negotiation</li>
                  <li>Mediation if direct resolution fails</li>
                  <li>Legal proceedings in Rwandan courts if necessary</li>
                </ol>
              </div>

              <div>
                <h3 className="text-2xl font-display font-semibold text-gray-900 mb-4">
                  13. Changes to Terms
                </h3>
                <p className="text-gray-600">
                  We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting on our website. Your continued use of our services constitutes acceptance of the modified Terms.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-display font-semibold text-gray-900 mb-4">
                  14. Contact Information
                </h3>
                <p className="text-gray-600 mb-4">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-gray-700"><strong>Elegant Rwanda</strong></p>
                  <p className="text-gray-600">Email: legal@elegantrwanda.com</p>
                  <p className="text-gray-600">Phone: +250 788 123 456</p>
                  <p className="text-gray-600">Address: Kigali, Rwanda</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
