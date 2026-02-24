import { Globe, Code2, Building, ShoppingCart, Users, Box, Calendar } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";

const projects = [
  {
    title: ".NET'ten React'a Göç",
    description:
      "ASP.NET Core MVC tabanından ayrıştırılarak Vite + React + TypeScript mimarisine taşınan ana dönüşüm çalışması.",
    tags: [
      { label: "React", variant: "badge-primary" },
      { label: "Vite", variant: "badge-neutral" },
      { label: "TypeScript", variant: "badge-info" },
    ],
    icon: Globe,
    iconColor: "bg-primary-100 text-primary-600",
    year: "2025",
    repoUrl: "",
  },
  {
    title: "Layout ve Router Mimarisi",
    description:
      "`ContentNavbarLayout` yapısının `MainLayout` + `Navbar` + `Sidebar` bileşenlerine dönüştürülmesi ve route mimarisinin merkezileştirilmesi.",
    tags: [
      { label: "react-router-dom", variant: "badge-warning" },
      { label: "MainLayout", variant: "badge-primary" },
      { label: "Navigation", variant: "badge-info" },
    ],
    icon: Code2,
    iconColor: "bg-emerald-100 text-emerald-600",
    year: "2025",
    repoUrl: "",
  },
  {
    title: "Assets ve Tasarım Sistemi",
    description:
      "`wwwroot` varlıklarının modern frontend yapısına taşınması, Bootstrap/jQuery bağımlılıklarının kaldırılması ve Tailwind v4 tema tokenlarının kurulması.",
    tags: [
      { label: "Tailwind v4", variant: "badge-info" },
      { label: "Design Tokens", variant: "badge-success" },
      { label: "Asset Migration", variant: "badge-warning" },
    ],
    icon: Building,
    iconColor: "bg-cyan-100 text-cyan-600",
    year: "2025",
    repoUrl: "",
  },
  {
    title: "Hook Tabanlı Araç Refaktörü",
    description:
      "Pomodoro ve Görev Takipçisi iş mantığının custom hook'lara ayrıştırıldığı, UI ve business logic katmanlarının netleştirildiği refaktör.",
    tags: [
      { label: "useState", variant: "badge-primary" },
      { label: "useEffect", variant: "badge-info" },
      { label: "Custom Hooks", variant: "badge-warning" },
    ],
    icon: ShoppingCart,
    iconColor: "bg-amber-100 text-amber-600",
    year: "2025",
    repoUrl: "",
  },
  {
    title: "Erişilebilirlik ve Responsive İyileştirmeler",
    description:
      "A11y odaklı düzenlemeler, ARIA uyumluluğu ve mobil/masaüstü davranışlarının optimize edildiği kalite artırma çalışmaları.",
    tags: [
      { label: "WCAG 2.1", variant: "badge-success" },
      { label: "ARIA", variant: "badge-primary" },
      { label: "Responsive", variant: "badge-info" },
    ],
    icon: Users,
    iconColor: "bg-red-100 text-red-600",
    year: "2025",
    repoUrl: "",
  },
  {
    title: "Statik SPA Build ve Yayına Hazırlık",
    description:
      "Tamamen statik çıktı üreten build süreci, dist dağıtımı ve modern hosting platformlarına uygun yayınlama yaklaşımı.",
    tags: [
      { label: "SPA", variant: "badge-primary" },
      { label: "Vite", variant: "badge-neutral" },
      { label: "Deploy", variant: "badge-info" },
    ],
    icon: Box,
    iconColor: "bg-slate-100 text-slate-600",
    year: "2026",
    repoUrl: "",
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
            <div key={project.title} className="card flex flex-col">
              <div className="card-body flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`avatar avatar-md ${project.iconColor}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h2 className="text-base font-semibold">{project.title}</h2>
                </div>
                <p className="text-sm text-text-secondary mb-4 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span key={tag.label} className={`badge ${tag.variant}`}>
                      {tag.label}
                    </span>
                  ))}
                </div>

                <div className="mt-4 text-xs text-text-muted">
                  Repo: {project.repoUrl ? project.repoUrl : "Eklenecek"}
                </div>
              </div>
              <div className="card-footer">
                <div className="flex items-center gap-1.5 text-sm text-text-muted">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{project.year}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
