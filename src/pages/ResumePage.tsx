import {
  Linkedin,
  Github,
  Twitter,
  MapPin,
  Mail,
  Globe,
  Server,
  Database,
  Code2,
  Palette,
  Wrench,
  GraduationCap,
  Briefcase,
  FolderOpen,
  Star,
  User,
  Languages,
  IdCard,
  Building,
  ShoppingCart,
  Users,
  Info,
} from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";

interface SkillBar {
  name: string;
  level: number;
  label: string;
}

const webSkills: SkillBar[] = [
  { name: "HTML5, CSS3, JavaScript", level: 75, label: "Orta" },
  { name: "Responsive Tasarım", level: 70, label: "Orta" },
  { name: "Erişilebilirlik (WCAG)", level: 65, label: "Orta" },
];

const backendSkills: SkillBar[] = [
  { name: "XAMPP (Apache, PHP)", level: 70, label: "Orta" },
  { name: "PHP ile Dinamik Kodlama", level: 65, label: "Orta" },
  { name: "Sunucu Konfigürasyonu", level: 55, label: "Temel" },
];

const dbSkills: SkillBar[] = [
  { name: "MySQL", level: 70, label: "Orta" },
  { name: "MS SQL Server", level: 60, label: "Temel-Orta" },
  { name: "Veritabanı Tasarımı", level: 65, label: "Orta" },
];

const programmingSkills: SkillBar[] = [
  { name: "Nesne Tabanlı Programlama", level: 65, label: "Orta" },
  { name: "Algoritma", level: 60, label: "Temel-Orta" },
  { name: "Veri Yapıları", level: 55, label: "Temel" },
];

const courses = [
  "Web Tasarım Temelleri",
  "Web Arayüz Tasarımı",
  "Programlama Temelleri",
  "Nesne Tabanlı Programlama",
  "Veritabanı Yönetimi",
  "Veritabanı Uygulamaları",
  "Grafik ve Animasyon",
  "Siber Güvenliğe Giriş",
  "Açık Kaynak Yazılımlar",
  "Bilgisayar Donanımı ve Ağ",
  "Sunucu İşletim Sistemleri",
  "İnsan Bilgisayar Etkileşimi",
];

function SkillSection({
  title,
  icon: Icon,
  iconColor,
  skills,
  note,
}: {
  title: string;
  icon: typeof Globe;
  iconColor: string;
  skills: SkillBar[];
  note?: string;
}) {
  return (
    <div className="mb-6 last:mb-0">
      <h3 className={`text-sm font-semibold mb-3 flex items-center gap-2 ${iconColor}`}>
        <Icon className="w-4 h-4" />
        {title}
      </h3>
      <div className="space-y-3">
        {skills.map((skill) => (
          <div key={skill.name} className="flex items-center gap-3">
            <span className="text-sm text-text-secondary w-44 flex-shrink-0">
              {skill.name}
            </span>
            <div className="progress-bar flex-1">
              <div
                className={`progress-fill ${iconColor.includes("primary") ? "bg-primary-500" : iconColor.includes("emerald") ? "bg-emerald-500" : iconColor.includes("cyan") ? "bg-cyan-500" : "bg-amber-500"}`}
                style={{ width: `${skill.level}%` }}
              />
            </div>
            <span className="text-xs text-text-muted w-16 text-right flex-shrink-0">
              {skill.label}
            </span>
          </div>
        ))}
      </div>
      {note && (
        <p className="text-xs text-text-muted mt-2 flex items-center gap-1">
          <Info className="w-3 h-3" />
          {note}
        </p>
      )}
    </div>
  );
}

