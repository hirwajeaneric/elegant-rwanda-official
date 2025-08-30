import Link from "next/link";
import { Search, Home, ArrowLeft, MapPin, Phone, Mail } from "lucide-react";

export const dynamic = 'force-dynamic';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl md:text-[12rem] font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 leading-none">
            404
          </h1>
        </div>

        {/* Main Message */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Page Not Found
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            The page you&apos;re looking for seems to have wandered off on its own adventure. 
            Let us help you find your way back to exploring Rwanda&apos;s beauty.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-12 max-w-md mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for tours, services, or destinations..."
              className="w-full px-6 py-4 pl-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              aria-label="Search for content on the website"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-white/60" />
          </div>
        </div>

        {/* Quick Links */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-white mb-6">
            Popular Pages
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <Link
              href="/"
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/20 transition-all duration-200 group"
            >
              <Home className="h-8 w-8 text-yellow-400 mx-auto mb-2 group-hover:scale-110 transition-transform duration-200" />
              <span className="text-white font-medium">Home</span>
            </Link>
            
            <Link
              href="/tours"
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/20 transition-all duration-200 group"
            >
              <MapPin className="h-8 w-8 text-yellow-400 mx-auto mb-2 group-hover:scale-110 transition-transform duration-200" />
              <span className="text-white font-medium">Tours</span>
            </Link>
            
            <Link
              href="/contact"
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/20 transition-all duration-200 group"
            >
              <Mail className="h-8 w-8 text-yellow-400 mx-auto mb-2 group-hover:scale-110 transition-transform duration-200" />
              <span className="text-white font-medium">Contact</span>
            </Link>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-4 bg-yellow-500 text-black font-semibold rounded-xl hover:bg-yellow-400 transition-colors duration-200 group"
          >
            <Home className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
            Back to Home
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-200 group"
          >
            <ArrowLeft className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
            Go Back
          </button>
        </div>

        {/* Contact Information */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold text-white mb-4">
            Need Help Finding Something?
          </h3>
          <p className="text-gray-300 mb-6">
            Our travel experts are here to help you discover the perfect Rwanda experience.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-yellow-400" />
              <div className="text-left">
                <div className="text-white font-medium">Call Us</div>
                <div className="text-gray-300 text-sm">+250 788 123 456</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-yellow-400" />
              <div className="text-left">
                <div className="text-white font-medium">Email Us</div>
                <div className="text-gray-300 text-sm">info@elegantrwanda.com</div>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-yellow-500 text-black font-medium rounded-lg hover:bg-yellow-400 transition-colors duration-200"
            >
              Get in Touch
            </Link>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-gray-400 text-sm">
          <p>
            © 2025 Elegant Rwanda. All Rights Reserved. | Designed with ♥ in Rwanda
          </p>
        </div>
      </div>
    </div>
  );
}
