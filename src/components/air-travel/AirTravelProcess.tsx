"use client"

import { FileText, Clock, CheckCircle, Phone } from "lucide-react";

const processSteps = [
  {
    icon: FileText,
    title: "Submit Request",
    description: "Fill out our comprehensive form with your travel requirements and service needs.",
    duration: "2-5 minutes",
    color: "bg-primary"
  },
  {
    icon: Clock,
    title: "Review & Quotation",
    description: "Our experts review your request and provide a detailed quotation within 1 hour.",
    duration: "1 hour",
    color: "bg-primary"
  },
  {
    icon: CheckCircle,
    title: "Confirmation & Payment",
    description: "Confirm your services and complete payment to secure your booking.",
    duration: "15 minutes",
    color: "bg-primary"
  },
  {
    icon: Phone,
    title: "Service Execution",
    description: "We execute your requested services with regular updates and support.",
    duration: "Varies by service",
    color: "bg-primary"
  }
];

export function AirTravelProcess() {
  return (
    <section className="py-20 bg-white">
      <div className="container-elegant">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our streamlined process ensures you get the assistance you need quickly and efficiently.
            From initial request to service completion, we&apos;re with you every step of the way.
          </p>
        </div>

        {/* Horizontal Timeline */}
        <div className="relative">

          {/* Steps Grid */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {processSteps.map((step, index) => (
              <div key={index} className="relative text-center">
                {/* Timeline Dot */}
                <div className="relative z-10 mb-6 flex flex-col justify-center items-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${step.color} text-white mx-auto shadow-lg font-display text-3xl font-bold`}>
                    {index + 1}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-xl font-display font-semibold text-gray-900">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                  <div className="inline-flex items-center space-x-2 text-xs text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                    <Clock className="h-3 w-3" />
                    <span>{step.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        < div className="mt-16 bg-linear-to-r from-primary to-primary/80 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-display font-semibold mb-4">
            Ready to Get Started?
          </h3>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Don&apos;t let travel logistics stress you out. Let our experts handle everything
            so you can focus on enjoying your journey to Rwanda.
          </p>
          <button
            onClick={() => {
              const form = document.getElementById('air-travel-form');
              if (form) {
                form.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="bg-white text-primary font-semibold py-3 px-8 hover:bg-gray-100 transition-colors duration-200 rounded-full"
          >
            Request Assistance Now
          </button>
        </div>
      </div>
    </section >
  );
}
