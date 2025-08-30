"use client";

export function ToursHero() {
  return (
    <section className="relative py-24 bg-[url('/volcanoes-national-park-gorilla_AJ723tqm4-Photo-from-Getty-Images.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/70 to-black/60" />
      <div className="container-elegant relative z-10 text-center">
        <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6">
          Discover{" "}
          <span className="text-yellow-500">Rwanda</span> Through Our Tours
        </h1>
        <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
          From thrilling gorilla encounters to serene cultural experiences, our luxury tours 
          offer unforgettable adventures across Rwanda&apos;s most beautiful landscapes.
        </p>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-500 mb-2">15+</div>
            <div className="text-white/90 text-sm">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-500 mb-2">500+</div>
            <div className="text-white/90 text-sm">Happy Travelers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-500 mb-2">25+</div>
            <div className="text-white/90 text-sm">Tour Packages</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-500 mb-2">100%</div>
            <div className="text-white/90 text-sm">Satisfaction Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
}
