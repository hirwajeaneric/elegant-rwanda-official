export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorImage: string;
  publishDate: string;
  readTime: string;
  category: 'Tours' | 'Tips' | 'Culture' | 'Wildlife' | 'Luxury' | 'News';
  tags: string[];
  featuredImage: string;
  featured: boolean;
  slug: string;
  metaTitle?: string;
  metaDescription?: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Ultimate Guide to Gorilla Trekking in Rwanda',
    excerpt: 'Everything you need to know about planning your once-in-a-lifetime gorilla trekking adventure in Rwanda\'s Volcanoes National Park.',
    content: `
      <div>
        <p>
          Gorilla trekking in Rwanda is one of the most extraordinary wildlife experiences on Earth. 
          This comprehensive guide will help you plan your adventure to encounter these magnificent 
          creatures in their natural habitat.
        </p>

        <h2>Why Choose Rwanda for Gorilla Trekking?</h2>
        <p>
          Rwanda offers one of the most accessible and well-organized gorilla trekking experiences in Africa. 
          The Volcanoes National Park is home to several habituated gorilla families, making sightings almost guaranteed.
        </p>

        <h3>Best Time to Visit</h3>
        <ul>
          <li><strong>Dry Season (June-September):</strong> Easier trekking conditions, clearer views</li>
          <li><strong>Wet Season (March-May, October-November):</strong> Lush vegetation, fewer crowds</li>
          <li><strong>Peak Season:</strong> July-August (book permits 6-12 months in advance)</li>
        </ul>

        <h3>What to Expect</h3>
        <p>
          A typical gorilla trekking day begins early in the morning with a briefing at the park headquarters. 
          You'll be assigned to a gorilla family based on your fitness level and preferences.
        </p>
        <p>
          The trek itself can take anywhere from 30 minutes to 4 hours, depending on where the gorillas are located. 
          Once you find them, you'll spend exactly one hour observing these gentle giants.
        </p>

        <h3>Essential Packing List</h3>
        <ul>
          <li><strong>Clothing:</strong> Long-sleeved shirts, long pants, waterproof jacket</li>
          <li><strong>Footwear:</strong> Sturdy hiking boots with good ankle support</li>
          <li><strong>Accessories:</strong> Hat, sunglasses, gloves, rain gear</li>
          <li><strong>Equipment:</strong> Camera, binoculars, water bottle</li>
          <li><strong>Documents:</strong> Passport, permit, travel insurance</li>
        </ul>

        <h3>Photography Tips</h3>
        <ul>
          <li>Use a camera with good zoom capabilities</li>
          <li>Avoid flash photography</li>
          <li>Respect the 7-meter distance rule</li>
          <li>Capture both close-ups and environmental shots</li>
        </ul>

        <h2>Booking Your Trek</h2>
        <p>
          Gorilla trekking permits in Rwanda cost <strong>$1,500</strong> per person and should be booked well in advance. 
          Elegant Rwanda can help you secure permits and arrange all logistics for your trekking adventure.
        </p>

        <h2>Conservation Impact</h2>
        <p>
          Your visit directly contributes to gorilla conservation efforts. The permit fees support park management, 
          anti-poaching measures, and community development programs.
        </p>

        <h2>Conclusion</h2>
        <p>
          Gorilla trekking in Rwanda is more than just a wildlife encounter—it's a transformative experience 
          that connects you with nature in its purest form. With proper planning and the right guidance, 
          this adventure will become one of your most cherished travel memories.
        </p>
      </div>
    `,
    author: 'Emmanuel Niyonsenga',
    authorImage: '/images/team/emmanuel.jpg',
    publishDate: '2024-12-15',
    readTime: '8 min read',
    category: 'Tours',
    tags: ['Gorilla Trekking', 'Wildlife', 'Volcanoes National Park', 'Adventure'],
    featuredImage: 'volcanoes-national-park-gorilla_AJ723tqm4-Photo-from-Getty-Images.jpg',
    featured: true,
    slug: 'ultimate-guide-gorilla-trekking-rwanda',
    metaTitle: 'Ultimate Guide to Gorilla Trekking in Rwanda - Wildlife Tours | Elegant Rwanda',
    metaDescription: 'Everything you need to know about planning your once-in-a-lifetime gorilla trekking adventure in Rwanda\'s Volcanoes National Park. Expert tips and guidance.'
  },
  {
    id: 'blog-2',
    title: 'Discovering Rwanda\'s Hidden Cultural Gems',
    excerpt: 'Explore the rich cultural heritage of Rwanda beyond the typical tourist destinations, from traditional villages to contemporary art scenes.',
    content: `
      <div>
        <p>
          Rwanda\'s cultural landscape is as diverse and vibrant as its natural beauty. Beyond the well-known attractions, 
          there are countless hidden gems waiting to be discovered by curious travelers.
        </p>

        <h2>Traditional Villages</h2>
        
        <h3>Iby\'Iwacu Cultural Village</h3>
        <p>
          Located near Volcanoes National Park, this cultural village offers authentic insights into traditional Rwandan life. 
          Visitors can participate in traditional dances, learn about local customs, and even try their hand at traditional crafts.
        </p>

        <h3>Nyanza Royal Palace</h3>
        <p>
          The restored royal palace in Nyanza provides a fascinating glimpse into Rwanda\'s pre-colonial history. 
          The traditional architecture and royal artifacts tell the story of a sophisticated kingdom that existed 
          long before European contact.
        </p>

        <h2>Contemporary Culture</h2>
        
        <h3>Kigali\'s Art Scene</h3>
        <p>
          Kigali is home to a burgeoning contemporary art scene. Galleries like <em>Inema Arts Center</em> showcase works 
          by both established and emerging Rwandan artists, offering a modern perspective on the country\'s cultural evolution.
        </p>

        <h3>Music and Dance</h3>
        <p>
          Traditional Rwandan music and dance are experiencing a renaissance, with contemporary artists blending 
          traditional rhythms with modern influences. Don\'t miss performances at cultural centers and festivals throughout the year.
        </p>

        <h2>Cultural Experiences</h2>
        
        <h3>Cooking Classes</h3>
        <p>
          Learn to prepare traditional Rwandan dishes like <strong>ugali</strong>, <strong>isombe</strong>, and <strong>brochettes</strong>. 
          Many local families and cultural centers offer cooking classes that provide both culinary skills and cultural insights.
        </p>

        <h3>Craft Workshops</h3>
        <p>
          Participate in traditional craft workshops, from basket weaving to pottery making. These hands-on experiences 
          connect you directly with Rwanda\'s artisanal traditions.
        </p>

        <h2>Respectful Cultural Tourism</h2>
        <p>When engaging with local cultures, remember to:</p>
        <ul>
          <li>Ask permission before taking photographs</li>
          <li>Dress modestly when visiting traditional sites</li>
          <li>Learn a few basic phrases in Kinyarwanda</li>
          <li>Support local artisans by purchasing authentic crafts</li>
        </ul>

        <h2>Conclusion</h2>
        <p>
          Rwanda\'s cultural heritage is a living, breathing tradition that continues to evolve. By exploring these hidden gems, 
          you\'ll gain a deeper understanding of the country\'s rich history and vibrant present.
        </p>
      </div>
    `,
    author: 'Sarah Uwase',
    authorImage: '/images/team/sarah.jpg',
    publishDate: '2024-12-10',
    readTime: '6 min read',
    category: 'Culture',
    tags: ['Culture', 'Traditional Villages', 'Art', 'Music', 'Crafts'],
    featuredImage: 'Umuganura-Muhondo-Gakenke-Paying-tribute-to-the-king.jpg',
    featured: true,
    slug: 'discovering-rwandas-hidden-cultural-gems',
    metaTitle: 'Discovering Rwanda\'s Hidden Cultural Gems - Cultural Tours | Elegant Rwanda',
    metaDescription: 'Explore the rich cultural heritage of Rwanda beyond the typical tourist destinations, from traditional villages to contemporary art scenes.'
  },
  {
    id: 'blog-3',
    title: 'Luxury Travel in Rwanda: Beyond the Ordinary',
    excerpt: 'Experience Rwanda\'s finest luxury accommodations, exclusive experiences, and personalized services that redefine luxury travel in Africa.',
    content: `
      <div>
        <p>
          Rwanda has emerged as a premier destination for luxury travelers seeking authentic African experiences 
          combined with world-class service and accommodations.
        </p>

        <h2>Luxury Accommodations</h2>
        
        <h3>Bisate Lodge</h3>
        <p>
          Nestled in the foothills of the Virunga volcanoes, <strong>Bisate Lodge</strong> offers unparalleled luxury 
          in a stunning natural setting. Each private villa features panoramic views, private decks, and personalized butler service.
        </p>

        <h3>One&Only Gorilla\'s Nest</h3>
        <p>
          This exclusive resort combines luxury with conservation, offering guests the opportunity to contribute to gorilla protection 
          while enjoying five-star amenities and service.
        </p>

        <h2>Exclusive Experiences</h2>
        
        <h3>Private Gorilla Encounters</h3>
        <p>
          For the ultimate luxury experience, arrange private gorilla trekking sessions with exclusive access to less-visited gorilla families. 
          This includes personalized guides and extended viewing times.
        </p>

        <h3>Helicopter Tours</h3>
        <p>
          See Rwanda from above with private helicopter tours that provide breathtaking aerial views of the country\'s diverse landscapes, 
          from the Virunga volcanoes to the shores of Lake Kivu.
        </p>

        <h2>Personalized Services</h2>
        
        <h3>Custom Itineraries</h3>
        <p>
          Luxury travelers can enjoy completely customized itineraries designed around their specific interests, schedule, and preferences. 
          From private transportation to exclusive access to restricted areas.
        </p>

        <h3>Dedicated Concierge</h3>
        <p>
          Every luxury guest receives a dedicated concierge who ensures every detail of their stay is perfect, 
          from restaurant reservations to arranging unique cultural experiences.
        </p>

        <h2>Sustainable Luxury</h2>
        <p>
          Rwanda\'s luxury tourism sector is committed to sustainability, with many properties implementing eco-friendly practices 
          and supporting local communities.
        </p>

        <h2>Conclusion</h2>
        <p>
          Luxury travel in Rwanda offers a unique combination of natural beauty, cultural richness, and world-class service. 
          It\'s an experience that goes beyond traditional luxury to create meaningful connections with the country and its people.
        </p>
      </div>
    `,
    author: 'Grace Mukamurenzi',
    authorImage: '/images/team/grace.jpg',
    publishDate: '2024-12-05',
    readTime: '7 min read',
    category: 'Luxury',
    tags: ['Luxury', 'Accommodations', 'Exclusive Experiences', 'Personalized Service'],
    featuredImage: '/landscape-on-edge-of-lake-kivu-rwanda-east-africa.jpg',
    featured: false,
    slug: 'luxury-travel-rwanda-beyond-ordinary',
    metaTitle: 'Luxury Travel in Rwanda: Beyond the Ordinary - Premium Tours | Elegant Rwanda',
    metaDescription: 'Experience Rwanda\'s finest luxury accommodations, exclusive experiences, and personalized services that redefine luxury travel in Africa.'
  }
];

