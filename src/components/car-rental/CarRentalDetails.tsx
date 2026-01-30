"use client";

import {
  Check,
  X,
  Shield,
  MapPin,
  Users,
  DoorOpen,
  Settings,
  Fuel,
  Gauge,
  Zap,
  Wifi,
  Snowflake,
  Navigation,
  Settings2,
  Camera,
  ParkingMeter,
  Usb,
} from "lucide-react";
import { sanitizeHtml } from "@/lib/html-sanitizer";
import type { Vehicle } from "@/data/car-rental";

interface CarRentalDetailsProps {
  vehicle: Vehicle;
}

export function CarRentalDetails({ vehicle }: CarRentalDetailsProps) {
  const specs = vehicle.specifications;

  const specItems = [
    { icon: Users, label: "Passengers", value: specs.passengers.toString() },
    { icon: DoorOpen, label: "Doors", value: specs.doors.toString() },
    { icon: Settings, label: "Transmission", value: specs.transmission },
    { icon: Fuel, label: "Fuel Type", value: specs.fuelType },
    { icon: Gauge, label: "Engine Size", value: specs.engineSize },
    { icon: Zap, label: "Power", value: specs.power },
    { icon: Fuel, label: "Fuel Efficiency", value: specs.fuelEfficiency },
    { icon: Users, label: "Luggage Capacity", value: specs.luggageCapacity },
  ];

  const comfortFeatures = [
    { icon: Snowflake, label: "Air Conditioning", available: specs.airConditioning },
    { icon: Wifi, label: "Bluetooth", available: specs.bluetooth },
    { icon: Navigation, label: "Navigation", available: specs.navigation },
    { icon: Settings2, label: "Cruise Control", available: specs.cruiseControl },
    { icon: ParkingMeter, label: "Parking Sensors", available: specs.parkingSensors },
    { icon: Camera, label: "Backup Camera", available: specs.backupCamera },
    { icon: Usb, label: `USB Ports (${specs.usbPorts})`, available: specs.usbPorts > 0 },
    { icon: Wifi, label: "WiFi Hotspot", available: specs.wifi },
  ];

  return (
    <div className="space-y-8">
      {/* About This Vehicle */}
      <div>
        <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
          About this <span className="text-primary">{vehicle.name}</span>
        </h2>
        {vehicle.shortDescription && (
          <p className="text-base text-gray-600 leading-relaxed mb-4">
            {vehicle.shortDescription}
          </p>
        )}
        {vehicle.description && (
          <div
            className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-4"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(vehicle.description) }}
          />
        )}
      </div>

      {/* Technical Specifications */}
      <div className="space-y-6">
        {/* Basic Specifications */}
        <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
          <h3 className="text-xl font-display font-semibold text-gray-900 mb-4">
            Basic Specifications
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {specItems.map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <item.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-sm text-gray-600 mb-1">{item.label}</div>
                <div className="font-semibold text-gray-900">{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Comfort & Technology Features */}
        <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
          <h3 className="text-xl font-display font-semibold text-gray-900 mb-4">
            Comfort & Technology Features
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {comfortFeatures.map((feature, index) => (
              <div key={index} className="text-center">
                <div
                  className={`rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center ${feature.available
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-100 text-gray-400"
                    }`}
                >
                  <feature.icon className="h-8 w-8" />
                </div>
                <div className="text-sm text-gray-600 mb-1">{feature.label}</div>
                <div
                  className={`font-semibold ${feature.available ? "text-green-600" : "text-gray-400"
                    }`}
                >
                  {feature.available ? "Available" : "Not Available"}
                </div>
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
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <span className="text-gray-700">{location}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* What's Included, Requirements, and Insurance Details - Last */}
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
                <Check className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                <span className="text-green-800">{service}</span>
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
                <div className="h-2 w-2 bg-blue-600 rounded-full mt-2 shrink-0" />
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
              <span
                className={`font-semibold ${vehicle.insurance.included ? "text-green-600" : "text-red-600"
                  }`}
              >
                {vehicle.insurance.included ? "Yes" : "No"}
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
  );
}
