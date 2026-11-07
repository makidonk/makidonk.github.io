import { Link } from "react-router";
import { SiteLayout } from "../components/SiteLayout";
import { useDocumentTitle } from "../components/useDocumentTitle";

type Props = { message?: string };

export function NotFoundPage({
  message = "This page doesn’t exist.",
}: Props) {
  useDocumentTitle("Not found");

  return (
    <SiteLayout>
      <section className="shell pt-20 md:pt-28">
        <h1 className="font-display text-[clamp(3.6rem,11.5vw,11rem)] font-extrabold leading-[0.84] tracking-[-0.05em]">
          oops,
          <br />
          not found.
        </h1>
        <p className="mt-8 max-w-[30ch] text-xl leading-snug md:text-2xl">
          {message}
        </p>
        <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4 text-xl font-medium">
          <Link to="/projects" className="squiggle-link">
            see all projects
          </Link>
          <Link to="/" className="squiggle-link">
            back home
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
