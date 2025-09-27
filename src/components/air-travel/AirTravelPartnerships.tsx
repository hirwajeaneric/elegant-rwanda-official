

import { Building2, Plane, Shield, Users } from "lucide-react";
import Image from "next/image";

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
  {
    name: "RwandAir",
    logo: "/logos/RwandAir_Logotype.png"
  },
  {
    name: "Kenya Airways",
    type: "Airline Partner",
    description: "Official airline of Kenya",
    logo: "/logos/Kenya_Airways_Logo.svg"
  },
  {
    name: "Ethiopian Airlines",
    type: "Airline Partner",
    description: "Official airline of Ethiopia",
    logo: "/logos/Ethiopian_Airlines_Logo.svg.png"
  },
  {
    name: "Turkish Airlines",
    type: "Airline Partner",
    description: "Official airline of Turkey",
    logo: "/logos/Turkish_Airlines_logo_(2010-2017).svg.png"
  },
  {
    name: "Qatar Airways",
    type: "Airline Partner",
    description: "Official airline of Qatar",
    logo: "/logos/Qatar_Airways_Logo.png"
  },
  {
    name: "Brussels Airlines",
    type: "Airline Partner",
    description: "Official airline of Belgium",
    logo: "/logos/Brussels_airlines_logo_2021.svg"
  },
  {
    name: "KLM Airlines",
    type: "Airline Partner",
    description: "Official airline of Netherlands",
    logo: "/logos/KLM_logo.svg.png"
  },
  {
    name: "Auric Air",
    type: "Airline Partner",
    description: "Official airline of Austria",
    logo: "/logos/AuricAirLogo.png"
  },
  {
    name: "Astral Aviation",
    type: "Airline Partner",
    description: "Official airline of Uganda",
    logo: "/logos/Astral_Aviation_logo.svg.png"
  },
  {
    name: "Magma Aviation",
    type: "Airline Partner",
    description: "Official airline of Uganda",
    logo: "/logos/Magma_Aviation_Logo.png"
  }
];

const hotels = [
  {
    name: "Kigali Serena Hotel",
    logo: "/serenakigali.svg"
  },
  {
    name: "Radisson Blu Hotel",
    logo: "/Radisson_Blu_logo.png"
  },
  {
    name: "Marriott Hotel",
    logo: "/Marriott-logo2.jpg"
  },
  {
    name: "Hôtel des Mille Collines",
    logo: "/Hotel-de-mille-collines.jpeg"
  },
  {
    name: "Kigali Convention Centre",
    logo: "/Kigali-convention-center-logo.png"
  },
  {
    name: "Lemigo Hotel",
    logo: "/Lemigo Hotel.png"
  }
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

        {/* Airline Partners */}
        <div className="mb-16">
          <h3 className="text-2xl font-display font-semibold text-gray-900 mb-8 text-center">
            Airline Partners
          </h3>
          <div className="bg-white rounded-2xl p-8 shadow-sm space-y-12">
            <p className="text-center text-gray-600">
              We work with major international and regional airlines serving Rwanda
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 justify-center items-center">
              {airlines.map((airline, index) => (
                <Image key={index} src={airline.logo} alt={airline.name} width={100} height={100} className="mx-auto" />
              ))}
            </div>
          </div>
        </div>

        {/* Hotel Partners */}
        <div className="mb-16">
          <h3 className="text-2xl font-display font-semibold text-gray-900 mb-8 text-center">
            Hotel Partners
          </h3>
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <p className="text-center text-gray-600 mb-6">
              Partner hotels across Rwanda offering competitive rates and excellent service
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 justify-center items-center">
              {hotels.map((hotel, index) => (
                <div key={index} className="text-center">
                  <Image src={hotel.logo} alt={hotel.name} width={100} height={100} className="mx-auto" />
                </div>
              ))}
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
          <button className="bg-white text-primary font-semibold py-3 px-8 hover:bg-gray-100 transition-colors duration-200 rounded-full">
            Start Your Journey
          </button>
        </div>
      </div>
    </section>
  );
}
