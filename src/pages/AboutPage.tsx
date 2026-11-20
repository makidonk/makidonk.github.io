import type { TransitionEvent } from "react";
import { SiteLayout } from "../components/SiteLayout";
import { useDocumentTitle } from "../components/useDocumentTitle";
import {
  aboutPage,
  type CvEntry,
  type ProjectImage,
  type Skill,
} from "../content";

/** Shared heading style for the sections below the hero (same as the homepage "about me"). */
const H2 =
  "font-display text-[clamp(1.5rem,4vw,4rem)] font-extrabold leading-[0.9] tracking-[-0.04em]";

const BODY = "text-xl leading-snug md:text-2xl";

const SKILLS_WAVE_MODE: { trigger: "hover" | "always" } = { trigger: "always" };
function updateSkillsWave(event: TransitionEvent<HTMLDivElement>) {
  if (event.propertyName === "--skills-wave-depth") {
    event.currentTarget.toggleAttribute(
      "data-wave-formed",
      event.type === "transitionend",
    );
  }
}

export function AboutPage() {
  useDocumentTitle("About");
  const { intro, story, skills, cv, hobbies } = aboutPage;

  return (
    <SiteLayout>
      <section className="shell pb-16 pt-20 md:pb-24 md:pt-24">
        <div className="@container flex items-center gap-x-10 gap-y-0 flex-wrap">
          <h1 className="font-display text-[17cqi] font-extrabold  leading-[0.82] tracking-tighter whitespace-nowrap">
            {aboutPage.heading}
          </h1>
          <p className="mt-4 font-display text-xl font-bold tracking-tight md:mt-6 md:text-2xl">
            {aboutPage.subheading}
          </p>
        </div>
      </section>
      {/* ---- Portrait + intro ---- */}
      <section
        aria-label="Introduction"
        className="shell grid items-center gap-10 md:grid-cols-12 md:gap-x-2"
      >
        <div className="relative aspect-4/4 w-full overflow-hidden bg-accent md:col-span-5 order-2">
          {aboutPage.photo ? (
            <img
              src={aboutPage.photo}
              alt={aboutPage.photoAlt}
              className="size-full object-cover"
            />
          ) : (
            <PlaceholderLabel text="Portrait placeholder" />
          )}
        </div>
        <div className="space-y-6 md:col-span-7 order-1 ">
          {intro.map((p) => (
            <p key={p} className={`${BODY} max-w-[700px]`}>
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* ---- Skills: mina skills uppraddade på blå bakgrund vågig animerad så som likarna i nav---- */}
      <section
        className="skills-section relative my-15 md:my-25"
        data-wave-mode={SKILLS_WAVE_MODE.trigger}
      >
        <div
          className="skills-wave bg-accent-deep"
          aria-hidden="true"
          onTransitionRun={updateSkillsWave}
          onTransitionEnd={updateSkillsWave}
        />
        <div className="relative shell py-15 flex flex-wrap items-start justify-center gap-3 sm:gap-4 md:gap-1">
          {skills.items.map((skill, i) => (
            <SkillText key={skill.name} skill={skill} index={i} />
          ))}
        </div>
      </section>

      {/* ---- Story: big heading, narrower offset text column ---- */}
      <section className="shell mt-20 grid gap-10 md:mt-32 md:grid-cols-12 md:gap-x-2">
        <h2 className={`${H2} md:col-span-7`}>{story.heading}</h2>
        <div className="space-y-6 md:col-span-5 md:col-start-8 ">
          {story.paragraphs.map((p) => (
            <p key={p} className="text-lg leading-relaxed">
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* ---- CV: ---- */}
      <section className="shell mt-20 text-center md:mt-32">
        <h2 className={H2}>the road so far</h2>
        <p className="mt-8 text-lg md:text-md font-medium text-text/60 md:mt-10">
          work experience
        </p>
        <CvList entries={cv.experience} />

        <p className="text-lg md:text-md  font-medium text-text/60">
          education
        </p>
        <CvList entries={cv.education} />
      </section>
      {/* ---- Hobbies + gallery ---- */}
      <section className="shell mt-20 grid gap-10 md:mt-32 md:grid-cols-12 md:gap-x-2">
        <div className="md:col-span-5">
          <h2 className={H2}>{hobbies.heading}</h2>
          <div className="mt-8 space-y-6">
            {hobbies.paragraphs.map((p) => (
              <p key={p} className="max-w-[38ch] text-lg leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </div>
        <Gallery images={hobbies.gallery} />
      </section>
    </SiteLayout>
  );
}

/* ------------------------------------------------------------------
   Skill text
   ------------------------------------------------------------------ */

function SkillText({ skill }: { skill: Skill; index: number }) {
  return (
    <p
      className={`group/skill p-3 text-center leading-tight text-background font-display font-bold tracking-tight mb-0 cursor-default ${
        skill.primary
          ? "text-[clamp(1.375rem,4vw,2.5rem)]"
          : "text-[clamp(1.125rem,3.2vw,2rem)]"
      }`}
    >
      <span className="block motion-safe:transition-transform motion-safe:duration-[540ms] motion-safe:ease-[cubic-bezier(0.25,3.8,0.45,0.8)] motion-safe:group-hover/skill:scale-[0.90] motion-safe:group-hover/skill:duration-300 motion-safe:group-hover/skill:ease-out">
        {skill.name}
      </span>
    </p>
  );
}

/* ------------------------------------------------------------------
   CV + gallery
   ------------------------------------------------------------------ */

function CvList({ entries }: { entries: CvEntry[] }) {
  return (
    <ul className="mt-3 mb-6 space-y-4 md:space-y-5">
      {entries.map((e) => (
        <li key={e.title + e.place} className="">
          <div className="flex md:flex-row flex-col justify-center md:gap-2 mt-3 items-center">
            <h3 className="font-display text-lg font-bold tracking-tight md:text-2xl leading-tight">
              {e.title}
            </h3>
            <p className=" text-base text-text/80">{e.place}</p>
          </div>
          {e.subtitle && <p className=" text-md">{e.subtitle}</p>}
          {e.link && e.linktext && (
            <a
              href={e.link}
              className="hover:text-text text-text/60 transition-colors"
            >
              {e.linktext}
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}

/** One large image + two smaller ones. Placeholder blocks while `src` is null. */
function Gallery({ images }: { images: ProjectImage[] }) {
  const [large, ...small] = images;
  return (
    <div className="grid grid-cols-2 gap-2 md:col-span-7 md:col-start-6 md:grid-cols-5 md:grid-rows-2">
      {large && (
        <GalleryImage
          image={large}
          className="col-span-2 aspect-[4/3] bg-accent md:col-span-3 md:row-span-2 md:aspect-auto md:min-h-[32rem]"
        />
      )}
      {small.slice(0, 2).map((img, i) => (
        <GalleryImage
          key={img.alt}
          image={img}
          className={`aspect-square md:col-span-2 md:aspect-auto ${i % 2 ? "bg-accent" : "bg-pink"}`}
        />
      ))}
    </div>
  );
}

function GalleryImage({
  image,
  className,
}: {
  image: ProjectImage;
  className: string;
}) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      data-placeholder={image.src ? undefined : true}
    >
      {image.src ? (
        <img
          src={image.src}
          alt={image.alt}
          loading="lazy"
          className="absolute inset-0 size-full object-cover"
        />
      ) : (
        <PlaceholderLabel text={image.alt} />
      )}
    </div>
  );
}

function PlaceholderLabel({ text }: { text: string }) {
  return (
    <span className="absolute bottom-3 left-3 rounded-full bg-background px-3 py-1 text-xs font-medium tracking-wide text-text">
      {text}
    </span>
  );
}
