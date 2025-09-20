"use client";

export function BlogHero() {
  return (
    <section className="relative py-24 bg-[url('/green-hills-of-rwanda.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/70 to-black/60" />
      <div className="container-elegant relative z-10 text-center">
        <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6">
          Discover{" "}
          <span className="text-yellow-500">Rwanda</span> Through Stories
        </h1>
        <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
          Expert travel tips, cultural insights, wildlife encounters, and insider knowledge 
          to help you plan the perfect Rwanda adventure.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm border border-white/30">
            Travel Tips
          </span>
          <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm border border-white/30">
            Wildlife
          </span>
          <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm border border-white/30">
            Culture
          </span>
          <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm border border-white/30">
            Unique Travel
          </span>
        </div>
      </div>
    </section>
  );
}
