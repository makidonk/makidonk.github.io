import { Link } from "react-router";
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

      <div className="shell relative z-10 grid items-center gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-5 ">
        <div
          className="group aspect-[10/11] w-full max-w-[500px] overflow-hidden "
          // style={{ clipPath: "url(#about-blob)" }}
        >
          <div className="size-full transition-transform duration-[900ms] ease-out-soft group-hover:scale-[1.04]">
            {about.photo ? (
              <img
                src={about.photo}
                alt={about.photoAlt}
                className="size-full object-contain object-bottom p-4"
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
          <p className="mt-6 max-w-[700px] text-xl leading-snug md:mt-8 md:text-2xl">
            When I'm not busy standing on giant vegetables, you'll probably find
            me climbing or hiking somewhere.
            <br></br>
            <br></br>
            When I'm at my computer, I'm usually gaming, writing code, or
            spending way too long making something look just right. I'm a
            developer first, but my background in design definitely comes in
            handy.
          </p>

          <div className="mt-10">
            <Link
              to={about.moreHref}
              className="squiggle-link text-xl font-medium"
            >
              let me talk even more about myself
            </Link>
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
      ></svg>
    </div>
  );
}
