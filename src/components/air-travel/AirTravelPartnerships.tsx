

import { Building2, Plane, Shield, Users } from "lucide-react";

const partners = [
  {
    name: "Rwanda Civil Aviation Authority",
    type: "Government Agency",
    description: "Official aviation authority ensuring safety and compliance standards",
    logo: "/rcaa-logo.png"
  },
  {
    name: "Kigali International Airport",
    type: "Airport Partner",
    description: "Primary international gateway with modern facilities and services",
    logo: "/kia-logo.png"
  },
  {
    name: "Rwanda Immigration",
    type: "Government Partner",
    description: "Streamlined visa processing and immigration support services",
    logo: "/immigration-logo.png"
  },
  {
    name: "Rwanda Tourism Board",
    type: "Tourism Partner",
    description: "Official tourism authority promoting Rwanda as a destination",
    logo: "/rtb-logo.png"
  }
];

const airlines = [
  "RwandAir",
  "Kenya Airways",
  "Ethiopian Airlines",
  "Turkish Airlines",
  "Qatar Airways",
  "Brussels Airlines"
];

const hotels = [
  "Kigali Serena Hotel",
  "Radisson Blu Hotel",
  "Marriott Hotel",
  "Hôtel des Mille Collines",
  "Kigali Convention Centre",
  "Lemigo Hotel"
];

export function AirTravelPartnerships() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container-elegant">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
            Our Trusted Partners
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We work with leading government agencies, airlines, and hotels to provide you with 
            the best possible air travel assistance services in Rwanda.
          </p>
        </div>

        {/* Government & Authority Partners */}
        <div className="mb-16">
          <h3 className="text-2xl font-display font-semibold text-gray-900 mb-8 text-center">
            Government & Authority Partners
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {partners.map((partner, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 text-center">
                <div className="bg-gray-100 rounded-xl p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Building2 className="h-8 w-8 text-gray-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{partner.name}</h4>
                <p className="text-sm text-primary mb-2">{partner.type}</p>
                <p className="text-sm text-gray-600">{partner.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Airline Partners */}
        <div className="mb-16">
          <h3 className="text-2xl font-display font-semibold text-gray-900 mb-8 text-center">
            Airline Partners
          </h3>
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {airlines.map((airline, index) => (
                <div key={index} className="text-center">
                  <div className="bg-gray-100 rounded-xl p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                    <Plane className="h-8 w-8 text-gray-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-900">{airline}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-gray-600 mt-6">
              We work with major international and regional airlines serving Rwanda
            </p>
          </div>
        </div>

        {/* Hotel Partners */}
        <div className="mb-16">
          <h3 className="text-2xl font-display font-semibold text-gray-900 mb-8 text-center">
            Hotel Partners
          </h3>
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {hotels.map((hotel, index) => (
                <div key={index} className="text-center">
                  <div className="bg-gray-100 rounded-xl p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                    <Building2 className="h-8 w-8 text-gray-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-900">{hotel}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-gray-600 mt-6">
              Partner hotels across Rwanda offering competitive rates and excellent service
            </p>
          </div>
        </div>

        {/* Partnership Benefits */}
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h3 className="text-2xl font-display font-semibold text-gray-900 mb-8 text-center">
            Benefits of Our Partnerships
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Official Support</h4>
              <p className="text-sm text-gray-600">Direct access to government agencies and official channels</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Plane className="h-8 w-8 text-primary" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Priority Access</h4>
              <p className="text-sm text-gray-600">Faster processing and priority handling for our clients</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Expert Knowledge</h4>
              <p className="text-sm text-gray-600">Insider knowledge and expertise from our partners</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Quality Assurance</h4>
              <p className="text-sm text-gray-600">Vetted partners ensuring high-quality services</p>
            </div>
          </div>
        </div>

        {/* Partnership CTA */}
        <div className="mt-16 bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-display font-semibold mb-4">
            Experience the Power of Our Partnerships
          </h3>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Our strong relationships with government agencies, airlines, and hotels enable us to 
            provide you with exceptional service and exclusive benefits.
          </p>
          <button className="bg-white text-primary font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            Start Your Journey
          </button>
        </div>
      </div>
    </section>
  );
}
