import { clsx } from "clsx";

interface PageHeaderProps {
  section: string;
  title: string;
  className?: string;
}

export default function PageHeader({ section, title, className }: PageHeaderProps) {
  return (
    <h1 className={clsx("page-header text-lg", className)}>
      <span className="page-header-muted">{section} /</span>
      <span className="ml-1">{title}</span>
    </h1>
  );
}
