import { site } from "../content";
import { Flower } from "./Flower";
import { SiteNav } from "./SiteNav";
import { WavePoint } from "./WavePoint";

export function Hero() {
  return (
    <header id="top" className="relative">
      <SiteNav onHome />

      <div className="shell relative pb-12 pt-20 md:pb-36 md:pt-12">
        <Flower className="absolute -right-[22vw] top-4 z-0 w-[68vw] sm:-right-[12vw] sm:w-[52vw] md:right-[-2vw] md:top-4 md:w-[44vw] md:max-w-[640px]" />

        {/*
          Sizes use container units (cqi) so the composition scales as one
          piece with the content column. "MATHILDA" is ~4.13em wide at this
          tracking, so 23cqi spans ~95% of the column at every breakpoint.
        */}
        <div className="@container pointer-events-none relative z-10">
          <h1 className="font-display">
            <span className="block pl-[5cqi] text-[length:max(2rem,3cqi)] font-bold leading-none tracking-tight max-md:mb-4 max-md:whitespace-nowrap max-md:text-[length:max(2rem,3cqi)]">
              hi, my name is
            </span>
            <span className="block whitespace-nowrap text-[length:23cqi] font-extrabold uppercase leading-[0.8] tracking-[-0.045em]">
              {site.name}
            </span>
            <span className="-mt-[0.8cqi] block pl-[3cqi] font-sans text-[length:max(2rem,3cqi)] font-bold leading-none tracking-tight max-md:mt-4 max-md:whitespace-nowrap max-md:text-[length:max(2rem,3cqi)]">
              and I'm a
            </span>
            <span className="mt-[max(0.2rem,0.6cqi)] max-md:mt-6 block whitespace-nowrap pl-[10cqi] text-[length:10cqi] font-extrabold uppercase leading-[0.85] tracking-[-0.03em] md:text-[length:7.5cqi]">
              <span className="relative inline-block">
                web developer
                {/*
                  The continuous line starts as an underline, drawn right to
                  left and already visible on load, then hooks down.
                */}
                <WavePoint
                  order={0}
                  className="absolute right-0 top-[calc(100%+0.12em)]"
                />
                <WavePoint
                  order={1}
                  drawnOnLoad
                  className="absolute left-0 top-[calc(100%+0.12em)]"
                />
                <WavePoint
                  order={2}
                  className="absolute left-0 top-[calc(100%+2em)]  md:top-[calc(100%+1.2em)]"
                />
              </span>
            </span>
          </h1>
        </div>
      </div>

      <WavePoint order={4} className="absolute left-[92%] top-[97%]" />
      <div className="shell">
        {" "}
        <p className="py-10 text-center font-sans italic text-[1.5rem] leading-none tracking-tight mt-4 ">
          ! This portfolio is a work in progress, just like my journey as a
          developer.
        </p>
      </div>
    </header>
  );
}
