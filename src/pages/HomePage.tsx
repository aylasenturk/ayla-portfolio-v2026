import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FolderOpen,
  BookOpen,
  Mail,
  Timer,
  Calculator,
  Box,
  Github,
  Accessibility,
  Smartphone,
} from "lucide-react";
import ForceGraph from "@/features/code-map/components/ForceGraph";
import IndentedTree from "@/features/code-map/components/IndentedTree";

type CodeMapView = "graph" | "tree";

const CODE_MAP_TABS: { key: CodeMapView; label: string }[] = [
  { key: "graph", label: "Yönlendirilmiş Grafik" },
  { key: "tree", label: "Girintili Ağaç" },
];

const quickAccessCards = [
  {
    title: "Projeler",
    description: "Web sitesi ve uygulama projelerimi inceleyin.",
    href: "/projeler",
    icon: FolderOpen,
    color: "bg-primary-100 text-primary-600",
  },
  {
    title: "Makaleler",
    description: "Teknik yazılar ve eğitim içeriklerini okuyun.",
    href: "/makaleler",
    icon: BookOpen,
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    title: "İletişim",
    description: "Benimle iletişime geçin.",
    href: "/iletisim",
    icon: Mail,
    color: "bg-cyan-100 text-cyan-600",
  },
];

const features = [
  {
    title: "Üretkenlik Araçları",
    description: "Pomodoro, Görev Takipçisi, Tarih Seçici",
    icon: Timer,
    color: "bg-primary-100 text-primary-600",
  },
  {
    title: "Hesaplayıcılar",
    description: "Sıcaklık Dönüştürücü, Yaş Hesaplayıcı",
    icon: Calculator,
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    title: "UI Bileşenleri",
    description: "Flashcards, Tabs, Tooltip ve daha fazlası",
    icon: Box,
    color: "bg-cyan-100 text-cyan-600",
  },
  {
    title: "API Entegrasyonları",
    description: "GitHub, Reddit API örnekleri",
    icon: Github,
    color: "bg-amber-100 text-amber-600",
  },
  {
    title: "Erişilebilirlik",
    description: "ARIA, Klavye navigasyonu",
    icon: Accessibility,
    color: "bg-red-100 text-red-600",
  },
  {
    title: "Responsive Tasarım",
    description: "Mobil uyumlu arayüzler",
    icon: Smartphone,
    color: "bg-slate-100 text-slate-600",
  },
];

export default function HomePage() {
  const [codeMapView, setCodeMapView] = useState<CodeMapView>("graph");

  return (
    <div className="space-y-6">
      {/* Hoş Geldiniz Kartı */}
      <div className="card">
        <div className="card-body">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-primary-600 mb-3">
                Hoş Geldiniz!
              </h2>
              <p className="text-text-secondary mb-4 leading-relaxed">
                Bu web sitesi, Ayla Şentürk&apos;ün portfolyo ve UI/UX bileşen
                vitrinidir. HTML, CSS ve JavaScript ile oluşturulmuş interaktif
                bileşenler, üretkenlik araçları ve API entegrasyonları içerir.
              </p>
              <Link to="/projeler" className="btn btn-primary">
                Projeleri Gör
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Kod Haritası */}
      <div className="card">
        <div className="card-header flex items-center justify-between">
          <h2 className="text-base font-semibold">Kod Haritası</h2>
          <div className="flex rounded-lg border border-border overflow-hidden">
            {CODE_MAP_TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setCodeMapView(tab.key)}
                className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                  codeMapView === tab.key
                    ? "bg-primary-600 text-white"
                    : "bg-surface text-text-secondary hover:bg-surface-hover"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        <div className="card-body">
          <p className="text-sm text-text-secondary mb-4">
            Düğümlere tıklayarak dosya detaylarını görüntüleyin.
          </p>
          {codeMapView === "graph" ? <ForceGraph /> : <IndentedTree />}
        </div>
      </div>

      {/* Hızlı Erişim Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quickAccessCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.href} to={card.href} className="card group hover:shadow-md transition-shadow">
              <div className="card-body">
                <div className={`avatar avatar-md ${card.color} mb-4`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold mb-1 group-hover:text-primary-600 transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm text-text-muted">{card.description}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Özellikler */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-base font-semibold">Bu Sitede Neler Var?</h2>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="flex items-center gap-3">
                  <div className={`avatar avatar-md flex-shrink-0 ${feature.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">{feature.title}</h3>
                    <p className="text-xs text-text-muted">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
