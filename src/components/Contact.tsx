import { site } from "../content";
import { PillButton } from "./PillButton";
import { WavePoint } from "./WavePoint";

export function Contact() {
  const year = new Date().getFullYear();

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
            <PillButton href={`mailto:${site.email}`}>get in touch</PillButton>
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

        <footer className="mt-24 flex flex-col gap-3 border-t border-cream/25 py-8 text-sm text-cream/80 sm:flex-row sm:justify-between md:mt-32">
          <p>
            © {year} {site.name}
          </p>
          <a href="#top" className="squiggle-link self-start">
            back to top ↑
          </a>
        </footer>
      </div>

      <WavePoint
        order={9}
        className="absolute left-[106%] top-[18%] md:left-[80%] md:top-[18%]"
      />
      <WavePoint order={10} className="absolute   left-[10%] top-[48%]" />
      <WavePoint order={11} className="absolute  left-[55%] top-[98%]" />
    </section>
  );
}
