"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";

export function EventsRegistrationForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    eventId: "",
    participants: 1,
    contactName: "",
    email: "",
    phone: "",
    specialRequests: "",
    dietaryRestrictions: "",
    accessibilityNeeds: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Event registration:", formData);
    setIsSubmitted(true);
    
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        eventId: "",
        participants: 1,
        contactName: "",
        email: "",
        phone: "",
        specialRequests: "",
        dietaryRestrictions: "",
        accessibilityNeeds: ""
      });
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <section className="py-20 bg-green-50">
        <div className="container-elegant">
          <div className="max-w-2xl mx-auto text-center">
            <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
            <h2 className="text-4xl font-display font-bold text-green-900 mb-4">
              Registration Submitted!
            </h2>
            <p className="text-xl text-green-700 mb-8">
              Thank you for registering for our event! We&apos;ll review your registration 
              and send you a confirmation email within 24 hours with all the details.
            </p>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Registration Summary</h3>
              <div className="text-left space-y-2 text-sm text-gray-600">
                <div><strong>Event:</strong> {formData.eventId || "Selected Event"}</div>
                <div><strong>Participants:</strong> {formData.participants}</div>
                <div><strong>Contact:</strong> {formData.contactName}</div>
                <div><strong>Email:</strong> {formData.email}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container-elegant">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column - Form */}
          <div>
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-6">
              Event Registration
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Secure your spot at one of our upcoming events. Complete the form below 
              and we&apos;ll confirm your registration within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Event Selection */}
              <div>
                <label htmlFor="eventId" className="block text-sm font-medium text-gray-700 mb-2">
                  Select Event
                </label>
                <select
                  id="eventId"
                  name="eventId"
                  value={formData.eventId}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                  aria-label="Select an event to register for"
                >
                  <option value="">Choose an event...</option>
                  <option value="gorilla-trekking">Gorilla Trekking Adventure - March 15, 2025</option>
                  <option value="cultural-tour">Cultural Heritage Tour - March 22, 2025</option>
                  <option value="lake-kivu">Lake Kivu Adventure - April 5, 2025</option>
                  <option value="photography-safari">Photography Safari - April 12, 2025</option>
                  <option value="coffee-tea">Coffee & Tea Experience - April 19, 2025</option>
                  <option value="bird-watching">Bird Watching Expedition - April 26, 2025</option>
                </select>
              </div>

              {/* Number of Participants */}
              <div>
                <label htmlFor="participants" className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Participants
                </label>
                <input
                  id="participants"
                  type="number"
                  name="participants"
                  value={formData.participants}
                  onChange={handleInputChange}
                  min="1"
                  max="10"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                  aria-label="Enter number of participants"
                />
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Name
                  </label>
                  <input
                    id="contactName"
                    type="text"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                    aria-label="Enter contact name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                    aria-label="Enter email address"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                  aria-label="Enter phone number"
                />
              </div>

              {/* Special Requirements */}
              <div>
                <label htmlFor="dietaryRestrictions" className="block text-sm font-medium text-gray-700 mb-2">
                  Dietary Restrictions
                </label>
                <textarea
                  id="dietaryRestrictions"
                  name="dietaryRestrictions"
                  value={formData.dietaryRestrictions}
                  onChange={handleInputChange}
                  rows={2}
                  placeholder="e.g., Vegetarian, Gluten-free, Allergies..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  aria-label="Enter any dietary restrictions"
                />
              </div>

              <div>
                <label htmlFor="accessibilityNeeds" className="block text-sm font-medium text-gray-700 mb-2">
                  Accessibility Needs
                </label>
                <textarea
                  id="accessibilityNeeds"
                  name="accessibilityNeeds"
                  value={formData.accessibilityNeeds}
                  onChange={handleInputChange}
                  rows={2}
                  placeholder="e.g., Mobility assistance, hearing aids, visual aids..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  aria-label="Enter any accessibility needs"
                />
              </div>

              <div>
                <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-2">
                  Special Requests
                </label>
                <textarea
                  id="specialRequests"
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Any other special requirements or requests..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  aria-label="Enter any special requests"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-primary text-white font-semibold py-4 px-6 rounded-lg hover:bg-primary/90 transition-colors duration-200 text-lg"
              >
                Register for Event
              </button>
            </form>
          </div>

          {/* Right Column - Information */}
          <div className="space-y-8">
            {/* Registration Benefits */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h3 className="text-2xl font-display font-semibold text-gray-900 mb-6">
                Registration Benefits
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">Guaranteed spot in limited-capacity events</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">Early access to event details and updates</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">Special group discounts for multiple participants</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">Priority customer support</span>
                </div>
              </div>
            </div>

            {/* What&apos;s Included */}
            <div className="bg-blue-50 rounded-2xl p-8 border border-blue-200">
              <h3 className="text-2xl font-display font-semibold text-blue-900 mb-4">
                What&apos;s Included
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-blue-800">Professional Guides</span>
                  <span className="font-semibold text-blue-900">✓</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-800">Accommodation</span>
                  <span className="font-semibold text-blue-900">✓</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-800">Meals</span>
                  <span className="font-semibold text-blue-900">✓</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-800">Transportation</span>
                  <span className="font-semibold text-blue-900">✓</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-800">Equipment Rental</span>
                  <span className="font-semibold text-blue-900">✓</span>
                </div>
              </div>
            </div>

            {/* Cancellation Policy */}
            <div className="bg-yellow-50 rounded-2xl p-8 border border-yellow-200">
              <h3 className="text-2xl font-display font-semibold text-yellow-900 mb-4">
                Cancellation Policy
              </h3>
              <div className="space-y-3 text-sm text-yellow-800">
                <div><strong>30+ days:</strong> Full refund</div>
                <div><strong>15-29 days:</strong> 75% refund</div>
                <div><strong>7-14 days:</strong> 50% refund</div>
                <div><strong>Less than 7 days:</strong> No refund</div>
                <p className="text-xs mt-3">
                  * Weather-related cancellations may be rescheduled at no additional cost
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
