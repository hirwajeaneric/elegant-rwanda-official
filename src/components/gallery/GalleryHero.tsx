"use client";

export function GalleryHero() {
  return (
    <section className="relative py-24 bg-[url('/Landscape-of-the-Virunga-Mountains-in-Rwanda.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/70 to-black/60" />
      <div className="container-elegant relative z-10 text-center">
        <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6">
          Discover{" "}
          <span className="text-yellow-500">Rwanda</span> Through Photos
        </h1>
        <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
          Immerse yourself in the breathtaking beauty of Rwanda through our curated collection 
          of stunning photographs capturing wildlife, landscapes, culture, and luxury experiences.
        </p>
        
        {/* Gallery Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-500 mb-2">500+</div>
            <div className="text-white/90 text-sm">Photos</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-500 mb-2">15+</div>
            <div className="text-white/90 text-sm">Categories</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-500 mb-2">50+</div>
            <div className="text-white/90 text-sm">Locations</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-500 mb-2">24/7</div>
            <div className="text-white/90 text-sm">Access</div>
          </div>
        </div>
      </div>
    </section>
  );
}
