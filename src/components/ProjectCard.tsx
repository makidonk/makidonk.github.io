import { Link } from "react-router";
import { projectPath, type CardColor, type Project } from "../content";

type Props = {
  project: Project;
  index: number;
  /** Aspect-ratio classes for the image. Defaults to the homepage square. */
  imageClassName?: string;
  /** Show the category under the title (used on /projects). */
  showCategory?: boolean;
  className?: string;
};

export const COLOR_CLASS: Record<CardColor, string> = {
  accent: "bg-accent",
  sky: "bg-sky",
};

/**
 * Lifts and tilts very slightly on hover. The arrow is hidden at rest and
 * slides in pointing right on hover/focus (always shown on touch screens).
 */
export function ProjectCard({
  project,
  index,
  imageClassName = "aspect-[1/1]",
  showCategory = false,
  className = "",
}: Props) {
  const tilt =
    index % 2 === 0
      ? "group-hover:-rotate-[0.8deg]"
      : "group-hover:rotate-[0.8deg]";

  return (
    <Link to={projectPath(project)} className={`group block ${className}`}>
      <div
        className={`${imageClassName} overflow-hidden  transition-transform duration-700 ease-out-soft group-hover:-translate-y-2 ${tilt} ${COLOR_CLASS[project.color]}`}
        // PLACEHOLDER: solid colour until `coverImage` is set in content.ts
        data-placeholder={project.coverImage ? undefined : true}
      >
        {project.coverImage && (
          <img
            src={project.coverImage}
            alt={project.coverAlt ?? ""}
            loading="lazy"
            className="size-full object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.04]"
          />
        )}
      </div>

      <div className="mt-1 flex items-start justify-between gap-6">
        <div>
          <h3 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
            {project.title}
          </h3>
          {showCategory && (
            <p className="mt-1 text-base text-text/80">{project.category}</p>
          )}
        </div>
        {/* <ArrowIcon className="mt-1 shrink-0 rotate-45 text-2xl opacity-0 -translate-x-3 transition duration-500 ease-out-soft group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 md:text-3xl [@media(hover:none)]:translate-x-0 [@media(hover:none)]:opacity-100" /> */}
      </div>
    </Link>
  );
}
