import type { Metadata } from "next";
import { Code2, Palette, CodeSquare, Accessibility, Calendar } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Makaleler",
};

const articles = [
  {
    title: "HTML Nedir?",
    date: "15 Ocak 2024",
    description:
      "Temel HTML yapısını anlatan kısa bir makale. HTML (HyperText Markup Language), web sayfalarının yapısal içeriğini tanımlamak için kullanılan standart işaretleme dilidir. Bu makalede HTML'in temel yapısını, etiketleri ve semantik HTML kullanımı hakkında bilgi edinebilirsiniz.",
    tags: [
      { label: "HTML", variant: "badge-primary" },
      { label: "Web Geliştirme", variant: "badge-info" },
      { label: "Başlangıç", variant: "badge-success" },
    ],
    icon: Code2,
    iconColor: "bg-primary-100 text-primary-600",
  },
  {
    title: "CSS ile Tasarım",
    date: "22 Ocak 2024",
    description:
      "CSS'in temel prensipleri üzerine yazılmış bir yazı. CSS (Cascading Style Sheets), HTML elemanlarının görsel sunumunu kontrol etmek için kullanılır. Renkler, yazı tipleri, kenar boşlukları ve responsive tasarım teknikleri bu makalede ele alınmaktadır.",
    tags: [
      { label: "CSS", variant: "badge-info" },
      { label: "Tasarım", variant: "badge-warning" },
      { label: "Responsive", variant: "badge-success" },
    ],
    icon: Palette,
    iconColor: "bg-cyan-100 text-cyan-600",
  },
  {
    title: "JavaScript Temelleri",
    date: "5 Şubat 2024",
    description:
      "JavaScript programlama dilinin temellerini anlatan kapsamlı bir rehber. Değişkenler, fonksiyonlar, döngüler, koşullar ve DOM manipülasyonu gibi temel konular bu makalede işlenmektedir.",
    tags: [
      { label: "JavaScript", variant: "badge-warning" },
      { label: "Programlama", variant: "badge-primary" },
      { label: "DOM", variant: "badge-info" },
    ],
    icon: CodeSquare,
    iconColor: "bg-amber-100 text-amber-600",
  },
  {
    title: "Web Erişilebilirliği (A11Y)",
    date: "12 Şubat 2024",
    description:
      "Web sitelerinin herkes tarafından erişilebilir olması için dikkat edilmesi gereken konular. ARIA etiketleri, klavye navigasyonu, renk kontrastları ve ekran okuyucu uyumluluğu gibi konular bu makalede ele alınmaktadır.",
    tags: [
      { label: "Erişilebilirlik", variant: "badge-success" },
      { label: "ARIA", variant: "badge-primary" },
      { label: "WCAG", variant: "badge-info" },
    ],
    icon: Accessibility,
    iconColor: "bg-emerald-100 text-emerald-600",
  },
];

export default function ArticlesPage() {
  return (
    <div>
      <PageHeader section="Portfolio" title="Makaleler" />

      <div className="space-y-4">
        {articles.map((article) => {
          const Icon = article.icon;
          return (
            <article key={article.title} className="card">
              <div className="card-body">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`avatar avatar-md ${article.iconColor}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold">{article.title}</h2>
                    <div className="flex items-center gap-1.5 text-xs text-text-muted">
                      <Calendar className="w-3 h-3" />
                      <time>{article.date}</time>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed mb-4">
                  {article.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {article.tags.map((tag) => (
                    <span key={tag.label} className={`badge ${tag.variant}`}>
                      {tag.label}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
