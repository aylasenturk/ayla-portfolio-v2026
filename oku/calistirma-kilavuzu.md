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

Tarayıcıda açın: **http://localhost:3000**

Dosya değişiklikleri otomatik olarak yansır (Hot Reload).

## Üretim Derlemesi (Build)

```bash
npm run build
```

Bu komut `out/` dizinine statik HTML/CSS/JS dosyalarını oluşturur. Herhangi bir statik hosting servisine (Vercel, Netlify, GitHub Pages vb.) yüklenebilir.

## Lint (Kod Kontrolü)

```bash
npm run lint
```

ESLint ile kod kalitesi kontrolü yapar.

## Proje Yapısı (Özet)

```
src/
├── app/                    # Sayfalar (Next.js App Router)
│   ├── page.tsx            # Ana Sayfa
│   ├── layout.tsx          # Kök Layout
│   ├── globals.css         # Tema ve Tasarım Sistemi
│   ├── projeler/           # Projeler Sayfası
│   ├── makaleler/          # Makaleler Sayfası
│   ├── iletisim/           # İletişim Formu
│   ├── ozgecmis/           # Özgeçmiş (CV)
│   └── araclar/            # İnteraktif Araçlar
│       ├── pomodoro/       #   Pomodoro Zamanlayıcı
│       ├── gorev-takipcisi/#   Görev Takipçisi
│       ├── tarih-secici/   #   Tarih Seçici
│       ├── sicaklik-donusturucu/ # Sıcaklık Dönüştürücü
│       └── yas-hesaplayici/#   Yaş Hesaplayıcı
├── components/             # Yeniden Kullanılabilir Bileşenler
│   ├── layout/             #   MainLayout, Navbar, Sidebar, Footer
│   └── ui/                 #   PageHeader
└── lib/                    # Yardımcı Modüller
    └── navigation.ts       #   Navigasyon yapılandırması
```

## Teknoloji Yığını

| Teknoloji | Sürüm | Açıklama |
|-----------|-------|----------|
| Next.js | 15 | React framework (App Router, statik export) |
| React | 19 | UI kütüphanesi |
| TypeScript | 5.7 | Tip güvenliği |
| Tailwind CSS | 4 | Utility-first CSS framework |
| Lucide React | 0.468 | SVG ikon kütüphanesi |
| clsx | 2.1 | Koşullu CSS sınıf birleştirme |

## Notlar

- Proje `output: "export"` ile yapılandırılmıştır — sunucu tarafı kod çalışmaz, tamamen statik çıktı üretir.
- Tüm arayüz metinleri Türkçedir.
- Tasarım sistemi `src/app/globals.css` içindeki `@theme` direktifinde tanımlıdır (`tailwind.config.ts` değil).
