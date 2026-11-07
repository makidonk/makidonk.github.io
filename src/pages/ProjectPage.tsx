import { Link, useParams } from "react-router";
import { ArrowIcon } from "../components/ArrowIcon";
import { ImageFrame } from "../components/ImageFrame";
import { ProjectGallery } from "../components/ProjectGallery";
import { COLOR_CLASS } from "../components/ProjectCard";
import { SiteLayout } from "../components/SiteLayout";
import { useDocumentTitle } from "../components/useDocumentTitle";
import {
  getNextProject,
  getProjectBySlug,
  projectPath,
  projects,
  type Project,
} from "../content";
import { NotFoundPage } from "./NotFoundPage";

/** Case-study template, filled from the project matching the URL's slug. */
export function ProjectPage() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);
  useDocumentTitle(project?.title);

  if (!project) {
    return (
      <NotFoundPage message="There’s no project at this address — it may have moved or been renamed." />
    );
  }

  const number = String(projects.indexOf(project) + 1).padStart(2, "0");
  const next = getNextProject(project);

  return (
    <SiteLayout>
      <article>
        {/* ---- Title ---- */}
        <header className="shell pt-12 md:pt-16">
          <Link to="/projects" className="squiggle-link text-lg font-medium">
            ← all projects
          </Link>

          <p className="mt-14 flex gap-4 text-lg font-medium md:mt-20 md:text-xl">
            <span className="font-display font-bold">({number})</span>
            <span>{project.category}</span>
          </p>
          <h1 className="mt-3 font-display text-[clamp(3.6rem,13vw,13rem)] font-extrabold uppercase leading-[0.82] tracking-[-0.05em] break-words hyphens-auto">
            {project.title}
          </h1>
          {project.intro && (
            <p className="mt-8 max-w-[32ch] text-xl leading-snug md:mt-12 md:ml-[33%] md:text-3xl">
              {project.intro}
            </p>
          )}
        </header>

        {/* ---- Cover ---- */}
        <ImageFrame
          image={{
            src: project.coverImage,
            alt: project.coverImage
              ? (project.coverAlt ?? "")
              : "Placeholder cover image",
          }}
          color={project.color}
          priority
          className="shell mt-12 md:mt-20"
          frameClassName="aspect-[4/3] md:aspect-[16/9]"
        />

        <ProjectInfo project={project} />

        {project.galleryImages && (
          <div className="mt-20 md:mt-32">
            <ProjectGallery
              images={project.galleryImages}
              color={project.color}
            />
          </div>
        )}

        {/* ---- Next ---- */}
        <nav aria-label="More projects" className="shell mt-24 md:mt-40">
          {next && next !== project && <NextProject project={next} />}
          <Link
            to="/projects"
            className="squiggle-link mt-12 inline-block text-xl font-medium"
          >
            back to all projects
          </Link>
        </nav>
      </article>
    </SiteLayout>
  );
}

/** Only fields that exist in the data are shown. */
function ProjectInfo({ project }: { project: Project }) {
  const facts = [
    { label: "type", value: project.category },
    { label: "role", value: project.role },
    { label: "tools", value: project.technologies?.join(", ") },
    { label: "year", value: project.year },
  ].filter((f): f is { label: string; value: string } => Boolean(f.value));

  const links = [
    { label: "visit the live site", href: project.liveUrl },
    { label: "view on GitHub", href: project.githubUrl },
  ].filter((l): l is { label: string; href: string } => Boolean(l.href));

  return (
    <section
      aria-label="Project info"
      className="shell mt-16 grid gap-12 md:mt-24 md:grid-cols-12 md:gap-x-2"
    >
      <dl className="md:col-span-5 lg:col-span-4">
        {facts.map((f) => (
          <div
            key={f.label}
            className="grid grid-cols-[6rem_1fr] gap-4 border-t border-text/25 py-4 last:border-b"
          >
            <dt className="text-text/80">{f.label}</dt>
            <dd className="font-medium">{f.value}</dd>
          </div>
        ))}
      </dl>

      {(project.description || links.length > 0) && (
        <div className="md:col-span-6 md:col-start-7">
          {project.description && (
            <p className="text-xl leading-snug md:text-2xl">
              {project.description}
            </p>
          )}
          {links.length > 0 && (
            <ul className="mt-8 flex flex-wrap gap-x-10 gap-y-4 text-lg font-medium">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="squiggle-link inline-flex items-center gap-2"
                  >
                    {l.label}
                    <ArrowIcon />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
}

/** Big "next project" link with the same lift/tilt as the project cards. */
function NextProject({ project }: { project: Project }) {
  return (
    <Link
      to={projectPath(project)}
      className="group grid items-end gap-6 md:grid-cols-12 md:gap-x-2"
    >
      <div className="md:col-span-8">
        <p className="text-lg font-medium md:text-xl">next project</p>
        <p className="mt-3 flex items-start gap-[0.15em] font-display text-[clamp(3rem,10vw,10rem)] font-extrabold uppercase leading-[0.84] tracking-[-0.05em] break-words">
          {project.title}
          <ArrowIcon className="mt-[0.12em] size-[0.5em] shrink-0 transition-transform duration-500 ease-spring group-hover:rotate-45" />
        </p>
        <p className="mt-3 text-base text-text/80">{project.category}</p>
      </div>
      <div
        className={`aspect-[4/5] w-2/3 overflow-hidden transition-transform md:w-auto duration-700 ease-out-soft group-hover:-translate-y-2 group-hover:rotate-[0.8deg] md:col-span-4 md:col-start-9 ${COLOR_CLASS[project.color]}`}
        data-placeholder={project.coverImage ? undefined : true}
      >
        {project.coverImage && (
          <img
            src={project.coverImage}
            alt=""
            loading="lazy"
            className="size-full object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.04]"
          />
        )}
      </div>
    </Link>
  );
}
