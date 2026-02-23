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
npm run dev       # Development server at localhost:3000
npm run build     # Static export build → out/ directory
npm run lint      # ESLint
npm start         # Serve production build (requires non-static server)
```

No test framework is configured.

## Architecture

This is a **static portfolio site** for Ayla Senturk, built with Next.js 15 App Router and configured for static export (`output: "export"` in next.config.ts). The `out/` directory contains the deployable static files.

### Tech Stack
- Next.js 15 (App Router, static export)
- React 19, TypeScript (strict mode)
- Tailwind CSS v4 (via `@tailwindcss/postcss` plugin)
- Lucide React for icons
- `clsx` for conditional classnames (utility: `cn()` in `src/lib/utils.ts`)

### Layout Architecture

The app uses a single client-side shell for all pages:

`layout.tsx` → `MainLayout` (client component) → `Sidebar` + `Navbar` + content + `Footer`

- **MainLayout** (`src/components/layout/MainLayout.tsx`): The `"use client"` wrapper that manages sidebar open/close state. All layout components live in `src/components/layout/`.
- **Navigation**: Defined centrally in `src/lib/navigation.ts` as `NavGroup[]`. Add new pages/tools here to have them appear in the sidebar.

### Two Types of Pages

1. **Content pages** (server components): `projeler`, `makaleler`, `iletisim`, `ozgecmis` — static data rendered at build time with `metadata` exports for SEO.
2. **Interactive tool pages** (`"use client"`): Under `src/app/araclar/` — Pomodoro, Gorev Takipcisi, Tarih Secici, Sicaklik Donusturucu, Yas Hesaplayici. These are self-contained client components with local state only (no shared state management).

### Design System

**Important**: The actual theme lives in `src/app/globals.css` using Tailwind v4's `@theme` directive — NOT in `tailwind.config.ts` (which contains a legacy config and is not the source of truth for colors).

Key CSS tokens defined in `@theme`:
- Colors: `primary-50` through `primary-900` (blue scale), `surface`, `surface-alt`, `surface-hover`, `text-primary`, `text-secondary`, `text-muted`, `border`, `border-light`
- Fonts: `--font-sans` (Inter), `--font-mono` (JetBrains Mono)

Reusable component classes defined in `@layer components` in globals.css:
- Layout: `.card`, `.card-header`, `.card-body`, `.card-footer`
- Buttons: `.btn`, `.btn-primary`, `.btn-outline`, `.btn-success`, `.btn-warning`, `.btn-danger`, `.btn-ghost`, `.btn-icon`
- Forms: `.input`, `.select`, `.label`
- Typography: `.badge` + variants (`-primary`, `-success`, `-warning`, `-info`, `-danger`, `-neutral`)
- Other: `.avatar` (+`-sm`, `-md`, `-lg`), `.progress-bar`, `.progress-fill`, `.page-header`

Use `PageHeader` component (`src/components/ui/PageHeader.tsx`) for page titles — it renders breadcrumb-style "Section / Title" headers.

### Path Alias

`@/*` maps to `./src/*` (configured in tsconfig.json).

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
