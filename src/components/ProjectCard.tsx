import type { CardColor, Project } from "../content";
import { ArrowIcon } from "./ArrowIcon";

type Props = { project: Project; index: number };

const COLOR_CLASS: Record<CardColor, string> = {
  accent: "bg-accent",
  sky: "bg-sky",
};

/**
 * Lifts and tilts very slightly on hover. The arrow is hidden at rest and
 * slides in pointing right on hover/focus (always shown on touch screens).
 */
export function ProjectCard({ project, index }: Props) {
  const tilt =
    index % 2 === 0
      ? "group-hover:-rotate-[0.8deg]"
      : "group-hover:rotate-[0.8deg]";

  return (
    <a href={project.href} className="group block">
      <div
        className={`aspect-[16/10] overflow-hidden rounded-[5px] transition-transform duration-700 ease-out-soft group-hover:-translate-y-2 ${tilt} ${COLOR_CLASS[project.color]}`}
        // PLACEHOLDER: solid colour until `image` is set in content.ts
        data-placeholder={project.image ? undefined : true}
      >
        {project.image && (
          <img
            src={project.image}
            alt=""
            loading="lazy"
            className="size-full object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.04]"
          />
        )}
      </div>

      <div className="mt-5 flex items-start justify-between gap-6">
        <div>
          <h3 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
            {project.title}
          </h3>
          <p className="mt-1 text-base text-text/80">{project.category}</p>
        </div>
        {/* <ArrowIcon className="mt-1 shrink-0 rotate-45 text-2xl opacity-0 -translate-x-3 transition duration-500 ease-out-soft group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 md:text-3xl [@media(hover:none)]:translate-x-0 [@media(hover:none)]:opacity-100" /> */}
      </div>
    </a>
  );
}
