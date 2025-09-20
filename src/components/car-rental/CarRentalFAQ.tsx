"use client";

import { useState } from "react";
import { ChevronDown, Search, Car, CreditCard, Shield, Clock } from "lucide-react";
import Link from "next/link";

export function CarRentalFAQ() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const faqs = {
    "Booking": [
      {
        question: "How far in advance should I book a car?",
        answer: "We recommend booking at least 48 hours in advance, especially during peak seasons. For Unique vehicles or special requirements, booking 1-2 weeks ahead is advisable."
      },
      {
        question: "Can I modify or cancel my booking?",
        answer: "Yes, you can modify or cancel your booking up to 24 hours before the pickup time. Modifications are subject to vehicle availability, and cancellation fees may apply."
      },
      {
        question: "What documents do I need to rent a car?",
        answer: "You'll need a valid driver's license, passport or national ID, and a credit card for the security deposit. International visitors need an International Driving Permit."
      }
    ],
    "Pricing": [
      {
        question: "What's included in the rental?",
        answer: "Our rentals include comprehensive insurance, roadside assistance, GPS navigation, and unlimited mileage. Fuel, additional drivers, and optional extras are charged separately."
      },
      {
        question: "Are there any hidden fees?",
        answer: "No hidden fees. All charges are clearly displayed during booking. You'll only pay for the rental rate, fuel, and any optional services you select."
      },
      {
        question: "Do you offer discounts for long-term rentals?",
        answer: "Yes, we offer significant discounts for rentals of 7 days or longer. Contact us for custom quotes on extended rentals."
      }
    ],
    "Insurance": [
      {
        question: "What insurance coverage is included?",
        answer: "All rentals include comprehensive insurance with zero excess, third-party liability coverage, and personal accident insurance. Additional coverage options are available."
      },
      {
        question: "What happens if I have an accident?",
        answer: "In case of an accident, contact our 24/7 emergency line immediately. Our insurance team will guide you through the process and arrange assistance if needed."
      },
      {
        question: "Can I use my own insurance?",
        answer: "You may use your own insurance if it provides equivalent coverage. Please provide proof of coverage before pickup, and we'll adjust the rental accordingly."
      }
    ],
    "Vehicle": [
      {
        question: "What happens if the car breaks down?",
        answer: "We provide 24/7 roadside assistance. If a breakdown occurs, call our emergency number and we'll arrange a replacement vehicle or repair service."
      },
      {
        question: "Can I take the car outside Rwanda?",
        answer: "Cross-border travel is possible with prior approval and additional documentation. Please contact us at least 48 hours before your trip for arrangements."
      },
      {
        question: "What fuel type do your vehicles use?",
        answer: "Our vehicles use either petrol or diesel. The fuel type is clearly marked on each vehicle and mentioned in your rental confirmation."
      }
    ],
    "Pickup & Return": [
      {
        question: "Can you deliver the car to my location?",
        answer: "Yes, we offer delivery service to hotels, airports, and other locations in Kigali. Additional charges apply for delivery outside our standard pickup locations."
      },
      {
        question: "What if I'm late returning the car?",
        answer: "Late returns are charged at the hourly rate. If you need to extend your rental, please contact us as soon as possible to check availability."
      },
      {
        question: "Can I return the car at a different location?",
        answer: "One-way rentals are available for an additional fee. Please specify your return location during booking."
      }
    ]
  };

  const categories = Object.keys(faqs);
  const allFaqs = Object.values(faqs).flat();

  const filteredFaqs = activeCategory === "all" 
    ? allFaqs.filter(faq => 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : faqs[activeCategory as keyof typeof faqs]?.filter(faq => 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      ) || [];

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-elegant">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Find answers to common questions about our car rental services. Can&apos;t find what 
            you&apos;re looking for? Contact our support team.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-border/50">
            {/* Search Bar */}
            <div className="relative mb-6 rounded-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setActiveCategory("all")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === "all"
                    ? "bg-primary text-white"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                All Categories
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeCategory === category
                      ? "bg-primary text-white"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ List */}
        <div className="max-w-4xl mx-auto">
          {filteredFaqs.length > 0 ? (
            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg border border-border/50 overflow-hidden">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-6 text-left hover:bg-muted/30 transition-colors duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-foreground pr-4">
                        {faq.question}
                      </h3>
                      <ChevronDown 
                        className={`h-5 w-5 text-muted-foreground transition-transform duration-200 flex-shrink-0 ${
                          openFaq === index ? 'rotate-180' : ''
                        }`} 
                      />
                    </div>
                  </button>
                  
                  {openFaq === index && (
                    <div className="px-6 pb-6">
                      <div className="border-t border-border/50 pt-4">
                        <p className="text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-display font-semibold mb-2">No FAQs found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search terms or browse all categories.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setActiveCategory("all");
                }}
                className="bg-primary text-white px-6 py-3 rounded-full hover:bg-primary/90 transition-colors"
              >
                View All FAQs
              </button>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Car className="h-8 w-8 text-primary" />
            </div>
            <div className="text-3xl font-bold text-primary mb-2">50+</div>
            <div className="text-muted-foreground">Vehicles Available</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <div className="text-3xl font-bold text-primary mb-2">100%</div>
            <div className="text-muted-foreground">Insured</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-primary" />
            </div>
            <div className="text-3xl font-bold text-primary mb-2">24/7</div>
            <div className="text-muted-foreground">Support</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CreditCard className="h-8 w-8 text-primary" />
            </div>
            <div className="text-3xl font-bold text-primary mb-2">Flexible</div>
            <div className="text-muted-foreground">Payment Options</div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white">
            <h3 className="text-3xl font-display font-bold mb-4">
              Still Have Questions?
            </h3>
            <p className="text-xl text-white/90 mb-6 max-w-2xl mx-auto">
              Our customer service team is here to help with any questions about our car rental services.
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
