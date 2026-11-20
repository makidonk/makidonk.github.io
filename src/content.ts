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
  intro: "I’m a design-loving developer who .",
  //  link to a longer about page, CV or similar
  moreHref: "/about",
  // set to an image path (e.g. '/images/me.jpg' in /public) to replace the placeholder
  photo: "/images/about-me-transparent.png",
  photoAlt: "no photo",
};

/* ------------------------------------------------------------------
   /about page
   ------------------------------------------------------------------ */

/**
 * Skill blob colour (see `.skill-blob` in index.css and BLOB_COLOR in AboutPage.tsx).
 * `primary: true` makes a blob bigger and bolder.
 */
export type Skill = { name: string; primary?: boolean; color: "blue" | "pink" };

export type CvEntry = {
  title: string;
  subtitle?: string;
  link?: string;
  linktext?: string;
  place: string;
  dates: string;
  text?: string;
};

export const aboutPage = {
  heading: "about me",
  subheading: "(extended version)",

  // Portrait next to the intro. Put files in /public/images and use "/images/<file>".
  photo: "/images/me2.JPEG",
  photoAlt: "Mathilda standing on a giant tomato sculpture in a park",

  intro: [
    "Hi, I’m Mathilda! I’m a frontend developer with a soft spot for good design. I love figuring out how things work, solving problems and getting the little details just right.",
    "I work mainly with React, JavaScript and Tailwind CSS to build responsive, interactive websites. I especially enjoy the technical side of frontend development, from building reusable components to bringing designs to life through code. But my creative background definitely finds its way into my work.",
  ],

  story: {
    heading: "how I got into development",
    paragraphs: [
      "I’ve always been into creative things, from drawing and design to filming and editing videos. That’s what led me to study Graphic Design and Web Development at Jönköping University.",
      "But once I started programming, I quickly realised that was the part I enjoyed the most. I’ve always loved maths, and there’s something really satisfying about working through a problem until you finally get it right.",
      "I still have a strong appreciation for good design, and I think my creative background helps me see things from a different perspective. But if I had to choose between designing something and building it, I’d probably pick the code.",
    ],
  },

  skills: {
    heading: "things I work with",
    items: [
      { name: "React", primary: true, color: "blue" },
      { name: "Figma", color: "pink" },
      { name: "TypeScript", primary: true, color: "pink" },
      { name: "Git", color: "blue" },
      { name: "Next.js", primary: true, color: "blue" },
      { name: "REST APIs", color: "pink" },
      { name: "JavaScript", primary: true, color: "pink" },
      { name: "Strapi", color: "blue" },
      { name: "HTML", primary: true, color: "blue" },
      { name: "UI Design", color: "pink" },
      { name: "CSS", primary: true, color: "pink" },
      { name: "jQuery", color: "blue" },
      { name: "Tailwind CSS", primary: true, color: "blue" },
    ] as Skill[],
  },

  cv: {
    heading: "the road so far",
    experience: [
      {
        title: "Frontend Developer & Designer",
        place: "Lagagruppen AB",
        dates: "Dec 2025 – Jun 2026",
        text: "Worked on redesigning and developing the company’s website, focusing on frontend development, usability, performance, and improving the overall user experience.",
      },
      {
        title: "Frontend Developer",
        place: "Grace Studio",
        dates: "Apr 2024 – Aug 2024",
        text: "Started as an intern and was later offered a summer position. Worked on client projects using React, Next.js, and Tailwind, building interfaces and scroll-based animations.",
      },
      {
        title: "Teaching Assistant in programming courses",
        place: "Jönköping University",
        dates: "Oct 2023 – Apr 2024",
        text: "Assisted students in two programming courses with coding, debugging, and understanding programming concepts.",
      },
    ] as CvEntry[],
    education: [
      {
        title: "Bachelor’s Degree in Informatics",
        subtitle: "Graphic Design and Web Development",
        place: "Jönköping University",
        link: "https://ju.diva-portal.org/smash/record.jsf?pid=diva2%3A1970352&dswid=9956",
        linktext: "read my thesis",
        dates: "2022–2025",
      },
    ] as CvEntry[],
  },

  hobbies: {
    heading: "outside of coding",
    paragraphs: [
      "When I’m not at my computer, you’ll probably find me at the climbing gym, scraping the skin off my hands trying to send my latest project. I also love a good iced matcha latte, spending time outdoors, and cats",
      "I play a lot of video games too, and I’ve always enjoyed creative hobbies like drawing, crocheting, and interior design",
    ],
    // The first image is the large one.
    gallery: [
      { src: "/images/climb1.JPEG", alt: "Photo placeholder: climbing" },
      { src: "/images/hike.JPEG", alt: "Photo placeholder: hiking" },
      {
        src: "/images/cat.JPEG",
        alt: "Photo placeholder: gaming / creative hobbies",
      },
    ] as ProjectImage[],
  },

  outro: {
    heading: "let’s talk!",
    text: "Want to know more? Feel free to take a look at my résumé or get in touch!",
    // PLACEHOLDER: no résumé file yet. Add a PDF to /public (e.g. /resume.pdf)
    // and set this to "/resume.pdf". While null, the link is shown as "coming soon".
    resumeHref: null as string | null,
  },
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
  intro: "A collection of my work across development and design. ",
};

/** PLACEHOLDER gallery: solid colour blocks until real images are added. */
const placeholderGallery = (count: number): ProjectImage[] =>
  Array.from({ length: count }, (_, i) => ({
    src: null,
    alt: `Placeholder image ${i + 1}`,
    caption: "hej",
  }));

// PLACEHOLDER: replace these entries with your real projects.
// Every text value below is a stand-in — none of it describes real work.
export const projects: Project[] = [
  {
    slug: "project-1",
    title: "Project 1",
    category: "web design & development",
    intro: "test.",
    description: "test descriptionnnnnnn",
    role: "developing",
    technologies: ["React", "AI Agents"],
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
    intro: "this and that tttttt",
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
    category: "web development",
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
    category: "web development",
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
