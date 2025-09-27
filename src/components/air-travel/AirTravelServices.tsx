import { FileText, Plane, Building2, Route, Clock, Shield, Users, Ticket } from "lucide-react";

const services = [
  {
    icon: FileText,
    title: "Visa Assistance",
    description: "Comprehensive visa application support for all nationalities visiting Rwanda. We handle documentation, processing, and follow-up.",
    features: [
      "Document preparation & review",
      "Application submission",
      "Processing status updates",
      "Emergency visa services"
    ],
    color: "bg-primary/10 border-primary/20 text-primary"
  },
  {
    icon: Plane,
    title: "Airport Pickup & Drop-off",
    description: "Reliable airport transfer services with professional drivers and comfortable vehicles. Available 24/7 for all flights.",
    features: [
      "Meet & greet service",
      "Flight monitoring",
      "Flexible timing",
      "Luggage assistance"
    ],
    color: "bg-primary/10 border-primary/20 text-primary"
  },
  {
    icon: Building2,
    title: "Hotel Booking Support",
    description: "Expert hotel recommendations and booking assistance across Rwanda. From Unique resorts to budget-friendly options.",
    features: [
      "Curated hotel selection",
      "Best rate guarantee",
      "Special requests handling",
      "Booking modifications"
    ],
    color: "bg-primary/10 border-primary/20 text-primary"
  },
  {
    icon: Route,
    title: "Travel Coordination",
    description: "End-to-end travel planning and coordination services. We ensure every detail of your journey is perfectly arranged.",
    features: [
      "Itinerary planning",
      "Transportation coordination",
      "Activity bookings",
      "Emergency support"
    ],
    color: "bg-primary/10 border-primary/20 text-primary"
  },
  {
    icon: Ticket,
    title: "Ticket Booking",
    description: "We can help you book your flight tickets to Rwanda. We work with major airlines to get you the best deals.",
    features: [
      "Flight ticket booking",
      "Flight ticket cancellation",
      "Flight ticket refund"
    ],
    color: "bg-primary/10 border-primary/20 text-primary"
  }
];

export function AirTravelServices() {
  return (
    <section className="py-20 bg-white">
      <div className="container-elegant">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
            Our Air Travel Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From the moment you plan your trip to your safe return, we provide comprehensive
            air travel assistance to make your journey to Rwanda seamless and enjoyable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className={`rounded-2xl p-8 border ${service.color} hover:shadow-lg transition-shadow duration-300`}>
              <div className="flex flex-col items-start space-x-4">
                <div className="flex items-center space-x-4 w-full">
                  <service.icon className="h-8 w-8 text-primary" />
                  <h3 className="text-2xl font-display font-semibold mb-3">
                    {service.title}
                  </h3>
                </div>
                <div className="flex-1 w-full">
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-current rounded-full flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Services */}
        <div className="mt-16 bg-gray-50 rounded-2xl p-8">
          <h3 className="text-2xl font-display font-semibold text-gray-900 mb-6 text-center">
            Additional Support Services
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">24/7 Support</h4>
              <p className="text-sm text-gray-600">Round-the-clock assistance for emergencies and urgent requests</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Travel Insurance</h4>
              <p className="text-sm text-gray-600">Comprehensive travel insurance options for peace of mind</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Group Travel</h4>
              <p className="text-sm text-gray-600">Specialized services for corporate groups and large parties</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