export default function ResumePage() {
  return (
    <div>
      <PageHeader section="Portfolio" title="Özgeçmiş" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sol Kolon */}
        <div className="space-y-4">
          {/* Profil */}
          <div className="card">
            <div className="card-body text-center">
              <img
                src="/img/avatars/ayla_senturk.gif"
                alt="Ayla Şentürk"
                width={96}
                height={96}
                className="w-24 h-24 mx-auto mb-3 rounded-full object-cover"
              />
              <h2 className="text-lg font-semibold">Ayla ŞENTÜRK</h2>
              <p className="text-sm text-text-muted mb-4">
                Bilgisayar Programcısı | Web Geliştirici
              </p>
              <div className="flex justify-center gap-2">
                <a
                  href="https://www.linkedin.com/in/ayla-%C5%9Fent%C3%BCrk-9828163a9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-icon btn-primary rounded-lg"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://github.com/aylasenturk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-icon bg-slate-800 text-white hover:bg-slate-900 rounded-lg"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="https://x.com/SenturkAyl60453"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-icon btn-outline rounded-lg"
                  aria-label="X"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* İletişim */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <User className="w-4 h-4" /> İletişim
              </h3>
            </div>
            <div className="card-body space-y-3">
              <div>
                <p className="text-xs text-text-muted">Konum</p>
                <p className="text-sm flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-text-muted" />
                  Çankaya, Ankara
                </p>
              </div>
              <div>
                <p className="text-xs text-text-muted">E-posta</p>
                <p className="text-sm flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-text-muted" />
                  ayla.senturk35@gmail.com
                </p>
              </div>
            </div>
          </div>

          {/* Diller */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <Languages className="w-4 h-4" /> Diller
              </h3>
            </div>
            <div className="card-body space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Türkçe</span>
                <span className="badge badge-success">Ana Dil</span>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">İngilizce</span>
                  <span className="badge badge-info">Orta</span>
                </div>
                <p className="text-xs text-text-muted">
                  Mesleki dokümanları okuma ve anlama düzeyinde yeterli
                </p>
              </div>
            </div>
          </div>

          {/* Referanslar */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <IdCard className="w-4 h-4" /> Referanslar
              </h3>
            </div>
            <div className="card-body">
              <div className="flex items-start gap-3">
                <div className="avatar avatar-md bg-primary-100 text-primary-600 flex-shrink-0">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">Öğr. Gör. Dr. Ufuk TANYERİ</p>
                  <p className="text-xs text-text-muted">Ankara Üniversitesi</p>
                  <p className="text-xs text-text-muted">Nallıhan Meslek Yüksekokulu</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sağ Kolon */}
        <div className="lg:col-span-2 space-y-4">
          {/* Beceriler */}
          <div className="card">
            <div className="card-header">
              <h2 className="text-base font-semibold flex items-center gap-2">
                <Code2 className="w-4 h-4" /> Beceriler ve Yetkinlik Düzeyleri
              </h2>
            </div>
            <div className="card-body">
              <SkillSection
                title="Web Geliştirme"
                icon={Globe}
                iconColor="text-primary-600"
                skills={webSkills}
                note="Ders projeleri ve portfolio uygulamalarında kullanıldı"
              />
              <SkillSection
                title="Backend & Sunucu"
                icon={Server}
                iconColor="text-emerald-600"
                skills={backendSkills}
                note="XAMPP ortamında Apache-PHP-MySQL ile dinamik web uygulamaları geliştirildi"
              />
              <SkillSection
                title="Veritabanı"
                icon={Database}
                iconColor="text-cyan-600"
                skills={dbSkills}
                note="Ders projelerinde CRUD işlemleri, tablo tasarımı ve SQL sorguları yazıldı"
              />
              <SkillSection
                title="Programlama"
                icon={Code2}
                iconColor="text-amber-600"
                skills={programmingSkills}
              />

              {/* Tasarım ve Araçlar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 pt-4 border-t border-border">
                <div>
                  <h3 className="text-sm font-semibold flex items-center gap-2 text-amber-600 mb-2">
                    <Palette className="w-4 h-4" /> Tasarım
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="badge badge-warning">Figma (Temel)</span>
                    <span className="badge badge-warning">UI/UX (Temel)</span>
                    <span className="badge badge-warning">Grafik (Temel)</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold flex items-center gap-2 text-slate-600 mb-2">
                    <Wrench className="w-4 h-4" /> Araçlar
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="badge badge-neutral">Git (Temel)</span>
                    <span className="badge badge-neutral">VS Code</span>
                    <span className="badge badge-neutral">XAMPP</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Eğitim */}
          <div className="card">
            <div className="card-header">
              <h2 className="text-base font-semibold flex items-center gap-2">
                <GraduationCap className="w-4 h-4" /> Eğitim
              </h2>
            </div>
            <div className="card-body">
              <div className="flex gap-3">
                <div className="avatar avatar-sm bg-primary-100 text-primary-600 flex-shrink-0 mt-0.5">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">
                    Bilgisayar Programcılığı (Ön Lisans)
                  </h3>
                  <p className="text-sm text-primary-600 mb-1">
                    Ankara Üniversitesi - Nallıhan Meslek Yüksekokulu
                  </p>
                  <p className="text-xs text-text-muted mb-3">2023 - 2025</p>
                  <h4 className="text-xs font-semibold mb-2">Alınan Temel Dersler:</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {courses.map((course) => (
                      <span
                        key={course}
                        className="inline-flex items-center rounded-md px-2 py-0.5 text-xs border border-border text-text-secondary bg-surface-alt"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Deneyim */}
          <div className="card">
            <div className="card-header">
              <h2 className="text-base font-semibold flex items-center gap-2">
                <Briefcase className="w-4 h-4" /> Deneyim
              </h2>
            </div>
            <div className="card-body">
              <div className="flex gap-3">
                <div className="avatar avatar-sm bg-emerald-100 text-emerald-600 flex-shrink-0 mt-0.5">
                  <Code2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">Stajyer / Junior Web Geliştirici</h3>
                  <p className="text-sm text-primary-600 mb-1">İşletmede Mesleki Eğitim</p>
                  <p className="text-xs text-text-muted mb-3">2024 - 2025</p>
                  <ul className="space-y-1.5 text-sm text-text-secondary">
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-text-muted mt-2 flex-shrink-0" />
                      HTML, CSS ve JavaScript ile web arayüzleri geliştirme
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-text-muted mt-2 flex-shrink-0" />
                      Responsive ve erişilebilir web tasarımı uygulama
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-text-muted mt-2 flex-shrink-0" />
                      XAMPP ortamında PHP ve MySQL ile dinamik web uygulamaları
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-text-muted mt-2 flex-shrink-0" />
                      Veritabanı tasarımı ve SQL sorguları yazma
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-text-muted mt-2 flex-shrink-0" />
                      Ekip içi proje yönetimi ve iş birliği
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Projeler */}
          <div className="card">
            <div className="card-header">
              <h2 className="text-base font-semibold flex items-center gap-2">
                <FolderOpen className="w-4 h-4" /> Projeler
              </h2>
            </div>
            <div className="card-body">
              <div className="flex items-center gap-2 p-3 rounded-lg bg-surface-alt border border-border-light mb-4">
                <Info className="w-4 h-4 text-text-muted flex-shrink-0" />
                <p className="text-xs text-text-secondary">
                  Aşağıdaki projeler, üniversite eğitimi sürecinde ders odaklı olarak
                  hazırlanmış uygulamalardır.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { icon: Building, title: "Otel Rezervasyon", subtitle: "Web Uygulaması", tags: ["HTML", "CSS", "JS"], color: "text-primary-600" },
                  { icon: ShoppingCart, title: "E-Ticaret Sitesi", subtitle: "Tam Kapsamlı Platform", tags: ["PHP", "MySQL"], color: "text-emerald-600" },
                  { icon: Users, title: "Öğrenci Proje Sistemi", subtitle: "Portal Uygulaması", tags: ["PHP", "MySQL"], color: "text-cyan-600" },
                ].map((project) => {
                  const Icon = project.icon;
                  return (
                    <div
                      key={project.title}
                      className="text-center p-4 rounded-lg bg-surface-alt"
                    >
                      <Icon className={`w-8 h-8 mx-auto mb-2 ${project.color}`} />
                      <h3 className="text-sm font-semibold mb-0.5">{project.title}</h3>
                      <p className="text-xs text-text-muted mb-2">{project.subtitle}</p>
                      <div className="flex flex-wrap justify-center gap-1">
                        {project.tags.map((tag) => (
                          <span key={tag} className="badge badge-primary text-[10px]">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Portfolio Projesi */}
          <div className="card border-primary-200">
            <div className="card-header bg-primary-600 text-white rounded-t-xl">
              <h2 className="text-base font-semibold flex items-center gap-2">
                <Star className="w-4 h-4" /> Portfolio Projesi (Bu Site)
              </h2>
            </div>
            <div className="card-body">
              <p className="text-sm text-text-secondary mb-4 leading-relaxed">
                Bu web sitesi, <strong>bulud.de</strong> web developer iş başvurusu
                için özel olarak hazırlanmış, interaktif bileşenler içeren bir React
                uygulamasıdır.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-semibold mb-2">Kullanılan Teknolojiler:</h3>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="badge badge-primary">React</span>
                    <span className="badge badge-neutral">Vite</span>
                    <span className="badge badge-info">Tailwind CSS</span>
                    <span className="badge badge-warning">TypeScript</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-2">Öne Çıkan Özellikler:</h3>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-text-muted mt-2 flex-shrink-0" />
                      WCAG 2.1 erişilebilirlik standartları
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-text-muted mt-2 flex-shrink-0" />
                      Responsive tasarım
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-text-muted mt-2 flex-shrink-0" />
                      Vite ile hızlı geliştirme ve build
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-text-muted mt-2 flex-shrink-0" />
                      Üretkenlik araçları
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
