import { PageHero } from "@/components/layout/PageChrome";
import { ProjectGallery } from "@/components/ProjectGallery";
import { CtaBanner } from "@/components/home/Spotlight";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Projects — Solar, Maintenance, Safety Audits & Engineering",
  description:
    "Browse the electrical and renewable energy work AVIGENT Technologies delivers — solar EPC, electrical maintenance, safety audits and engineering services across Kerala.",
  path: "/projects",
  image: "/images/commercial-rooftop-solar.jpg",
});

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Projects"
        title={
          <>
            Work that keeps facilities <span className="text-gradient">powered and safe.</span>
          </>
        }
        description="Filter by discipline to explore the kinds of projects our engineering team delivers."
        crumbs={[{ label: "Projects", href: "/projects" }]}
        image="/images/commercial-rooftop-solar.jpg"
      />
      <section aria-label="Project gallery" className="bg-navy-950 py-20 md:py-28">
        <div className="container-x">
          <ProjectGallery idPrefix="projects" />
          <p className="mt-8 max-w-2xl text-sm text-steel-500">
            Representative imagery shown. Ask us about work relevant to your facility and sector.
          </p>
        </div>
      </section>
      <CtaBanner title="Have a project in mind?" text="From a single panel room to a complete solar installation — let's talk about what you need." />
    </>
  );
}
