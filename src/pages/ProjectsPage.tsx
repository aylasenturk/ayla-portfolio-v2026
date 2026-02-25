import { Link } from "react-router-dom";
import { Timer, ListChecks, Globe } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";

const projects = [
  {
    title: "Kişisel Portfolyo",
    description:
      "Vite + React + TypeScript ile oluşturulmuş, Tailwind CSS v4 tasarım sistemi, D3.js kod haritası ve interaktif araçlar içeren kişisel portfolyo sitesi.",
    href: "/",
    tags: [
      { label: "React", variant: "badge-primary" },
      { label: "TypeScript", variant: "badge-info" },
      { label: "Tailwind v4", variant: "badge-success" },
      { label: "D3.js", variant: "badge-warning" },
    ],
    icon: Globe,
    iconColor: "bg-cyan-100 text-cyan-600",
  },
  {
    title: "Pomodoro Zamanlayıcı",
    description:
      "25 dakikalık odaklanma ve 5 dakikalık mola döngüleriyle üretkenliği artıran zamanlayıcı. Custom hook mimarisi ile iş mantığı ve UI katmanları ayrıştırılmıştır.",
    href: "/tools/pomodoro",
    tags: [
      { label: "React", variant: "badge-primary" },
      { label: "Custom Hook", variant: "badge-warning" },
      { label: "useState", variant: "badge-info" },
    ],
    icon: Timer,
    iconColor: "bg-primary-100 text-primary-600",
  },
  {
    title: "Görev Takipçisi",
    description:
      "Görevleri oluşturma, düzenleme, tamamlama ve filtreleme özellikleri sunan interaktif görev yönetim aracı. Local state ile çalışır.",
    href: "/tools/task-tracker",
    tags: [
      { label: "React", variant: "badge-primary" },
      { label: "Custom Hook", variant: "badge-warning" },
      { label: "CRUD", variant: "badge-success" },
    ],
    icon: ListChecks,
    iconColor: "bg-emerald-100 text-emerald-600",
  },
];

export default function ProjectsPage() {
  return (
    <div>
      <PageHeader section="Portfolio" title="Projeler" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => {
          const Icon = project.icon;
          return (
            <Link
              key={project.title}
              to={project.href}
              className="card group hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="card-body flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`avatar avatar-md ${project.iconColor}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h2 className="text-base font-semibold group-hover:text-primary-600 transition-colors">
                    {project.title}
                  </h2>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span key={tag.label} className={`badge ${tag.variant}`}>
                      {tag.label}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
