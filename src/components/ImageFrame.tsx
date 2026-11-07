import type { CardColor, ProjectImage } from "../content";
import { COLOR_CLASS } from "./ProjectCard";

type Props = {
  image: ProjectImage;
  /** Placeholder colour when `image.src` is null. */
  color: CardColor;
  /** Layout classes for the outer figure (grid placement, height). */
  className?: string;
  /** Classes for the image box, usually an aspect ratio. */
  frameClassName?: string;
  /** Eager-load images near the top of the page. */
  priority?: boolean;
};

/**
 * One image with a fixed frame. The image fills the frame (object-cover), so
 * arrangements keep their proportions whatever the source file's size.
 */
export function ImageFrame({
  image,
  color,
  className = "",
  frameClassName = "",
  priority = false,
}: Props) {
  return (
    <figure className={`flex flex-col ${className}`}>
      <div
        className={`relative grow overflow-hidden ${COLOR_CLASS[color]} ${frameClassName}`}
        data-placeholder={image.src ? undefined : true}
      >
        {image.src ? (
          <img
            src={image.src}
            alt={image.alt}
            loading={priority ? "eager" : "lazy"}
            className="absolute inset-0 size-full object-cover"
          />
        ) : (
          // PLACEHOLDER: shown until a real image path is set in content.ts
          <span className="absolute bottom-4 left-4 rounded-full bg-background px-3 py-1 text-xs font-medium tracking-wide text-text">
            {image.alt}
          </span>
        )}
      </div>
      {image.caption && (
        <figcaption className="mt-2 text-sm text-text/80">
          {image.caption}
        </figcaption>
      )}
    </figure>
  );
}
