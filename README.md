# Ayla Şentürk — Kişisel Portfolyo

Ayla Şentürk'ün kişisel portfolyo web sitesi. **Vite + React + TypeScript + Tailwind CSS v4** ile oluşturulmuştur.

## Teknolojiler

| Katman | Teknoloji |
|---|---|
| Framework | React 19 + TypeScript |
| Build Aracı | Vite 6 |
| Stil | Tailwind CSS v4 |
| Routing | React Router DOM v7 |
| İkonlar | Lucide React |

## Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev
# http://localhost:5173 adresinden eriş

# TypeScript tip kontrolü
npm run build

# Statik build önizleme
npm run preview
```

## Proje Yapısı

```
src/
  hooks/
    usePomodoro.ts          # Pomodoro zamanlayıcı business logic
    useTaskTracker.ts       # Görev takipçisi business logic
  components/
    layout/                 # Sidebar, Navbar, Footer, MainLayout
    ui/                     # Yeniden kullanılabilir UI bileşenleri
  pages/
    HomePage.tsx
    ProjectsPage.tsx
    ArticlesPage.tsx
    ContactPage.tsx
    ResumePage.tsx
    PomodoroPage.tsx        # Dumb component — logic hook'ta
    TaskTrackerPage.tsx     # Dumb component — logic hook'ta
  lib/
    navigation.ts           # Navigasyon yapısı
```

## Sayfalar

**Portfolio:**
- Ana Sayfa, Projeler, Makaleler, İletişim, Özgeçmiş

**Üretkenlik Araçları (Showcase):**
- Pomodoro Zamanlayıcı, Görev Takipçisi

## Özellikler

- WCAG 2.1 / Axe erişilebilirlik standartları (`aria-pressed` string değerler)
- Responsive tasarım
- Custom Hook mimarisi (UI / Logic ayrımı)
- TypeScript ile tam tip güvenliği

## Yapımcı

**Ayla Şentürk** — Bilgisayar Programcısı | Web Geliştirici

- GitHub: [@aylasenturk](https://github.com/aylasenturk)
- LinkedIn: [Ayla Şentürk](https://www.linkedin.com/in/ayla-%C5%9Fent%C3%BCrk-9828163a9)

**Mentor:** Öğr. Gör. Dr. Ufuk Tanyeri

**Katkılar:** Enes Can Ak
