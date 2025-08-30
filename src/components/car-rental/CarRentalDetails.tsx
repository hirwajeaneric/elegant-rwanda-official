"use client";

import { Check, X, Shield, MapPin } from "lucide-react";
import type { Vehicle } from "@/data/car-rental";

interface CarRentalDetailsProps {
  vehicle: Vehicle;
}

export function CarRentalDetails({ vehicle }: CarRentalDetailsProps) {
  return (
    <section className="py-20 bg-white">
      <div className="container-elegant">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column - Description */}
          <div>
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-6">
              About This Vehicle
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              {vehicle.description}
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              {vehicle.shortDescription}
            </p>

            {/* Key Features */}
            <div className="mb-8">
              <h3 className="text-2xl font-display font-semibold text-gray-900 mb-4">
                Key Features
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {vehicle.features.slice(0, 8).map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pickup Locations */}
            <div className="mb-8">
              <h3 className="text-2xl font-display font-semibold text-gray-900 mb-4">
                Pickup Locations
              </h3>
              <div className="space-y-2">
                {vehicle.pickupLocations.map((location, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-gray-700">{location}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Inclusions & Exclusions */}
          <div className="space-y-8">
            {/* What&apos;s Included */}
            <div className="bg-green-50 rounded-2xl p-8 border border-green-200">
              <h3 className="text-2xl font-display font-semibold text-green-900 mb-4 flex items-center">
                <Check className="h-6 w-6 text-green-600 mr-3" />
                What&apos;s Included
              </h3>
              <ul className="space-y-3">
                {vehicle.includedServices.map((service, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-green-800">{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What&apos;s Not Included */}
            <div className="bg-red-50 rounded-2xl p-8 border border-red-200">
              <h3 className="text-2xl font-display font-semibold text-red-900 mb-4 flex items-center">
                <X className="h-6 w-6 text-red-600 mr-3" />
                What&apos;s Not Included
              </h3>
              <ul className="space-y-3">
                {vehicle.additionalServices.map((service, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <X className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-red-800">{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div className="bg-blue-50 rounded-2xl p-8 border border-blue-200">
              <h3 className="text-2xl font-display font-semibold text-blue-900 mb-4 flex items-center">
                <Shield className="h-6 w-6 text-blue-600 mr-3" />
                Requirements
              </h3>
              <ul className="space-y-3">
                {vehicle.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="h-2 w-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-blue-800">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Insurance Information */}
            <div className="bg-yellow-50 rounded-2xl p-8 border border-yellow-200">
              <h3 className="text-2xl font-display font-semibold text-yellow-900 mb-4 flex items-center">
                <Shield className="h-6 w-6 text-yellow-600 mr-3" />
                Insurance Details
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-yellow-800">Coverage Included</span>
                  <span className={`font-semibold ${vehicle.insurance.included ? 'text-green-600' : 'text-red-600'}`}>
                    {vehicle.insurance.included ? 'Yes' : 'No'}
                  </span>
                </div>
                {vehicle.insurance.included && (
                  <>
                    <div className="text-sm text-yellow-700">
                      <strong>Coverage:</strong> {vehicle.insurance.coverage}
                    </div>
                    <div className="text-sm text-yellow-700">
                      <strong>Excess:</strong> {vehicle.insurance.excess}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