export const getFeaturedPosts = () => blogPosts.filter(post => post.featured);
export const getPostBySlug = (slug: string) => blogPosts.find(post => post.slug === slug);
export const getPostsByCategory = (category: BlogPost['category']) => blogPosts.filter(post => post.category === category);
export const getRecentPosts = (limit: number = 3) => blogPosts.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()).slice(0, limit);
export const getAllPosts = () => blogPosts;
export const getRelatedPosts = (currentSlug: string, category: BlogPost['category']) => 
  blogPosts.filter(post => post.slug !== currentSlug && post.category === category).slice(0, 3);

// Add more blog posts to showcase HTML formatting
export const blogPostsExtended: BlogPost[] = [
  ...blogPosts,
  {
    id: 'blog-4',
    title: 'Rwanda Wildlife Photography: Tips & Best Locations',
    excerpt: 'Master the art of wildlife photography in Rwanda with expert tips, best locations, and techniques for capturing stunning images.',
    content: `
      <div>
        <p>
          Rwanda offers some of the most incredible wildlife photography opportunities in Africa. 
          From mountain gorillas to colorful birds, learn how to capture these magnificent creatures in their natural habitat.
        </p>

        <h2>Essential Photography Equipment</h2>
        
        <div>
          <div>DSLR or Mirrorless Camera with good low-light performance</div>
          <div>Telephoto lens (300mm+ for wildlife)</div>
          <div>Wide-angle lens for landscapes</div>
          <div>Sturdy tripod or monopod</div>
          <div>Extra batteries and memory cards</div>
          <div>Rain protection for your gear</div>
        </div>

        <h2>Best Wildlife Locations</h2>
        
        <h3>Volcanoes National Park</h3>
        <p>
          Home to the endangered mountain gorillas, this park offers intimate encounters with these gentle giants. 
          <strong>Best time:</strong> June-September (dry season)
        </p>

        <div>
          <h4>Pro Tip:</h4>
          <p>Book your gorilla trekking permit at least 6 months in advance, especially during peak season.</p>
        </div>

        <h3>Akagera National Park</h3>
        <p>
          Rwanda's only savannah park features the Big Five and offers excellent game drive photography opportunities.
        </p>

        <h2>Photography Techniques</h2>
        
        <h3>Composition Rules</h3>
        <ol>
          <li><strong>Rule of Thirds:</strong> Position your subject off-center for more dynamic compositions</li>
          <li><strong>Leading Lines:</strong> Use natural elements to guide the viewer's eye</li>
          <li><strong>Framing:</strong> Use branches or other elements to frame your subject</li>
          <li><strong>Depth of Field:</strong> Use shallow depth of field to isolate subjects</li>
        </ol>

        <h3>Lighting Considerations</h3>
        <p>
          <strong>Golden Hour:</strong> Shoot during early morning or late afternoon for warm, soft light.<br>
          <strong>Overcast Days:</strong> Perfect for even lighting and reduced shadows.<br>
          <strong>Backlighting:</strong> Create dramatic silhouettes and rim lighting effects.
        </p>

        <h2>Camera Settings Guide</h2>
        
        <table>
          <thead>
            <tr>
              <th>Scenario</th>
              <th>Aperture</th>
              <th>Shutter Speed</th>
              <th>ISO</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Gorilla Portraits</td>
              <td>f/2.8 - f/4</td>
              <td>1/250s+</td>
              <td>400-800</td>
            </tr>
            <tr>
              <td>Action Shots</td>
              <td>f/4 - f/5.6</td>
              <td>1/500s+</td>
              <td>800-1600</td>
            </tr>
            <tr>
              <td>Landscapes</td>
              <td>f/8 - f/11</td>
              <td>1/60s+</td>
              <td>100-200</td>
            </tr>
          </tbody>
        </table>

        <h2>Ethical Photography</h2>
        
        <div>
          <h4>Important Guidelines:</h4>
          <ul>
            <li>Maintain safe distances from wildlife</li>
            <li>Never feed or bait animals</li>
            <li>Respect breeding and nesting areas</li>
            <li>Follow park rules and guide instructions</li>
          </ul>
        </div>

        <h2>Post-Processing Tips</h2>
        
        <p>
          <strong>Basic Adjustments:</strong> Start with exposure, contrast, and white balance<br>
          <strong>Sharpening:</strong> Apply selective sharpening to your subject's eyes<br>
          <strong>Noise Reduction:</strong> Use sparingly to maintain detail<br>
          <strong>Color Enhancement:</strong> Boost saturation slightly for vibrant wildlife shots
        </p>

        <h2>Conclusion</h2>
        <p>
          Wildlife photography in Rwanda is a rewarding experience that combines adventure with artistic expression. 
          With proper preparation, respect for nature, and these techniques, you'll capture memories that last a lifetime.
        </p>
      </div>
    `,
    author: 'David Kimenyi',
    authorImage: '/images/team/david.jpg',
    publishDate: '2024-12-01',
    readTime: '10 min read',
    category: 'Wildlife',
    tags: ['Photography', 'Wildlife', 'Gorillas', 'Techniques', 'Equipment'],
    featuredImage: 'gorilla-trekking-rwanda.jpg',
    featured: false,
    slug: 'rwanda-wildlife-photography-tips-locations',
    metaTitle: 'Rwanda Wildlife Photography: Tips & Best Locations | Elegant Rwanda',
    metaDescription: 'Master the art of wildlife photography in Rwanda with expert tips, best locations, and techniques for capturing stunning images.'
  },
  {
    id: 'blog-5',
    title: 'Sustainable Tourism in Rwanda: A Complete Guide',
    excerpt: 'Discover how Rwanda leads the way in sustainable tourism practices and how you can travel responsibly while supporting local communities.',
    content: `
      <div>
        <p>
          Rwanda has become a global leader in sustainable tourism, implementing innovative practices that protect the environment, 
          support local communities, and create meaningful experiences for travelers.
        </p>

        <h2>Rwanda's Environmental Initiatives</h2>
        
        <div>
          <div>
            <div>2008</div>
            <div>Plastic Bag Ban</div>
            <div>Rwanda became the first country to ban plastic bags, setting a global example for environmental protection.</div>
          </div>
          <div>
            <div>2011</div>
            <div>Umuganda Program</div>
            <div>Monthly community clean-up days involving all citizens in environmental maintenance.</div>
          </div>
          <div>
            <div>2019</div>
            <div>Green City Kigali</div>
            <div>Ambitious project to transform Kigali into Africa's greenest city by 2050.</div>
          </div>
        </div>

        <h2>Conservation Success Stories</h2>
        
        <h3>Mountain Gorilla Recovery</h3>
        <p>
          Through dedicated conservation efforts, Rwanda's mountain gorilla population has increased from just 250 individuals 
          in the 1980s to over 1,000 today. This success story demonstrates the power of sustainable tourism in wildlife conservation.
        </p>

        <div>
          <h4>Conservation Impact:</h4>
          <p>Tourism revenue directly funds anti-poaching efforts, habitat restoration, and community development programs.</p>
        </div>

        <h3>Akagera National Park Restoration</h3>
        <p>
          Once decimated by human activity, Akagera has been successfully restored and now hosts thriving populations of lions, 
          elephants, and other wildlife species.
        </p>

        <h2>Community-Based Tourism</h2>
        
        <h3>Iby'Iwacu Cultural Village</h3>
        <p>
          This innovative project transformed former poachers into conservation advocates and tourism guides, 
          providing sustainable livelihoods while protecting wildlife.
        </p>

        <h3>Local Artisan Cooperatives</h3>
        <p>
          Support local communities by purchasing authentic crafts from cooperatives that reinvest profits into 
          education, healthcare, and infrastructure projects.
        </p>

        <h2>How to Travel Sustainably</h2>
        
        <div>
          <h4>Before You Go:</h4>
          <ul>
            <li>Choose eco-certified accommodations</li>
            <li>Pack reusable water bottles and bags</li>
            <li>Research local customs and traditions</li>
            <li>Book with responsible tour operators</li>
          </ul>
        </div>

        <h3>During Your Stay</h3>
        <ul>
          <li><strong>Reduce Waste:</strong> Minimize single-use plastics and recycle when possible</li>
          <li><strong>Conserve Resources:</strong> Turn off lights and air conditioning when not in use</li>
          <li><strong>Support Local:</strong> Eat at local restaurants and buy from local markets</li>
          <li><strong>Respect Wildlife:</strong> Maintain safe distances and follow guide instructions</li>
        </ul>

        <h2>Sustainable Accommodation Options</h2>
        
        <h3>Eco-Lodges</h3>
        <p>
          <strong>Bisate Lodge:</strong> Solar-powered, locally sourced materials, community employment<br>
          <strong>One&Only Gorilla's Nest:</strong> Carbon-neutral operations, organic gardens<br>
          <strong>Rwanda Eco-Tours:</strong> Community-owned lodges with minimal environmental impact
        </p>

        <h2>Measuring Your Impact</h2>
        
        <p>
          Calculate your carbon footprint and offset it through verified programs that support 
          reforestation and renewable energy projects in Rwanda and beyond.
        </p>

        <div>
          Average carbon offset cost: $15-25 per person
        </div>

        <h2>Future of Sustainable Tourism</h2>
        
        <p>
          Rwanda's commitment to sustainable tourism continues to grow, with plans for:
        </p>
        <ul>
          <li>100% renewable energy by 2030</li>
          <li>Zero-waste tourism by 2035</li>
          <li>Carbon-neutral tourism sector by 2040</li>
          <li>Enhanced community benefit programs</li>
        </ul>

        <h2>Conclusion</h2>
        <p>
          Sustainable tourism in Rwanda isn't just a concept—it's a reality that benefits everyone involved. 
          By choosing to travel responsibly, you become part of a positive change that preserves Rwanda's 
          natural beauty for future generations.
        </p>
      </div>
    `,
    author: 'Marie Uwimana',
    authorImage: '/images/team/marie.jpg',
    publishDate: '2024-11-25',
    readTime: '12 min read',
    category: 'Tips',
    tags: ['Sustainability', 'Conservation', 'Community', 'Eco-Tourism', 'Environment'],
    featuredImage: 'rwanda-green-city.jpg',
    featured: true,
    slug: 'sustainable-tourism-rwanda-complete-guide',
    metaTitle: 'Sustainable Tourism in Rwanda: A Complete Guide | Elegant Rwanda',
    metaDescription: 'Discover how Rwanda leads the way in sustainable tourism practices and how you can travel responsibly while supporting local communities.'
  }
];
