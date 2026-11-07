import { projects } from "../content";
import { PillButton } from "./PillButton";
import { ProjectCard } from "./ProjectCard";
import { WavePoint } from "./WavePoint";

export function SelectedWork() {
  return (
    <section id="work" className="relative scroll-mt-6 py-16 md:py-10">
      <div className="shell relative z-10">
        <h2 className="font-display text-[clamp(1.5rem,4vw,4rem)] font-extrabold leading-[0.9] tracking-[-0.04em]">
          here are my proudest projects :
        </h2>

        <div className="mt-10 grid gap-x-8 gap-y-14 md:mt-14 md:grid-cols-2 lg:grid-cols-4 lg:gap-x-10 lg:gap-y-20">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}
        </div>
        <div className="pt-10">
          <a href="#" className="squiggle-link text-xl font-medium">
            view all my projects
          </a>
        </div>
      </div>

      <WavePoint
        order={5}
        className="absolute left-[104%] top-[22%] md:left-[103%] md:top-[66%]"
      />
      <WavePoint
        order={6}
        className="absolute top-[calc(100%+0.5rem)] left-[62%] md:top-[calc(100%+1.5rem)]"
      />
    </section>
  );
}
