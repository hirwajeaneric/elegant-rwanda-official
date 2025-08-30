

import { FileText, Clock, CheckCircle, Phone } from "lucide-react";

const processSteps = [
  {
    icon: FileText,
    title: "Submit Request",
    description: "Fill out our comprehensive form with your travel requirements and service needs.",
    duration: "5-10 minutes",
    color: "bg-blue-500"
  },
  {
    icon: Clock,
    title: "Review & Quotation",
    description: "Our experts review your request and provide a detailed quotation within 2 hours.",
    duration: "2 hours",
    color: "bg-green-500"
  },
  {
    icon: CheckCircle,
    title: "Confirmation & Payment",
    description: "Confirm your services and complete payment to secure your booking.",
    duration: "30 minutes",
    color: "bg-purple-500"
  },
  {
    icon: Phone,
    title: "Service Execution",
    description: "We execute your requested services with regular updates and support.",
    duration: "Varies by service",
    color: "bg-orange-500"
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

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 transform -translate-x-1/2 hidden lg:block" />

          <div className="space-y-12">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className={`lg:flex ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}>
                  {/* Content */}
                  <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${step.color} text-white mb-4 lg:mb-0`}>
                      <step.icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-display font-semibold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 mb-3 leading-relaxed">
                      {step.description}
                    </p>
                    <div className="inline-flex items-center space-x-2 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span>{step.duration}</span>
                    </div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="hidden lg:block lg:w-1/2 flex justify-center">
                    <div className={`w-6 h-6 rounded-full ${step.color} border-4 border-white shadow-lg relative z-10`} />
                  </div>

                  {/* Mobile Timeline */}
                  <div className="lg:hidden flex justify-center mb-6">
                    <div className={`w-6 h-6 rounded-full ${step.color} border-4 border-white shadow-lg`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Process Benefits */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Simple Process</h3>
            <p className="text-gray-600">Easy-to-follow steps with clear communication at every stage</p>
          </div>
          <div className="text-center">
            <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Clock className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast Response</h3>
            <p className="text-gray-600">Quick turnaround times with urgent request options available</p>
          </div>
          <div className="text-center">
            <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Assurance</h3>
            <p className="text-gray-600">Expert handling with attention to detail and customer satisfaction</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-display font-semibold mb-4">
            Ready to Get Started?
          </h3>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Don&apos;t let travel logistics stress you out. Let our experts handle everything 
            so you can focus on enjoying your journey to Rwanda.
          </p>
          <button className="bg-white text-primary font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            Request Assistance Now
          </button>
        </div>
      </div>
    </section>
  );
}
