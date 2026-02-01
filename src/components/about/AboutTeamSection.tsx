import Image from "next/image";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string | null;
}

interface AboutTeamSectionProps {
  team: TeamMember[];
}

export function AboutTeamSection({ team }: AboutTeamSectionProps) {
  return (
    <section className="text-center">
      <h2 className="text-3xl font-display font-semibold mb-6">Our Team</h2>
      <p className="text-muted-foreground mb-10 max-w-2xl mx-auto">
        Meet the passionate professionals who make every journey extraordinary. Our
        team combines local expertise with international standards to deliver
        exceptional travel experiences.
      </p>
      {team.length === 0 ? (
        <div className="text-center py-12 rounded-2xl border border-dashed border-border bg-muted/20">
          <p className="text-muted-foreground">
            Our team members will be displayed here soon.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member) => (
            <article
              key={member.id}
              className="group bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Photo: larger, aspect ratio, gradient overlay on hover */}
              <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-primary/20 to-accent/20">
                    <span className="text-5xl font-display font-bold text-primary/60">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Role badge on image */}
                <div className="absolute bottom-4 left-4 right-4 text-left">
                  <span className="inline-block px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                    {member.role}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 text-left">
                <h3 className="text-xl font-display font-semibold text-foreground mb-1">
                  {member.name}
                </h3>
                <p className="text-primary font-medium text-sm mb-3">{member.role}</p>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-4">
                  {member.bio}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
