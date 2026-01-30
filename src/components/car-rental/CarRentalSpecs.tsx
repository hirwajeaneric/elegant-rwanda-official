"use client";

import {
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
  Shield
} from "lucide-react";
import type { Vehicle } from "@/data/car-rental";

interface CarRentalSpecsProps {
  vehicle: Vehicle;
}

export function CarRentalSpecs({ vehicle }: CarRentalSpecsProps) {
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
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-display font-bold text-gray-900 mb-2">
          Technical Specifications
        </h2>
        <p className="text-gray-600">
          Detailed specifications and features of this vehicle.
        </p>
      </div>

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
              <div className={`rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center ${feature.available
                  ? "bg-green-100 text-green-600"
                  : "bg-gray-100 text-gray-400"
                }`}>
                <feature.icon className="h-8 w-8" />
              </div>
              <div className="text-sm text-gray-600 mb-1">{feature.label}</div>
              <div className={`font-semibold ${feature.available ? "text-green-600" : "text-gray-400"
                }`}>
                {feature.available ? "Available" : "Not Available"}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Safety & Security */}
      {/* <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
        <h3 className="text-xl font-display font-semibold text-gray-900 mb-4">
          Safety & Security Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Shield className="h-5 w-5 text-primary mr-2" />
              Safety Features
            </h4>
            <ul className="space-y-2 text-gray-600">
              <li>• Anti-lock Braking System (ABS)</li>
              <li>• Electronic Stability Control</li>
              <li>• Multiple Airbags</li>
              <li>• Child Safety Locks</li>
              <li>• Tire Pressure Monitoring</li>
              <li>• Emergency Brake Assist</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Shield className="h-5 w-5 text-primary mr-2" />
              Security Features
            </h4>
            <ul className="space-y-2 text-gray-600">
              <li>• Immobilizer System</li>
              <li>• Central Locking</li>
              <li>• Alarm System</li>
              <li>• Steering Lock</li>
              <li>• GPS Tracking (Optional)</li>
              <li>• 24/7 Roadside Assistance</li>
            </ul>
          </div>
        </div>
      </div> */}
    </div>
  );
}
