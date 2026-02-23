# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Önemli: Harekete Geçmeden Önce Daima Sor

Açık kullanıcı onayı olmadan ASLA otonom eylem gerçekleştirme. Her zaman planınızı sunun ve şunlardan önce onay bekleyin:

- Yazılım kurma veya yükleyici çalıştırma
- Git depolarını değiştirme (.git silme, remote değiştirme)
- Uygulama açma
- Üretim dosyalarında değişiklik yapma
- Bağlamı tüketebilecek çok sayıda dosya okuma

## Analizden Önce Eylem

Kullanıcı belirli bir çıktı istediğinde (diyagramlar, kod, belgeler), önce çıktıyı üret. Çıktı oluşturmadan önce uzun açıklayıcı sorular sormaya veya uzun analizler yapmaya zaman harcama. Önce bir taslak üret, sonra geri bildirime göre geliştir.

## Build & Dev Commands

```bash
npm run dev       # Vite dev server (localhost:5173)
npm run build     # TypeScript check + Vite build → dist/ directory
npm run preview   # Serve production build locally
npm run lint      # ESLint
```

No test framework is configured.

## Architecture

This is a **static portfolio site** for Ayla Senturk, built with Vite + React + react-router-dom. The `dist/` directory contains the deployable static files.

### Tech Stack
- Vite 6 (build tool)
- React 19, TypeScript (strict mode)
- react-router-dom 7 (client-side routing)
- Tailwind CSS v4 (via `@tailwindcss/postcss` plugin)
- Lucide React for icons
- `clsx` for conditional classnames

### Layout Architecture

The app uses a single client-side shell for all pages:

`main.tsx` → `BrowserRouter` → `App.tsx` → `MainLayout` → `Sidebar` + `Navbar` + `<Routes>` + `Footer`

- **App.tsx** (`src/App.tsx`): Route definitions wrapping all pages inside MainLayout.
- **MainLayout** (`src/components/layout/MainLayout.tsx`): Manages sidebar open/close and dark mode state. All layout components live in `src/components/layout/`.
- **Navigation**: Defined centrally in `src/lib/navigation.ts` as `NavGroup[]`. Add new pages/tools here to have them appear in the sidebar.

### Page Structure

All pages live in `src/pages/` as standalone React components:

- **Content pages**: `HomePage`, `ProjectsPage`, `ArticlesPage`, `ContactPage`, `ResumePage`
- **Interactive tool pages**: `PomodoroPage`, `TaskTrackerPage`, `DatePickerPage`, `TemperatureConverterPage`, `AgeCalculatorPage` — self-contained components with local state only.

Routes are defined in `src/App.tsx`.

### Design System

**Important**: The theme lives in `src/index.css` using Tailwind v4's `@theme` directive.

Key CSS tokens defined in `@theme`:
- Colors: `primary-50` through `primary-900` (blue scale), `surface`, `surface-alt`, `surface-hover`, `text-primary`, `text-secondary`, `text-muted`, `border`, `border-light`
- Fonts: `--font-sans` (Inter), `--font-mono` (JetBrains Mono)
- Dark mode: `html[data-theme="dark"]` overrides in `@layer base`

Reusable component classes defined in `@layer components` in index.css:
- Layout: `.card`, `.card-header`, `.card-body`, `.card-footer`
- Buttons: `.btn`, `.btn-primary`, `.btn-outline`, `.btn-success`, `.btn-warning`, `.btn-danger`, `.btn-ghost`, `.btn-icon`
- Forms: `.input`, `.select`, `.label`
- Typography: `.badge` + variants (`-primary`, `-success`, `-warning`, `-info`, `-danger`, `-neutral`)
- Other: `.avatar` (+`-sm`, `-md`, `-lg`), `.progress-bar`, `.progress-fill`, `.page-header`

Use `PageHeader` component (`src/components/ui/PageHeader.tsx`) for page titles — it renders breadcrumb-style "Section / Title" headers.

### Path Alias

`@/*` maps to `./src/*` (configured in tsconfig.json and vite.config.ts).

### Language

All UI text is in Turkish. Route paths use Turkish slugs (`/projeler`, `/makaleler`, `/iletisim`, `/ozgecmis`, `/araclar/gorev-takipcisi`, etc.).

## Bağlam Penceresi Yönetimi

Büyük dosyalarla (özellikle PDF'ler) çalışırken, tüm dosyaları sırayla bağlama ASLA okuma. Bunun yerine:

1. Önce dosyaları listele ve boyutlarını değerlendir
2. Dosyaları birer birer işle, yalnızca gereken bilgileri çıkar
3. Bir sonraki dosyaya geçmeden önce ara özetleri diske yaz
4. Görev çok sayıda büyük dosya içeriyorsa, başlamadan ÖNCE parçalı bir yaklaşım öner

## Dil Tercihi

Kullanıcı, Türkçe dil projelerinde çalışırken Türkçe iletişimi tercih eder. Yeni projelerin başında dil tercihini sorun.
