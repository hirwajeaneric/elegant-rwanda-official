import { Metadata } from "next";
import { PageWrapper } from "@/components/layout/PageWrapper";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Privacy Policy | Elegant Travel and Tours",
  description: "Learn about how Elegant Travel and Tours collects, uses, and protects your personal information. Read our comprehensive privacy policy.",
  keywords: "privacy policy, data protection, personal information, Elegant Travel and Tours",
  openGraph: {
    title: "Privacy Policy | Elegant Travel and Tours",
    description: "Learn about how Elegant Travel and Tours collects, uses, and protects your personal information.",
    type: "website",
    url: "https://elegantrwanda.com/privacy",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Elegant Travel and Tours",
    description: "Learn about how Elegant Travel and Tours collects, uses, and protects your personal information.",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <PageWrapper>
      <section className="py-24 bg-gradient-to-r from-primary to-primary/80">
        <div className="container-elegant text-center text-white">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
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
                Elegant Travel and Tours (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>
            </div>

            <div className="space-y-12">
              <div>
                <h3 className="text-2xl font-display font-semibold text-gray-900 mb-4">
                  1. Information We Collect
                </h3>
                <div className="space-y-4 text-gray-600">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Personal Information</h4>
                    <p>We may collect personal information that you voluntarily provide to us when you:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Fill out contact forms or inquiry forms</li>
                      <li>Register for events or tours</li>
                      <li>Book services</li>
                      <li>Subscribe to our newsletter</li>
                      <li>Contact us for support</li>
                    </ul>
                    <p className="mt-2">This information may include:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Name and contact information (email, phone number)</li>
                      <li>Travel preferences and requirements</li>
                      <li>Payment information (processed securely through third-party providers)</li>
                      <li>Special requests or accessibility needs</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Automatically Collected Information</h4>
                    <p>When you visit our website, we automatically collect certain information about your device, including:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>IP address and location data</li>
                      <li>Browser type and version</li>
                      <li>Operating system</li>
                      <li>Pages visited and time spent</li>
                      <li>Referring website</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-display font-semibold text-gray-900 mb-4">
                  2. How We Use Your Information
                </h3>
                <p className="text-gray-600 mb-4">We use the information we collect to:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>Provide and improve our services</li>
                  <li>Process bookings and reservations</li>
                  <li>Communicate with you about your trips and services</li>
                  <li>Send newsletters and promotional materials (with your consent)</li>
                  <li>Respond to your inquiries and provide customer support</li>
                  <li>Analyze website usage and improve user experience</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-display font-semibold text-gray-900 mb-4">
                  3. Information Sharing and Disclosure
                </h3>
                <div className="space-y-4 text-gray-600">
                  <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Service Providers:</strong> We may share information with trusted third-party service providers who assist us in operating our website and providing services (e.g., payment processors, email services)</li>
                    <li><strong>Legal Requirements:</strong> We may disclose information if required by law or to protect our rights, property, or safety</li>
                    <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-display font-semibold text-gray-900 mb-4">
                  4. Data Security
                </h3>
                <p className="text-gray-600 mb-4">
                  We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.
                </p>
                <p className="text-gray-600">
                  We use industry-standard encryption for sensitive data transmission and regularly review our security practices to ensure the protection of your information.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-display font-semibold text-gray-900 mb-4">
                  5. Your Rights and Choices
                </h3>
                <p className="text-gray-600 mb-4">You have the right to:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>Access and review your personal information</li>
                  <li>Correct inaccurate or incomplete information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Withdraw consent for data processing</li>
                  <li>Request data portability</li>
                </ul>
                <p className="text-gray-600 mt-4">
                  To exercise these rights, please contact us using the information provided below.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-display font-semibold text-gray-900 mb-4">
                  6. Cookies and Tracking Technologies
                </h3>
                <p className="text-gray-600 mb-4">
                  We use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and understand where our visitors are coming from.
                </p>
                <p className="text-gray-600">
                  You can control cookie settings through your browser preferences. However, disabling cookies may affect the functionality of our website.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-display font-semibold text-gray-900 mb-4">
                  7. International Data Transfers
                </h3>
                <p className="text-gray-600">
                  Your information may be transferred to and processed in countries other than your own. We ensure that such transfers comply with applicable data protection laws and implement appropriate safeguards to protect your information.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-display font-semibold text-gray-900 mb-4">
                  8. Children&apos;s Privacy
                </h3>
                <p className="text-gray-600">
                  Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-display font-semibold text-gray-900 mb-4">
                  9. Changes to This Privacy Policy
                </h3>
                <p className="text-gray-600">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date. We encourage you to review this Privacy Policy periodically.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-display font-semibold text-gray-900 mb-4">
                  10. Contact Us
                </h3>
                <p className="text-gray-600 mb-4">
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-gray-700"><strong>Elegant Travel and Tours</strong></p>
                  <p className="text-gray-600">Email: privacy@elegantrwanda.com</p>
                  <p className="text-gray-600">Phone: ‭+250 787 095 392‬</p>
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
