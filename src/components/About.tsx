import { about } from "../content";
import { WavePoint } from "./WavePoint";

export function About() {
  return (
    <section id="about" className="relative scroll-mt-6 py-16 md:py-28">
      {/* Organic frame for the portrait, in 0–1 bounding-box units */}
      <svg width="0" height="0" aria-hidden="true" className="absolute">
        <clipPath id="about-blob" clipPathUnits="objectBoundingBox">
          <path d="M0.09,0.08 C0.25,0.01 0.42,0.06 0.6,0.04 C0.8,0.02 0.97,0.04 0.98,0.24 C0.99,0.42 0.93,0.56 0.97,0.73 C1,0.92 0.89,0.99 0.71,0.97 C0.54,0.95 0.4,1 0.22,0.98 C0.04,0.96 0,0.85 0.02,0.66 C0.04,0.48 -0.01,0.3 0.02,0.18 C0.03,0.13 0.05,0.1 0.09,0.08 Z" />
        </clipPath>
      </svg>

      <div className="shell relative z-10 grid items-center gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-16 lg:gap-24">
        <div
          className="group aspect-[10/11] w-full max-w-[520px] overflow-hidden bg-sky"
          style={{ clipPath: "url(#about-blob)" }}
        >
          <div className="size-full transition-transform duration-[900ms] ease-out-soft group-hover:scale-[1.04]">
            {about.photo ? (
              <img
                src={about.photo}
                alt={about.photoAlt}
                className="size-full object-cover"
              />
            ) : (
              <PhotoPlaceholder />
            )}
          </div>
        </div>

        <div>
          <h2 className="font-display text-[clamp(3rem,8vw,7.5rem)] font-extrabold leading-[0.9] tracking-[-0.04em]">
            about me
          </h2>
          <p className="mt-6 max-w-[28ch] text-xl leading-snug md:mt-8 md:text-2xl">
            {about.intro}
          </p>

          <div className="mt-10">
            <a
              href={about.moreHref}
              className="squiggle-link text-xl font-medium"
            >
              let me talk even more about myself
            </a>
          </div>
        </div>
      </div>

      <WavePoint
        order={7}
        className="absolute left-[2%] top-[16%] md:top-[6%]"
      />
      <WavePoint
        order={8}
        className="absolute top-[calc(100%-1rem)] left-[36%] md:top-[90%]"
      />
    </section>
  );
}

/** PLACEHOLDER portrait — replace by setting `about.photo` in content.ts. */
function PhotoPlaceholder() {
  return (
    <div className="relative size-full" data-placeholder>
      <svg
        viewBox="0 0 100 110"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        className="size-full"
      >
        <rect width="100" height="110" className="fill-sky" />
        <circle cx="50" cy="44" r="17" className="fill-text/90" />
        <path
          d="M14 110c2-24 17-36 36-36s34 12 36 36Z"
          className="fill-text/90"
        />
      </svg>
      <span className="absolute bottom-[12%] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-ink/75 px-3 py-1 text-xs font-medium tracking-wide text-text">
        Placeholder — your photo
      </span>
    </div>
  );
}
