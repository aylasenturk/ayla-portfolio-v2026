import boxArrowUp from "../assets/icons/box-arrow-up.svg?raw";
import boxSeam from "../assets/icons/box-seam.svg?raw";
import database from "../assets/icons/database.svg?raw";
import lightningChargeFill from "../assets/icons/lightning-charge-fill.svg?raw";
import braces from "../assets/icons/braces.svg?raw";
import diagram3 from "../assets/icons/diagram-3.svg?raw";
import bookmarkFill from "../assets/icons/bookmark-fill.svg?raw";
import calculator from "../assets/icons/calculator.svg?raw";
import link45deg from "../assets/icons/link-45deg.svg?raw";
import chevronRight from "../assets/icons/chevron-right.svg?raw";
import xLg from "../assets/icons/x-lg.svg?raw";

const ICON_MAP: Record<string, string> = {
  "box-arrow-up": boxArrowUp,
  "box-seam": boxSeam,
  database,
  "lightning-charge-fill": lightningChargeFill,
  braces,
  "diagram-3": diagram3,
  "bookmark-fill": bookmarkFill,
  calculator,
  "link-45deg": link45deg,
  "chevron-right": chevronRight,
  "x-lg": xLg,
};

interface IconProps {
  name: string;
  className?: string;
}

export default function Icon({ name, className = "" }: IconProps) {
  const svg = ICON_MAP[name];
  if (!svg) return null;

  return (
    <span
      className={`inline-flex shrink-0 ${className}`}
      dangerouslySetInnerHTML={{ __html: svg }}
      aria-hidden="true"
    />
  );
}
