export interface Vehicle {
  id: string;
  slug: string;
  name: string;
  category: 'Economy' | 'Compact' | 'SUV' | 'Unique' | 'Minivan' | 'Adventure' | 'Executive';
  description: string;
  shortDescription: string;

  images: string[];
  specifications: {
    passengers: number;
    doors: number;
    transmission: 'Manual' | 'Automatic';
    fuelType: 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric';
    engineSize: string;
    power: string;
    fuelEfficiency: string;
    luggageCapacity: string;
    airConditioning: boolean;
    bluetooth: boolean;
    navigation: boolean;
    cruiseControl: boolean;
    parkingSensors: boolean;
    backupCamera: boolean;
    usbPorts: number;
    wifi: boolean;
  };
  available: boolean;
  pickupLocations: string[];
  includedServices: string[];
  additionalServices: string[];
  requirements: string[];
  insurance: {
    included: boolean;
    coverage: string;
    excess: string;
  };
  
  // Dashboard-specific fields
  make: string;
  model: string;
  year: number;
  plateNumber: string;
  dailyRate: number;
  status: 'available' | 'rented' | 'maintenance';
  location: string;
  mileage: number;
  lastService: string;
  nextService?: string;
}

export const vehicles: Vehicle[] = [
  {
    id: "1",
    slug: "toyota-corolla",
    name: "Toyota Corolla",
    category: "Economy",
    description: "The Toyota Corolla is a reliable and fuel-efficient compact sedan perfect for city driving and short trips. With its comfortable interior and excellent fuel economy, it's an ideal choice for budget-conscious travelers.",
    shortDescription: "Reliable and fuel-efficient compact sedan for city driving",

    images: [
      "/pexels-mikebirdy-170811.jpg",
      "/pexels-mikebirdy-170811.jpg",
      "/pexels-mikebirdy-170811.jpg"
    ],
    specifications: {
      passengers: 4,
      doors: 4,
      transmission: "Automatic",
      fuelType: "Petrol",
      engineSize: "1.8L",
      power: "139 hp",
      fuelEfficiency: "7.2L/100km",
      luggageCapacity: "370L",
      airConditioning: true,
      bluetooth: true,
      navigation: false,
      cruiseControl: true,
      parkingSensors: false,
      backupCamera: false,
      usbPorts: 2,
      wifi: false
    },
    available: true,
    pickupLocations: ["Kigali Airport", "Kigali City Center", "Kigali Hotels"],
    includedServices: [
      "Comprehensive insurance",
      "24/7 roadside assistance",
      "GPS navigation",
      "Unlimited mileage",
      "Vehicle cleaning"
    ],
    additionalServices: [
      "Additional driver",
      "Child seat",
      "GPS upgrade",
      "Airport pickup/drop-off",
      "Fuel service"
    ],
    requirements: [
      "Valid driving license",
      "Credit card for deposit",
      "Minimum age: 21",
      "Passport or ID"
    ],
    insurance: {
      included: true,
      coverage: "Comprehensive with zero excess",
      excess: "$0"
    },
    
    // Dashboard-specific fields
    make: "Toyota",
    model: "Corolla",
    year: 2022,
    plateNumber: "RAA-123A",
    dailyRate: 80,
    status: "available",
    location: "Kigali",
    mileage: 45000,
    lastService: "2024-01-15",
    nextService: "2024-07-15"
  },
  {
    id: "2",
    slug: "honda-cr-v",
    name: "Honda CR-V",
    category: "SUV",
    description: "The Honda CR-V offers spacious comfort and versatility for families and groups. With its all-wheel drive capability and generous cargo space, it's perfect for exploring Rwanda's diverse landscapes.",
    shortDescription: "Spacious SUV with all-wheel drive for family adventures",

    images: [
      "/pexels-mikebirdy-170811.jpg",
      "/pexels-mikebirdy-170811.jpg",
      "/pexels-mikebirdy-170811.jpg"
    ],
    specifications: {
      passengers: 6,
      doors: 5,
      transmission: "Automatic",
      fuelType: "Petrol",
      engineSize: "2.0L",
      power: "150 hp",
      fuelEfficiency: "8.5L/100km",
      luggageCapacity: "522L",
      airConditioning: true,
      bluetooth: true,
      navigation: true,
      cruiseControl: true,
      parkingSensors: true,
      backupCamera: true,
      usbPorts: 4,
      wifi: false
    },
    available: true,
    pickupLocations: ["Kigali Airport", "Kigali City Center", "Kigali Hotels"],
    includedServices: [
      "Comprehensive insurance",
      "24/7 roadside assistance",
      "GPS navigation",
      "Unlimited mileage",
      "Vehicle cleaning"
    ],
    additionalServices: [
      "Additional driver",
      "Child seat",
      "GPS upgrade",
      "Airport pickup/drop-off",
      "Fuel service"
    ],
    requirements: [
      "Valid driving license",
      "Credit card for deposit",
      "Minimum age: 21",
      "Passport or ID"
    ],
    insurance: {
      included: true,
      coverage: "Comprehensive with zero excess",
      excess: "$0"
    },
    
    // Dashboard-specific fields
    make: "Honda",
    model: "CR-V",
    year: 2021,
    plateNumber: "RAA-456B",
    dailyRate: 120,
    status: "available",
    location: "Kigali",
    mileage: 52000,
    lastService: "2024-02-10",
    nextService: "2024-08-10"
  },
  {
    id: "3",
    slug: "mercedes-c-class",
    name: "Mercedes C-Class",
    category: "Unique",
    description: "Experience Unique and sophistication with the Mercedes C-Class. This premium sedan combines elegant design with cutting-edge technology, offering an exceptional driving experience for discerning travelers.",
    shortDescription: "Premium Unique sedan with cutting-edge technology",

    images: [
      "/pexels-mikebirdy-170811.jpg",
      "/Landscape-of-the-Virunga-Mountains-in-Rwanda.jpg",
      "/hotel-exterior-daytime.jpg"
    ],
    specifications: {
      passengers: 4,
      doors: 4,
      transmission: "Automatic",
      fuelType: "Petrol",
      engineSize: "2.0L",
      power: "197 hp",
      fuelEfficiency: "6.8L/100km",
      luggageCapacity: "455L",
      airConditioning: true,
      bluetooth: true,
      navigation: true,
      cruiseControl: true,
      parkingSensors: true,
      backupCamera: true,
      usbPorts: 6,
      wifi: true
    },
    available: true,
    pickupLocations: ["Kigali Airport", "Kigali City Center", "Kigali Hotels"],
    includedServices: [
      "Comprehensive insurance",
      "24/7 roadside assistance",
      "GPS navigation",
      "Unlimited mileage",
      "Vehicle cleaning",
      "Concierge service"
    ],
    additionalServices: [
      "Additional driver",
      "Child seat",
      "GPS upgrade",
      "Airport pickup/drop-off",
      "Fuel service",
      "Chauffeur service"
    ],
    requirements: [
      "Valid driving license",
      "Credit card for deposit",
      "Minimum age: 25",
      "Passport or ID"
    ],
    insurance: {
      included: true,
      coverage: "Comprehensive with zero excess",
      excess: "$0"
    },
    // Dashboard-specific fields
    make: "Mercedes",
    model: "C-Class",
    year: 2022,
    plateNumber: "RAA-789C",
    dailyRate: 150,
    status: "available",
    location: "Kigali",
    mileage: 55000,
    lastService: "2024-03-15",
    nextService: "2024-09-15"
  },
  {
    id: "4",
    slug: "toyota-hiace",
    name: "Toyota Hiace",
    category: "Minivan",
    description: "The Toyota Hiace is perfect for larger groups and business travel. With seating for up to 8 passengers and ample luggage space, it's ideal for corporate events, family trips, and airport transfers.",
    shortDescription: "Spacious minivan for groups and business travel",

    images: [
      "/pexels-esmihel-20200900.jpg",
      "/pexels-esmihel-20200900.jpg",
      "/pexels-mikebirdy-170811.jpg"
    ],
    specifications: {
      passengers: 8,
      doors: 5,
      transmission: "Automatic",
      fuelType: "Diesel",
      engineSize: "2.4L",
      power: "150 hp",
      fuelEfficiency: "8.2L/100km",
      luggageCapacity: "850L",
      airConditioning: true,
      bluetooth: true,
      navigation: true,
      cruiseControl: true,
      parkingSensors: true,
      backupCamera: true,
      usbPorts: 4,
      wifi: false
    },
    available: true,
    pickupLocations: ["Kigali Airport", "Kigali City Center", "Kigali Hotels"],
    includedServices: [
      "Comprehensive insurance",
      "24/7 roadside assistance",
      "GPS navigation",
      "Unlimited mileage",
      "Vehicle cleaning"
    ],
    additionalServices: [
      "Additional driver",
      "Child seat",
      "GPS upgrade",
      "Airport pickup/drop-off",
      "Fuel service"
    ],
    requirements: [
      "Valid driving license",
      "Credit card for deposit",
      "Minimum age: 21",
      "Passport or ID"
    ],
    insurance: {
      included: true,
      coverage: "Comprehensive with zero excess",
      excess: "$0"
    },
    // Dashboard-specific fields
    make: "Toyota",
    model: "Hiace",
    year: 2021,
    plateNumber: "RAA-101D",
    dailyRate: 100,
    status: "available",
    location: "Kigali",
    mileage: 60000,
    lastService: "2024-04-10",
    nextService: "2024-10-10"
  },
  {
    id: "5",
    slug: "land-rover-defender",
    name: "Land Rover Defender",
    category: "Adventure",
    description: "Conquer any terrain with the legendary Land Rover Defender. Built for adventure, this rugged 4x4 is perfect for exploring Rwanda's national parks, mountains, and off-road destinations.",
    shortDescription: "Rugged 4x4 for off-road adventures and exploration",

    images: [
      "/pexels-esmihel-20200900.jpg",
      "/pexels-esmihel-20200900.jpg"
    ],
    specifications: {
      passengers: 4,
      doors: 5,
      transmission: "Automatic",
      fuelType: "Diesel",
      engineSize: "2.0L",
      power: "200 hp",
      fuelEfficiency: "9.5L/100km",
      luggageCapacity: "600L",
      airConditioning: true,
      bluetooth: true,
      navigation: true,
      cruiseControl: true,
      parkingSensors: true,
      backupCamera: true,
      usbPorts: 4,
      wifi: false
    },
    available: false,
    pickupLocations: ["Kigali Airport", "Kigali City Center", "Kigali Hotels"],
    includedServices: [
      "Comprehensive insurance",
      "24/7 roadside assistance",
      "GPS navigation",
      "Unlimited mileage",
      "Vehicle cleaning",
      "Off-road support"
    ],
    additionalServices: [
      "Additional driver",
      "Child seat",
      "GPS upgrade",
      "Airport pickup/drop-off",
      "Fuel service",
      "Adventure guide"
    ],
    requirements: [
      "Valid driving license",
      "Credit card for deposit",
      "Minimum age: 25",
      "Passport or ID",
      "Off-road experience preferred"
    ],
    insurance: {
      included: true,
      coverage: "Comprehensive with zero excess",
      excess: "$0"
    },
    // Dashboard-specific fields
    make: "Land Rover",
    model: "Defender",
    year: 2022,
    plateNumber: "RAA-202E",
    dailyRate: 180,
    status: "rented",
    location: "Kigali",
    mileage: 70000,
    lastService: "2024-05-15",
    nextService: "2024-11-15"
  },
  {
    id: "6",
    slug: "bmw-5-series",
    name: "BMW 5 Series",
    category: "Executive",
    description: "The BMW 5 Series represents the perfect balance of Unique and performance. With its sophisticated design, advanced technology, and exceptional driving dynamics, it's the choice for executive travel.",
    shortDescription: "Executive sedan with Unique and performance",

    images: [
      "/pexels-esmihel-20200900.jpg",
      "/pexels-esmihel-20200900.jpg",
      "/hotel-exterior-daytime.jpg"
    ],
    specifications: {
      passengers: 4,
      doors: 4,
      transmission: "Automatic",
      fuelType: "Petrol",
      engineSize: "2.0L",
      power: "184 hp",
      fuelEfficiency: "7.0L/100km",
      luggageCapacity: "530L",
      airConditioning: true,
      bluetooth: true,
      navigation: true,
      cruiseControl: true,
      parkingSensors: true,
      backupCamera: true,
      usbPorts: 6,
      wifi: true
    },
    available: true,
    pickupLocations: ["Kigali Airport", "Kigali City Center", "Kigali Hotels"],
    includedServices: [
      "Comprehensive insurance",
      "24/7 roadside assistance",
      "GPS navigation",
      "Unlimited mileage",
      "Vehicle cleaning",
      "Concierge service"
    ],
    additionalServices: [
      "Additional driver",
      "Child seat",
      "GPS upgrade",
      "Airport pickup/drop-off",
      "Fuel service",
      "Chauffeur service"
    ],
    requirements: [
      "Valid driving license",
      "Credit card for deposit",
      "Minimum age: 25",
      "Passport or ID"
    ],
    insurance: {
      included: true,
      coverage: "Comprehensive with zero excess",
      excess: "$0"
    },
    // Dashboard-specific fields
    make: "BMW",
    model: "5 Series",
    year: 2022,
    plateNumber: "RAA-303F",
    dailyRate: 200,
    status: "available",
    location: "Kigali",
    mileage: 75000,
    lastService: "2024-06-15",
    nextService: "2024-12-15"
  }
];

export const getVehicleBySlug = (slug: string): Vehicle | undefined => {
  return vehicles.find(vehicle => vehicle.slug === slug);
};

export const getVehiclesByCategory = (category: Vehicle['category']): Vehicle[] => {
  return vehicles.filter(vehicle => vehicle.category === category);
};

export const getAllVehicles = (): Vehicle[] => {
  return vehicles;
};

export const getFeaturedVehicles = (): Vehicle[] => {
  return vehicles.filter(vehicle => vehicle.available).slice(0, 6);
};

export const getAvailableVehicles = (): Vehicle[] => {
  return vehicles.filter(vehicle => vehicle.available);
};
