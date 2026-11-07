import { Link } from "react-router";
import { site } from "../content";
import { Logo } from "./Logo";
import { WavePoint } from "./WavePoint";

/** `onHome={false}` on other pages: the logo links home and there is no flower to go back to. */
export function Contact({ onHome = true }: { onHome?: boolean }) {
  // const year = new Date().getFullYear(); // re-enable with the © line below

  return (
    <section id="contact" className="relative scroll-mt-6 pt-20 md:pt-28">
      <div className="shell relative z-10">
        <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <h2 className="font-display text-[clamp(3.6rem,11.5vw,11rem)] font-extrabold leading-[0.84] tracking-[-0.05em]">
            let’s work
            <br />
            together.
          </h2>

          <div className="flex flex-col items-start gap-7 md:items-end md:pb-4">
            <a
              href={`mailto:${site.email}`}
              className="squiggle-link text-lg font-medium"
            >
              {site.email}
            </a>
            <ul className="flex gap-7 text-lg font-medium">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="squiggle-link"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <footer className="mt-24 flex flex-col gap-3 border-t border-text/25 py-8 text-sm text-text/80 sm:flex-row sm:justify-between md:mt-32">
          {/* <p>
            © {year} {site.name}
          </p> */}
          {onHome ? (
            <a
              href="#top"
              aria-label={`${site.name} — home`}
              className="text-text"
            >
              <Logo className="h-8 w-auto transition-transform duration-500 ease-spring md:h-10" />
            </a>
          ) : (
            <Link to="/" aria-label={`${site.name} — home`} className="text-text">
              <Logo className="h-8 w-auto transition-transform duration-500 ease-spring md:h-10" />
            </Link>
          )}
          <a
            href="#top"
            className={`squiggle-link self-start ${onHome ? "lg:hidden" : ""}`}
          >
            back to top ↑
          </a>
          {onHome && (
            <a href="#top" className="hidden lg:block squiggle-link self-start">
              back to the spinning flower ↑
            </a>
          )}
        </footer>
      </div>

      <WavePoint
        order={9}
        className="absolute left-[106%] top-[18%] md:left-[80%] md:top-[18%]"
      />
      <WavePoint order={10} className="absolute   left-[10%] top-[48%]" />
      <WavePoint order={11} className="absolute  left-[55%] top-[101%]" />
    </section>
  );
}
