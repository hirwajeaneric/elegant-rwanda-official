"use client";

import { useState } from "react";
import { ChevronDown, FileText, Shield, Clock, CreditCard, AlertTriangle } from "lucide-react";
import Link from "next/link";

export function TermsConditions() {
  const [openSection, setOpenSection] = useState<string | null>("general");

  const sections = {
    general: {
      title: "General Terms",
      icon: FileText,
      content: [
        "All rentals require a valid credit card and driver's license",
        "Minimum rental period is 24 hours",
        "Maximum rental period is 30 days",
        "Renters must be at least 21 years old",
        "Valid international driving permit required for non-Rwandan residents"
      ]
    },
    insurance: {
      title: "Insurance & Liability",
      icon: Shield,
      content: [
        "Comprehensive insurance coverage included in all rentals",
        "Collision damage waiver (CDW) with zero excess",
        "Third-party liability coverage up to 1,000,000 USD",
        "Personal accident insurance for driver and passengers",
        "Theft protection coverage included"
      ]
    },
    fuel: {
      title: "Fuel Policy",
      icon: Clock,
      content: [
        "Vehicle must be returned with the same fuel level as at pickup",
        "Fuel charges apply if vehicle is returned with less fuel",
        "Fuel costs are based on current market rates",
        "Pre-paid fuel options available for convenience",
        "Fuel efficiency varies by vehicle type"
      ]
    },
    payment: {
      title: "Payment & Deposits",
      icon: CreditCard,
      content: [
        "Full payment required at time of booking",
        "Security deposit required for all rentals",
        "Deposit is refunded within 7 business days after return",
        "We accept major credit cards and cash payments",
        "Additional charges may apply for late returns or damages"
      ]
    },
    restrictions: {
      title: "Restrictions & Prohibitions",
      icon: AlertTriangle,
      content: [
        "No smoking in vehicles",
        "No pets allowed without prior approval",
        "Off-road driving not permitted unless specified",
        "Vehicle must not be used for illegal activities",
        "Maximum speed limits must be observed"
      ]
    }
  };

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <section className="section-padding bg-white">
      <div className="container-elegant">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Terms & <span className="text-primary">Conditions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Please read our rental terms and conditions carefully. These terms ensure a smooth
            and enjoyable car rental experience for all our customers.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {Object.entries(sections).map(([key, section]) => (
            <div key={key} className="mb-6">
              <button
                onClick={() => toggleSection(key)}
                className="w-full bg-muted/30 rounded-xl p-6 text-left hover:bg-muted/50 transition-colors duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <section.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-display font-semibold text-foreground">
                      {section.title}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`h-6 w-6 text-muted-foreground transition-transform duration-200 ${openSection === key ? 'rotate-180' : ''
                      }`}
                  />
                </div>
              </button>

              {openSection === key && (
                <div className="mt-4 bg-muted/20 rounded-xl p-6 border border-border/50">
                  <ul className="space-y-3">
                    {section.content.map((item, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full shrink-0 mt-2" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Important Notice */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center shrink-0">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="text-xl font-display font-semibold text-yellow-800 mb-3">
                  Important Notice
                </h3>
                <div className="text-yellow-700 space-y-3">
                  <p>
                    By proceeding with your car rental, you acknowledge that you have read,
                    understood, and agree to all the terms and conditions outlined above.
                  </p>
                  <p>
                    Failure to comply with these terms may result in additional charges,
                    rental termination, or legal action.
                  </p>
                  <p>
                    For any questions about these terms, please contact our customer service
                    team before making your booking.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-16 text-center">
          <div className="bg-linear-to-r from-primary to-secondary rounded-2xl p-8 text-white">
            <h3 className="text-3xl font-display font-bold mb-4">
              Questions About Our Terms?
            </h3>
            <p className="text-xl text-white/90 mb-6 max-w-2xl mx-auto">
              Our customer service team is here to help clarify any terms or conditions
              before you make your booking.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-white/90 transition-colors">
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
