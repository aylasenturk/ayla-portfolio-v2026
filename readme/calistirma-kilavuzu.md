# Projeyi Çalıştırma Kılavuzu

## Gereksinimler

- **Node.js** 18.17 veya üzeri ([nodejs.org](https://nodejs.org))
- **npm** (Node.js ile birlikte gelir)

## Kurulum

Projeyi klonlayın ve bağımlılıkları yükleyin:

```bash
git clone https://github.com/aylasenturk/ayla-portfolio-v2026.git
cd ayla-portfolio-v2026
npm install
```

## Geliştirme Sunucusu

```bash
npm run dev
```

Tarayıcıda açın: **http://localhost:port_number**

Dosya değişiklikleri otomatik olarak yansır (Vite HMR — Hot Module Replacement).

## Üretim Derlemesi (Build)

```bash
npm run build
```

Bu komut önce TypeScript tip kontrolü (`tsc --noEmit`) yapar, ardından `dist/` dizinine statik HTML/CSS/JS dosyalarını oluşturur. Herhangi bir statik hosting servisine (Vercel, Netlify, GitHub Pages vb.) yüklenebilir.

## Önizleme (Build Sonrası)

```bash
npm run preview
```

`dist/` dizinindeki build çıktısını yerel sunucuda önizler.

## Proje Yapısı (Özet)

```
src/
├── main.tsx               # Uygulama giriş noktası (ReactDOM, BrowserRouter)
├── App.tsx                # Rota tanımları (react-router-dom Routes)
├── index.css              # Tema ve Tasarım Sistemi (Tailwind CSS v4)
├── vite-env.d.ts          # Vite tip bildirimi
├── pages/                 # Sayfa bileşenleri
│   ├── HomePage.tsx       #   Ana Sayfa
│   ├── ProjectsPage.tsx   #   Projeler
│   ├── ArticlesPage.tsx   #   Makaleler
│   ├── ContactPage.tsx    #   İletişim Formu
│   ├── ResumePage.tsx     #   Özgeçmiş (CV)
│   ├── PomodoroPage.tsx   #   Pomodoro Zamanlayıcı
│   ├── TaskTrackerPage.tsx#   Görev Takipçisi
│   ├── DatePickerPage.tsx #   Tarih Seçici
│   ├── TemperatureConverterPage.tsx # Sıcaklık Dönüştürücü
│   └── AgeCalculatorPage.tsx #  Yaş Hesaplayıcı
├── components/            # Yeniden Kullanılabilir Bileşenler
│   ├── layout/            #   MainLayout, Navbar, Sidebar, Footer
│   └── ui/                #   PageHeader
└── lib/                   # Yardımcı Modüller
    └── navigation.ts      #   Navigasyon yapılandırması
```

## Teknoloji Yığını

| Teknoloji | Sürüm | Açıklama |
|-----------|-------|----------|
| Vite | 6 | Hızlı geliştirme sunucusu ve build aracı |
| React | 19 | UI kütüphanesi |
| TypeScript | 5.7 | Tip güvenliği |
| react-router-dom | 7 | İstemci taraflı yönlendirme (SPA) |
| Tailwind CSS | 4 | Utility-first CSS framework |
| Lucide React | 0.468 | SVG ikon kütüphanesi |
| clsx | 2.1 | Koşullu CSS sınıf birleştirme |

## Notlar

- Proje %100 statik SPA'dır — sunucu tarafı kod çalışmaz, `dist/` dizinine saf HTML/CSS/JS üretir.
- Tüm arayüz metinleri Türkçedir.
- Tasarım sistemi `src/index.css` içindeki `@theme` direktifinde tanımlıdır.
- Dark mode, `html[data-theme="dark"]` ile CSS değişken override'ları kullanır, tercih `localStorage`'da saklanır.
- Path alias: `@/*` → `./src/*` (hem `tsconfig.json` hem `vite.config.ts`'de tanımlı).
