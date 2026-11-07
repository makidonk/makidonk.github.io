import type { CardColor, ProjectImage } from "../content";
import { ImageFrame } from "./ImageFrame";

/**
 * Case-study gallery. Images are grouped, in order, into a repeating rhythm
 * that follows the cover image:
 *
 *   split (wide + narrow) → full width → trio (one tall + two stacked) → full width → …
 *
 * Splits and trios mirror on each repeat. When too few images are left for
 * the next block, the remainder becomes a split (2) or a full-width image (1),
 * so there are never empty slots. On mobile everything stacks.
 */

type Block =
  | { kind: "full"; images: [ProjectImage] }
  | { kind: "split"; images: [ProjectImage, ProjectImage]; flip: boolean }
  | {
      kind: "trio";
      images: [ProjectImage, ProjectImage, ProjectImage];
      flip: boolean;
    };

type Kind = Block["kind"];

const RHYTHM: Kind[] = ["split", "full", "trio", "full"];
const SIZE: Record<Kind, number> = { full: 1, split: 2, trio: 3 };

function toBlocks(images: ProjectImage[]): Block[] {
  const blocks: Block[] = [];
  const seen: Record<Kind, number> = { full: 0, split: 0, trio: 0 };
  let i = 0;
  let step = 0;

  while (i < images.length) {
    const left = images.length - i;
    let kind = RHYTHM[step++ % RHYTHM.length];
    if (SIZE[kind] > left) kind = left >= 2 ? "split" : "full";

    const flip = seen[kind]++ % 2 === 1;
    if (kind === "full") blocks.push({ kind, images: [images[i]] });
    else if (kind === "split")
      blocks.push({ kind, images: [images[i], images[i + 1]], flip });
    else
      blocks.push({
        kind,
        images: [images[i], images[i + 1], images[i + 2]],
        flip,
      });
    i += SIZE[kind];
  }
  return blocks;
}

type Props = { images: ProjectImage[]; color: CardColor };

export function ProjectGallery({ images, color }: Props) {
  if (!images.length) return null;
  const other: CardColor = color === "accent" ? "sky" : "accent";
  // Alternate placeholder colours so empty frames still read as a layout
  let n = 0;
  const tone = () => (n++ % 2 === 0 ? other : color);

  return (
    <section
      aria-label="Project images"
      className="shell flex flex-col gap-12 md:gap-24 lg:gap-32"
    >
      {toBlocks(images).map((block, b) => {
        if (block.kind === "full") {
          return (
            <ImageFrame
              key={b}
              image={block.images[0]}
              color={tone()}
              frameClassName="aspect-[4/3] md:aspect-[16/9]"
            />
          );
        }

        if (block.kind === "split") {
          const [first, second] = block.images;
          // Wide landscape beside a narrower portrait; mirrored on repeats.
          // The narrow one sits slightly raised, for an off-grid feel.
          const wide = { className: "md:col-span-7", frame: "aspect-[4/3]" };
          const narrow = {
            className: "md:col-span-5 md:mb-[clamp(2rem,6vw,6rem)]",
            frame: "aspect-[4/5]",
          };
          const [l, r] = block.flip ? [narrow, wide] : [wide, narrow];
          return (
            <div
              key={b}
              className="flex flex-col gap-2 md:grid md:grid-cols-12 md:items-end"
            >
              <ImageFrame
                image={first}
                color={tone()}
                className={l.className}
                frameClassName={l.frame}
              />
              <ImageFrame
                image={second}
                color={tone()}
                className={r.className}
                frameClassName={r.frame}
              />
            </div>
          );
        }

        const [tall, top, bottom] = block.images;
        // One tall image spanning both rows of two stacked landscapes
        return (
          <div
            key={b}
            className="flex flex-col gap-2 md:grid md:grid-cols-12 md:grid-rows-2"
          >
            <ImageFrame
              image={tall}
              color={tone()}
              className={`md:col-span-7 md:row-span-2 ${block.flip ? "md:col-start-6 md:row-start-1" : ""}`}
              frameClassName="aspect-[4/5] md:aspect-auto"
            />
            <ImageFrame
              image={top}
              color={tone()}
              className={`md:col-span-5 ${block.flip ? "md:col-start-1" : ""}`}
              frameClassName="aspect-[4/3]"
            />
            <ImageFrame
              image={bottom}
              color={tone()}
              className={`md:col-span-5 ${block.flip ? "md:col-start-1" : ""}`}
              frameClassName="aspect-[4/3]"
            />
          </div>
        );
      })}
    </section>
  );
}
