"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function FAQAccordion() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const faqData = {
    "General Travel": [
      {
        question: "What is the best time to visit Rwanda?",
        answer: "The best time to visit Rwanda is during the dry seasons: June to September and December to February. These periods offer the best conditions for gorilla trekking, wildlife viewing, and outdoor activities. However, Rwanda's pleasant climate makes it a year-round destination."
      },
      {
        question: "Do I need a visa to visit Rwanda?",
        answer: "Most nationalities require a visa to enter Rwanda. You can apply for an e-visa online through the Rwanda Immigration website or obtain one upon arrival at Kigali International Airport. The process is straightforward and typically takes 1-3 business days for approval."
      },
      {
        question: "What currency is used in Rwanda?",
        answer: "The official currency of Rwanda is the Rwandan Franc (RWF). US Dollars are also widely accepted in major tourist areas, hotels, and for tour payments. We recommend carrying some local currency for smaller purchases and tips."
      },
      {
        question: "Is Rwanda safe for tourists?",
        answer: "Yes, Rwanda is one of the safest countries in Africa for tourists. The country has low crime rates, excellent healthcare, and a strong focus on tourism safety. Our team provides 24/7 support throughout your journey to ensure a secure and enjoyable experience."
      }
    ],
    "Gorilla Trekking": [
      {
        question: "How far in advance should I book gorilla trekking?",
        answer: "Gorilla trekking permits are limited and in high demand. We recommend booking at least 6-12 months in advance, especially for peak season (July-August). Last-minute bookings are possible but subject to availability."
      },
      {
        question: "What should I pack for gorilla trekking?",
        answer: "Essential items include: sturdy hiking boots, long pants and long-sleeved shirts, rain gear, insect repellent, sunscreen, hat, gloves, and a camera. We provide a detailed packing list upon booking confirmation."
      },
      {
        question: "How physically demanding is gorilla trekking?",
        answer: "Gorilla trekking can be moderately challenging. Treks typically last 2-8 hours depending on gorilla location. Terrain varies from gentle slopes to steep hills. We offer different difficulty levels and can arrange porter services for those who need assistance."
      },
      {
        question: "What is the minimum age for gorilla trekking?",
        answer: "The minimum age for gorilla trekking in Rwanda is 15 years old. This is strictly enforced by the park authorities. Children under 15 can participate in other activities like cultural visits and nature walks."
      }
    ],
    "Tours & Packages": [
      {
        question: "What is included in your tour packages?",
        answer: "Our tour packages typically include: accommodation, meals as specified, transportation, professional guides, park fees, and activities listed in the itinerary. We provide detailed inclusions and exclusions for each tour package."
      },
      {
        question: "Can I customize a tour package?",
        answer: "Absolutely! We specialize in creating personalized itineraries. You can modify existing packages or request a completely custom tour based on your interests, schedule, and budget. Our travel experts will work with you to design the perfect experience."
      },
      {
        question: "What is your cancellation policy?",
        answer: "Our cancellation policy varies by tour type and timing. Generally, cancellations made 30+ days before departure receive a full refund, 15-29 days receive 75% refund, and 14 days or less receive 50% refund. We recommend travel insurance for additional protection."
      },
      {
        question: "Do you offer group discounts?",
        answer: "Yes, we offer attractive group discounts for bookings of 4 or more people. Group rates vary by tour type and group size. Contact us for a personalized group quote and special group arrangements."
      }
    ],
    "Transportation": [
      {
        question: "What types of vehicles do you use for tours?",
        answer: "We use modern, well-maintained vehicles including 4x4 Land Cruisers for safari tours, comfortable minibuses for group tours, and luxury sedans for private transfers. All vehicles are equipped with air conditioning and safety features."
      },
      {
        question: "Do you provide airport transfers?",
        answer: "Yes, we provide airport transfers from Kigali International Airport to your hotel or tour starting point. Transfers can be arranged for arrival and departure. We recommend booking transfers in advance to ensure smooth arrival."
      },
      {
        question: "Can I rent a car and drive myself?",
        answer: "Yes, we offer both self-drive and chauffeur-driven car rental options. Self-drive requires a valid international driving permit and experience with left-hand driving. We recommend chauffeur service for first-time visitors to Rwanda."
      },
      {
        question: "What are your cab booking rates?",
        answer: "Our cab rates are competitive and transparent. Rates vary by distance, vehicle type, and service level. We offer fixed rates for airport transfers and hourly rates for city tours. Contact us for specific pricing."
      }
    ],
    "Accommodation": [
      {
        question: "What types of accommodation do you offer?",
        answer: "We offer a range of accommodation options from luxury lodges and boutique hotels to comfortable mid-range hotels. All accommodations are carefully selected for quality, location, and service standards. We can arrange accommodation to match your preferences and budget."
      },
      {
        question: "Are meals included in accommodation?",
        answer: "Meal inclusion varies by tour package and accommodation type. Most luxury lodges include full board (breakfast, lunch, dinner), while city hotels typically include breakfast. We clearly specify meal inclusions in all tour packages."
      },
      {
        question: "Can you accommodate dietary restrictions?",
        answer: "Yes, we can accommodate various dietary restrictions including vegetarian, vegan, gluten-free, and other special dietary needs. Please inform us of any requirements when booking, and we'll ensure your needs are met throughout your stay."
      },
      {
        question: "What is the accommodation quality like?",
        answer: "We partner with the finest accommodations in Rwanda, ensuring high standards of comfort, cleanliness, and service. Our luxury options include 5-star lodges with world-class amenities, while mid-range options offer excellent value and comfort."
      }
    ]
  };

  // Filter FAQs based on search query
  const filteredFAQs = Object.entries(faqData).reduce((acc, [category, questions]) => {
    if (activeCategory === "all" || category === activeCategory) {
      const filteredQuestions = questions.filter(q =>
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (filteredQuestions.length > 0) {
        acc[category] = filteredQuestions;
      }
    }
    return acc;
  }, {} as Record<string, typeof faqData[keyof typeof faqData]>);

  const categories = Object.keys(faqData);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Search and Filter */}
      <div className="mb-12 space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search for questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeCategory === "all"
                ? "bg-primary text-white shadow-lg"
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
                  ? "bg-primary text-white shadow-lg"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-8">
        {Object.entries(filteredFAQs).map(([category, questions]) => (
          <div key={category}>
            <h2 className="text-2xl font-display font-semibold mb-6 text-center">
              {category}
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {questions.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left hover:text-primary transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </div>

      {/* No Results */}
      {Object.keys(filteredFAQs).length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-display font-semibold mb-2">No questions found</h3>
          <p className="text-muted-foreground mb-6">
            Try adjusting your search terms or browse all categories.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setActiveCategory("all");
            }}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
}
