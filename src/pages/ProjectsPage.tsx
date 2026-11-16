import { ProjectsGrid } from "../components/ProjectsGrid";
import { SiteLayout } from "../components/SiteLayout";
import { useDocumentTitle } from "../components/useDocumentTitle";
import { projects, projectsPage } from "../content";

export function ProjectsPage() {
  useDocumentTitle("Projects");

  return (
    <SiteLayout>
      <section className="shell pb-16 pt-20 md:pb-24 md:pt-24">
        {/* Container units: the heading spans the column at every width, like the hero */}
        <div className="@container">
          <h1 className="font-display text-[length:17cqi] font-extrabold  leading-[0.82] tracking-[-0.05em] whitespace-nowrap">
            {projectsPage.heading}
          </h1>
        </div>

        <div className="mt-8 flex flex-col gap-6 md:mt-12 md:flex-row md:items-start md:justify-between">
          {projectsPage.intro && (
            <p className="max-w-[30ch] text-xl leading-snug md:text-2xl">
              {projectsPage.intro}
            </p>
          )}
          <p className="font-display text-xl font-bold tracking-tight md:text-2xl">
            ({String(projects.length).padStart(2, "0")})
          </p>
        </div>
      </section>

      <section aria-label="Projects" className="shell">
        <ProjectsGrid projects={projects} />
      </section>
    </SiteLayout>
  );
}
