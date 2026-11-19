import type { CSSProperties } from "react";
import { ArrowIcon } from "../components/ArrowIcon";
import { SiteLayout } from "../components/SiteLayout";
import { useDocumentTitle } from "../components/useDocumentTitle";
import {
  aboutPage,
  site,
  type CvEntry,
  type ProjectImage,
  type Skill,
} from "../content";

/** Shared heading style for the sections below the hero (same as the homepage "about me"). */
const H2 =
  "font-display text-[clamp(1.5rem,4vw,4rem)] font-extrabold leading-[0.9] tracking-[-0.04em]";

const BODY = "text-xl leading-snug md:text-2xl";

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
        <div className="relative aspect-3/4 w-full max-w-[480px] overflow-hidden bg-accent md:col-span-5 order-2">
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
      <section className="my-2 md:my-25 bg-accent">
        <div className="shell py-10 flex flex-wrap items-start justify-center gap-3 sm:gap-4 md:gap-1">
          {skills.items.map((skill, i) => (
            <SkillText key={skill.name} skill={skill} index={i} />
          ))}
        </div>
      </section>

      {/* ---- Story: big heading, narrower offset text column ---- */}
      <section className="shell mt-28 grid gap-10 md:mt-32 md:grid-cols-12 md:gap-x-2">
        <h2 className={`${H2} md:col-span-7`}>{story.heading}</h2>
        <div className="space-y-6 md:col-span-5 md:col-start-8 ">
          {story.paragraphs.map((p) => (
            <p key={p} className="text-lg leading-relaxed">
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* ---- Skills: wrapping blobs ---- */}
      {/* <section className="shell mt-28 md:mt-44">
        <h2 className={H2}>{skills.heading}</h2>
        <ul className="mx-auto mt-12 flex flex-wrap items-start justify-center gap-3 sm:gap-4 md:mt-16 md:gap-1">
          {skills.items.map((skill, i) => (
            <SkillText key={skill.name} skill={skill} index={i} />
          ))}
        </ul>
      </section> */}
      {/* ---- CV: ---- */}
      <section className="shell mt-28 text-center md:mt-32">
        <h2 className={H2}>the road so far</h2>
        <p className="mt-14 text-base font-medium text-text/70 md:mt-10">
          work experience
        </p>
        <CvList entries={cv.experience} />

        <p className="text-base font-medium text-text/70">education</p>
        <CvList entries={cv.education} />
      </section>
      {/* ---- Hobbies + gallery ---- */}
      <section className="shell mt-28 grid gap-10 md:mt-32 md:grid-cols-12 md:gap-x-2">
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
   Skill blobs
   ------------------------------------------------------------------ */

/** [resting shape, hover shape] — cycled through by index. Tweak to change the wobble. */
const BLOB_SHAPES = [
  ["58% 42% 47% 53% / 52% 46% 54% 48%", "44% 56% 60% 40% / 41% 58% 42% 59%"],
  ["45% 55% 52% 48% / 56% 44% 56% 44%", "60% 40% 38% 62% / 48% 62% 38% 52%"],
  ["52% 48% 41% 59% / 47% 55% 45% 53%", "38% 62% 56% 44% / 60% 40% 60% 40%"],
  ["49% 51% 57% 43% / 43% 49% 51% 57%", "62% 38% 46% 54% / 54% 36% 64% 46%"],
];

/** Small vertical nudges (desktop only) so rows don't line up perfectly. */
// const BLOB_OFFSETS = ["md:mt-0", "md:mt-8", "md:mt-3", "md:mt-12", "md:mt-5"];

// const BLOB_COLOR: Record<Skill["color"], string> = {
//   blue: "bg-accent",
//   pink: "bg-pink",
// };

// const BLOB_SIZE = {
//   primary:
//     "size-32 sm:size-36 md:size-32 font-display text-lg font-extrabold tracking-tight sm:text-xl md:text-2xl",
//   secondary: "size-24 sm:size-16 md:size-20 text-sm font-medium md:text-base",
// };

// const BLOB_SIZE = {
//   primary:
//     "size-32 sm:size-36 md:size-44 font-display text-lg font-extrabold tracking-tight sm:text-xl md:text-2xl",
//   secondary: "size-24 sm:size-28 md:size-32 text-sm font-medium md:text-base",
// };

// function SkillBlob({ skill, index }: { skill: Skill; index: number }) {
//   const [shape, shapeHover] = BLOB_SHAPES[index % BLOB_SHAPES.length];
//   return (
//     <li
//       className={`skill-blob flex shrink-0 items-center justify-center p-3 text-center leading-tight text-text ${
//         BLOB_SIZE[skill.primary ? "primary" : "secondary"]
//       } ${BLOB_COLOR[skill.color]} ${BLOB_OFFSETS[index % BLOB_OFFSETS.length]}`}
//       style={{ "--shape": shape, "--shape-hover": shapeHover } as CSSProperties}
//     >
//       {skill.name}
//     </li>
//   );
// }

function SkillText({ skill }: { skill: Skill; index: number }) {
  return (
    <p
      className={`p-3 text-center leading-tight text-text font-display font-bold tracking-tight ${
        skill.primary ? "text-2xl" : "text-xl"
      }`}
    >
      {skill.name}
    </p>
  );
}

/* ------------------------------------------------------------------
   CV + gallery
   ------------------------------------------------------------------ */

function CvList({ entries }: { entries: CvEntry[] }) {
  return (
    <ul className="mt-3 mb-6 space-y-14 md:space-y-3">
      {entries.map((e) => (
        <li key={e.title + e.place} className="">
          <div className="flex justify-center gap-2 mt-3 items-center">
            <h3 className="font-display text-xl font-bold tracking-tight md:text-2xl">
              {e.title}
            </h3>
            <p className=" text-base text-text/80">{e.place}</p>
          </div>
          {e.subtitle && <p className=" text-lg">{e.subtitle}</p>}
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

// <h3 className="font-display text-xl font-bold tracking-tight md:text-2xl">
//       Bachelor’s Degree in Informatics
//     </h3>
//     <p className=" text-base text-text/80">Jönköping University</p>
//   </div>

//   <p className=" text-lg">Graphic Design and Web Development</p>
//   <a
//     href="https://ju.diva-portal.org/smash/record.jsf?pid=diva2%3A1970352&dswid=9956"
//     className="hover:text-text text-text/60 transition-colors"
//   >
//     link to my thesis
//   </a>

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
