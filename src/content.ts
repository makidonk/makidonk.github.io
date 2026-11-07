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
export type CardColor = "accent" | "sky";

/**
 * How much room a project takes in the /projects grid (desktop, 12 columns).
 *  - small  → 4 columns, portrait
 *  - medium → 5 columns, square
 *  - large  → 7 columns, landscape
 *  - full   → the whole row, wide
 * The grid packs these into rows automatically, so any mix and any number works.
 */
export type GridSize = "small" | "medium" | "large" | "full";

export type ProjectImage = {
  /** Path to an image in /public, e.g. "/images/project-1/01.jpg". null shows a placeholder block. */
  src: string | null;
  alt: string;
  caption?: string;
};

export type Project = {
  /** URL segment: /projects/<slug>. Lowercase, dashes, unique. */
  slug: string;
  title: string;
  category: string;
  /** Short intro shown under the title on the project page. */
  intro?: string;
  /** Longer description shown in the info section. */
  description?: string;
  /** Path to a real image (put files in /public). Leave null to show the solid colour. */
  coverImage: string | null;
  coverAlt?: string;
  /** Images for the case-study gallery, in order. Any number works. */
  galleryImages?: ProjectImage[];
  year?: string;
  role?: string;
  technologies?: string[];
  liveUrl?: string;
  githubUrl?: string;
  /** Featured projects are shown in the homepage "selected work" section. */
  featured: boolean;
  /** Size in the /projects grid. Defaults to "small". */
  gridSize?: GridSize;
  color: CardColor;
};

/** Copy for the /projects overview page. */
export const projectsPage = {
  heading: "all projects",
  intro:
    "A collection of my work across design and development — from visual identities to websites.",
};

/** PLACEHOLDER gallery: solid colour blocks until real images are added. */
const placeholderGallery = (count: number): ProjectImage[] =>
  Array.from({ length: count }, (_, i) => ({
    src: null,
    alt: `Placeholder image ${i + 1}`,
  }));

// PLACEHOLDER: replace these entries with your real projects.
// Every text value below is a stand-in — none of it describes real work.
export const projects: Project[] = [
  {
    slug: "project-1",
    title: "Project 1",
    category: "visual identity",
    intro: "PLACEHOLDER — a one or two sentence introduction to the project.",
    description:
      "PLACEHOLDER — a short description of the brief, the process and the outcome.",
    role: "PLACEHOLDER — your role",
    technologies: ["PLACEHOLDER tool", "PLACEHOLDER tool"],
    coverImage: null,
    galleryImages: placeholderGallery(7),
    featured: true,
    gridSize: "large",
    color: "accent",
  },
  {
    slug: "project-2",
    title: "Project 2",
    category: "web design & development",
    intro: "PLACEHOLDER — a one or two sentence introduction to the project.",
    coverImage: null,
    galleryImages: placeholderGallery(4),
    featured: true,
    gridSize: "small",
    color: "sky",
  },
  {
    slug: "project-3",
    title: "Project 3",
    category: "branding",
    coverImage: null,
    galleryImages: placeholderGallery(2),
    featured: true,
    gridSize: "small",
    color: "sky",
  },
  {
    slug: "project-4",
    title: "Project 4",
    category: "front-end development",
    coverImage: null,
    galleryImages: placeholderGallery(1),
    featured: true,
    gridSize: "large",
    color: "accent",
  },
  // PLACEHOLDER: extra non-featured entries so the /projects grid can be
  // previewed with more items. Delete or replace them.
  {
    slug: "project-5",
    title: "Project 5",
    category: "ui/ux",
    coverImage: null,
    featured: false,
    gridSize: "full",
    color: "sky",
  },
  {
    slug: "project-6",
    title: "Project 6",
    category: "software development",
    coverImage: null,
    featured: false,
    gridSize: "medium",
    color: "accent",
  },
  {
    slug: "project-7",
    title: "Project 7",
    category: "branding",
    coverImage: null,
    featured: false,
    gridSize: "small",
    color: "sky",
  },
];

/* ------------------------------------------------------------------
   Helpers
   ------------------------------------------------------------------ */

export const projectPath = (project: Pick<Project, "slug">) =>
  `/projects/${project.slug}`;

export const featuredProjects = projects.filter((p) => p.featured);

export const getProjectBySlug = (slug: string | undefined) =>
  projects.find((p) => p.slug === slug);

/** The project after this one in the list, wrapping around to the first. */
export const getNextProject = (project: Project) => {
  const i = projects.indexOf(project);
  return projects.length > 1 ? projects[(i + 1) % projects.length] : undefined;
};
