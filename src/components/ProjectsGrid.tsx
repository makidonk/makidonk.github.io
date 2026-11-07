import type { CSSProperties } from "react";
import type { GridSize, Project } from "../content";
import { ProjectCard } from "./ProjectCard";

/**
 * Editorial grid for /projects.
 *
 * Projects are packed, in order, into rows of at most two on a 12-column
 * grid, using each project's `gridSize`. The columns a row doesn't use become
 * deliberate empty space, and its position rotates from row to row (gap in the
 * middle, gap on the left, gap on the right), so the page has rhythm
 * without anything being positioned at random. Nothing depends on how many
 * projects there are.
 *
 *  - desktop (lg): 12 columns, spans from `gridSize`, empty columns, staggered rows
 *  - tablet  (md): simpler 7/5 splits, lone cards offset left/right
 *  - mobile:       one column, in data order, no empty space
 */

/** Desktop column span per size. */
const SPAN: Record<GridSize, number> = {
  small: 4,
  medium: 5,
  large: 7,
  full: 12,
};

/** Image proportions per size. */
const ASPECT: Record<GridSize, string> = {
  small: "aspect-[4/5]",
  medium: "aspect-square",
  large: "aspect-[4/3]",
  full: "aspect-[4/3] md:aspect-[21/9]",
};

const COLS = 12;
const MAX_PER_ROW = 2;

type Item = { project: Project; index: number; size: GridSize };

function packRows(projects: Project[]): Item[][] {
  const rows: Item[][] = [];
  let row: Item[] = [];
  let used = 0;

  projects.forEach((project, index) => {
    const size = project.gridSize ?? "small";
    const span = SPAN[size];
    if (row.length && (used + span > COLS || row.length === MAX_PER_ROW)) {
      rows.push(row);
      row = [];
      used = 0;
    }
    row.push({ project, index, size });
    used += span;
  });
  if (row.length) rows.push(row);
  return rows;
}

const col = (start: number, span: number) => `${start} / span ${span}`;

/** Grid-column values for every item in a row, per breakpoint. */
function placeRow(row: Item[], rowIndex: number) {
  if (row.length === 1) {
    const span = SPAN[row[0].size];
    const mdSpan = span === COLS ? COLS : 8;
    // Lone cards alternate: left, right, inset from the left
    const lgStart = [1, COLS - span + 1, Math.min(3, COLS - span + 1)][
      rowIndex % 3
    ];
    const mdStart = rowIndex % 2 === 0 ? 1 : COLS - mdSpan + 1;
    return [{ md: col(mdStart, mdSpan), lg: col(lgStart, span) }];
  }

  const [a, b] = row.map((item) => SPAN[item.size]);
  const free = COLS - a - b;
  // Where the empty columns go: between, before, or after the pair
  const aStart = [1, 1 + free, 1][rowIndex % 3];
  const bStart = [COLS - b + 1, aStart + a, aStart + a][rowIndex % 3];

  // Tablet: always a 7/5 split; the larger card keeps the larger share
  const aMd = a > b ? 7 : a < b ? 5 : rowIndex % 2 === 0 ? 7 : 5;

  return [
    { md: col(1, aMd), lg: col(aStart, a) },
    { md: col(aMd + 1, COLS - aMd), lg: col(bStart, b) },
  ];
}

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const rows = packRows(projects);

  return (
    <div className="flex flex-col gap-14 md:gap-20 lg:gap-28">
      {rows.map((row, r) => {
        const placement = placeRow(row, r);
        // Even rows: tops aligned, the smaller card drops down a little.
        // Odd rows: bottoms aligned.
        const staggered = r % 2 === 0 && row.length === 2;
        const dropIndex =
          SPAN[row[0].size] < SPAN[row[1]?.size ?? "small"] ? 0 : 1;

        return (
          <div
            key={row[0].project.slug}
            className={`flex flex-col gap-14 md:grid md:grid-cols-12 md:gap-x-2 ${
              r % 2 === 0 ? "md:items-start" : "md:items-end"
            }`}
          >
            {row.map((item, i) => (
              <div
                key={item.project.slug}
                className={`md:[grid-column:var(--col-md)] lg:[grid-column:var(--col-lg)] ${
                  staggered && i === dropIndex
                    ? "lg:mt-[clamp(4rem,9vw,9rem)]"
                    : ""
                }`}
                style={
                  {
                    "--col-md": placement[i].md,
                    "--col-lg": placement[i].lg,
                  } as CSSProperties
                }
              >
                <ProjectCard
                  project={item.project}
                  index={item.index}
                  imageClassName={ASPECT[item.size]}
                  showCategory
                />
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
