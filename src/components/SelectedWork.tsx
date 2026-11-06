import { projects } from "../content";
import { ProjectCard } from "./ProjectCard";
import { WavePoint } from "./WavePoint";

export function SelectedWork() {
  return (
    <section id="work" className="relative scroll-mt-6 py-16 md:py-24">
      <div className="shell relative z-10">
        <h2 className="font-display text-[clamp(3rem,8vw,7.5rem)] font-extrabold leading-[0.9] tracking-[-0.04em]">
          some of my work
        </h2>

        <div className="mt-10 grid gap-x-8 gap-y-14 md:mt-14 md:grid-cols-2 lg:gap-x-10 lg:gap-y-20">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}
        </div>
      </div>

      <WavePoint
        order={5}
        className="absolute left-[104%] top-[22%] md:left-[103%] md:top-[66%]"
      />
      <WavePoint
        order={6}
        className="absolute left-[80%] top-[calc(100%+0.5rem)] md:left-[62%] md:top-[calc(100%+1.5rem)]"
      />
    </section>
  );
}
