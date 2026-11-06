/**
 * All editable site content lives here.
 *
 */

export const site = {
  name: "Mathilda",
  role: "Designer & Web Developer",

  email: "mathilda.magnusson@gmail.com",

  socials: [
    { label: "GitHub", href: "https://github.com/makidonk" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/mathilda-magnusson-79b34b298",
    },
  ],
};

export const about = {
  intro:
    "I’m a multidisciplinary designer and developer who loves to bring ideas to life on the web.",
  //  link to a longer about page, CV or similar
  moreHref: "#",
  // set to an image path (e.g. '/images/me.jpg' in /public) to replace the placeholder
  photo: null as string | null,
  photoAlt: "no photo",
};

/** Solid card colour, shown until a real image is set. Uses the site palette. */
export type CardColor = "blush" | "sky";

export type Project = {
  title: string;
  category: string;
  href: string;
  /** Path to a real image (put files in /public). Leave null to show the solid colour. */
  image: string | null;
  color: CardColor;
};

// PLACEHOLDER: replace these entries with your real projects
export const projects: Project[] = [
  {
    title: "Project 1",
    category: " visual identity",
    href: "#",
    image: null,
    color: "blush",
  },
  {
    title: "Project 2",
    category: " web design & development",
    href: "#",
    image: null,
    color: "sky",
  },
  {
    title: "Project 3",
    category: "branding",
    href: "#",
    image: null,
    color: "sky",
  },
  {
    title: "Project 4",
    category: "front-end development",
    href: "#",
    image: null,
    color: "blush",
  },
];
