"use client";

export function FAQHero() {
  return (
    <section className="relative py-24 bg-[url('/kigali.jpeg')] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/70 to-black/60" />
      <div className="container-elegant relative z-10 text-center">
        <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6">
          Frequently Asked{" "}
          <span className="text-yellow-500">Questions</span>
        </h1>
        <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
          Find answers to common questions about our luxury travel services, 
          tour packages, and everything you need to know about visiting Rwanda.
        </p>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mt-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-500 mb-2">15+</div>
            <div className="text-white/90 text-sm">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-500 mb-2">500+</div>
            <div className="text-white/90 text-sm">Happy Travelers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-500 mb-2">24/7</div>
            <div className="text-white/90 text-sm">Support Available</div>
          </div>
        </div>
      </div>
    </section>
  );
}
