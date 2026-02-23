import type { Metadata } from "next";
import { Globe, Code2, Building, ShoppingCart, Users, Box, Calendar } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Projeler",
};

const projects = [
  {
    title: "Web Sitesi Projesi",
    description:
      "Temel HTML ve CSS ile oluşturulmuş çok sayfalı web sitesi çalışması. Semantik HTML yapılandırması ve responsive tasarım örnekleri içerir.",
    tags: [
      { label: "HTML5", variant: "badge-primary" },
      { label: "CSS3", variant: "badge-info" },
      { label: "Responsive", variant: "badge-warning" },
    ],
    icon: Globe,
    iconColor: "bg-primary-100 text-primary-600",
    year: "2024",
  },
  {
    title: "JavaScript Uygulaması",
    description:
      "Basit bir etkileşimli uygulama projesi. Kullanıcı girişlerini işleme, DOM manipülasyonu ve olay yönetimi örnekleri içerir.",
    tags: [
      { label: "JavaScript", variant: "badge-warning" },
      { label: "DOM", variant: "badge-primary" },
      { label: "Events", variant: "badge-info" },
    ],
    icon: Code2,
    iconColor: "bg-emerald-100 text-emerald-600",
    year: "2024",
  },
  {
    title: "Otel Rezervasyon Sistemi",
    description:
      "Otel oda rezervasyonu yapılabilen, kullanıcı dostu arayüze sahip web uygulaması. Form validasyonu ve LocalStorage kullanımı içerir.",
    tags: [
      { label: "HTML5", variant: "badge-primary" },
      { label: "CSS3", variant: "badge-info" },
      { label: "JavaScript", variant: "badge-warning" },
    ],
    icon: Building,
    iconColor: "bg-cyan-100 text-cyan-600",
    year: "2024",
  },
  {
    title: "E-Ticaret Sitesi",
    description:
      "Ürün listeleme, sepet yönetimi ve ödeme işlemleri içeren tam kapsamlı e-ticaret platformu.",
    tags: [
      { label: "HTML5", variant: "badge-primary" },
      { label: "Bootstrap", variant: "badge-info" },
      { label: "JavaScript", variant: "badge-warning" },
    ],
    icon: ShoppingCart,
    iconColor: "bg-amber-100 text-amber-600",
    year: "2024",
  },
  {
    title: "Öğrenci Proje Sistemi",
    description:
      "Öğrencilerin projelerini yönetebilecekleri, takip edebilecekleri portal uygulaması. Dashboard ve raporlama özellikleri içerir.",
    tags: [
      { label: "HTML5", variant: "badge-primary" },
      { label: "CSS3", variant: "badge-info" },
      { label: "UI/UX", variant: "badge-success" },
    ],
    icon: Users,
    iconColor: "bg-red-100 text-red-600",
    year: "2024",
  },
  {
    title: "UI/UX Bileşen Vitrini",
    description:
      "Bu site! İnteraktif UI bileşenleri, üretkenlik araçları ve API entegrasyonları içeren bir showcase projesi.",
    tags: [
      { label: "React", variant: "badge-primary" },
      { label: "Next.js", variant: "badge-neutral" },
      { label: "Tailwind", variant: "badge-info" },
    ],
    icon: Box,
    iconColor: "bg-slate-100 text-slate-600",
    year: "2025",
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
