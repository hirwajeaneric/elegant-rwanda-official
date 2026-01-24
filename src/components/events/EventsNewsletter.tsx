"use client";

import { useState } from "react";
import { Mail, Bell, Calendar, Users, CheckCircle } from "lucide-react";
import { subscribeToNewsletter } from "@/lib/client-submit";
import { toast } from "sonner";

export function EventsNewsletter() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [preferences, setPreferences] = useState({
    newEvents: true,
    specialOffers: true,
    eventReminders: true,
    photography: false,
    wildlife: false,
    cultural: false,
    adventure: false
  });

  const handlePreferenceChange = (key: string) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await subscribeToNewsletter({
        email,
        source: "events-newsletter",
        preferences,
      });
      
      toast.success("Successfully subscribed to our events newsletter!");
      setIsSubmitted(true);
      
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail("");
        setPreferences({
          newEvents: true,
          specialOffers: true,
          eventReminders: true,
          photography: false,
          wildlife: false,
          cultural: false,
          adventure: false
        });
      }, 3000);
    } catch (error) {
      console.error(error);
      const message = error instanceof Error ? error.message : "Failed to subscribe. Please try again.";
      toast.error(message);
    }
  };

  if (isSubmitted) {
    return (
      <section className="py-20 bg-green-50">
        <div className="container-elegant">
          <div className="max-w-2xl mx-auto text-center">
            <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
            <h2 className="text-4xl font-display font-bold text-green-900 mb-4">
              Successfully Subscribed!
            </h2>
            <p className="text-xl text-green-700 mb-8">
              Thank you for subscribing to our events newsletter! You&apos;ll now receive 
              updates about new events, special offers, and exclusive experiences.
            </p>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Subscription Details</h3>
              <div className="text-left space-y-2 text-sm text-gray-600">
                <div><strong>Email:</strong> {email}</div>
                <div><strong>Preferences:</strong> {Object.values(preferences).filter(Boolean).length} categories selected</div>
                <div><strong>Updates:</strong> New events, special offers, and reminders</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-linear-to-r from-black to-primary">
      <div className="container-elegant">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <div className="text-white">
            <h2 className="text-4xl font-display font-bold mb-6">
              Stay Updated with Our Events
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Never miss out on exciting events and special experiences. Subscribe to our newsletter 
              and be the first to know about new adventures, exclusive offers, and early bird discounts.
            </p>
            
            {/* Benefits */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <Bell className="h-5 w-5 text-yellow-400" />
                <span className="text-white/90">Early access to event registrations</span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-yellow-400" />
                <span className="text-white/90">Exclusive event calendar updates</span>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="h-5 w-5 text-yellow-400" />
                <span className="text-white/90">Special group travel opportunities</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-yellow-400" />
                <span className="text-white/90">Personalized event recommendations</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400 mb-1">500+</div>
                <div className="text-sm text-white/80">Subscribers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400 mb-1">12+</div>
                <div className="text-sm text-white/80">Events/Year</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400 mb-1">24h</div>
                <div className="text-sm text-white/80">Response Time</div>
              </div>
            </div>
          </div>

          {/* Right Column - Newsletter Form */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-display font-semibold text-white mb-6">
              Subscribe to Our Newsletter
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div>
                <label htmlFor="newsletter-email" className="block text-sm font-medium text-white/90 mb-2">
                  Email Address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-full bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Enter your email address"
                  required
                  aria-label="Enter email address for newsletter"
                />
              </div>

              {/* Notification Preferences */}
              <div>
                <label className="block text-sm font-medium text-white/90 mb-3">
                  Notification Preferences
                </label>
                <div className="space-y-2">
                  {Object.entries(preferences).map(([key, value]) => (
                    <label key={key} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={() => handlePreferenceChange(key)}
                        className="rounded-full border-white/30 text-yellow-500 focus:ring-yellow-500 bg-white/20"
                      />
                      <span className="text-sm text-white/90 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-yellow-500 rounded-full text-black font-semibold py-3 px-6 hover:bg-yellow-400 transition-colors duration-200"
              >
                Subscribe to Newsletter
              </button>
            </form>

            <p className="text-xs text-white/60 mt-4 text-center">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
