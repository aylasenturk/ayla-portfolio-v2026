# Ayla Senturk - Kisisel Portfolio

Ayla Senturk'un kisisel portfolio web sitesi. React, Next.js ve Tailwind CSS ile olusturulmustur.

## Teknolojiler

- **Framework:** Next.js 15 (App Router)
- **UI:** React 19 + TypeScript
- **Stil:** Tailwind CSS v4
- **Ikonlar:** Lucide React
- **Deploy:** Statik export (GitHub Pages / Vercel)

## Kurulum

```bash
# Bagimliliklari yukle
npm install

# Gelistirme sunucusunu baslat
npm run dev

# http://localhost:3000 adresinden eris
```

## Build & Deploy

```bash
# Statik site olustur
npm run build

# out/ klasorundeki dosyalar deploy edilebilir
```

## Proje Yapisi

```
src/
  app/                    # Next.js App Router sayfalari
    page.tsx              # Ana Sayfa
    layout.tsx            # Root Layout
    projeler/             # Projeler sayfasi
    makaleler/            # Makaleler sayfasi
    iletisim/             # Iletisim sayfasi
    ozgecmis/             # Ozgecmis sayfasi
    araclar/
      pomodoro/           # Pomodoro Zamanlayici
      gorev-takipcisi/    # Gorev Takipcisi
      tarih-secici/       # Tarih Secici
      sicaklik-donusturucu/ # Sicaklik Donusturucu
      yas-hesaplayici/    # Yas Hesaplayici
  components/
    layout/               # Sidebar, Navbar, Footer
    ui/                   # Yeniden kullanilabilir UI bilesenleri
  lib/                    # Yardimci fonksiyonlar ve veri
```

## Ozellikler

- WCAG 2.1 erisebilirlik standartlari
- Responsive tasarim (mobil uyumlu)
- Statik site generation (SSG) ile hizli yuklenme
- 5 interaktif uretkenlik araci
- TypeScript ile tip guvenligi

## Yapimci

**Ayla Senturk** - Bilgisayar Programcisi | Web Gelistirici

- GitHub: [@aylasenturk](https://github.com/aylasenturk)
- LinkedIn: [Ayla Senturk](https://www.linkedin.com/in/ayla-%C5%9Fent%C3%BCrk-9828163a9)

**Mentor:** Ogr. Gor. Dr. Ufuk Tanyeri

**Katkilar:** Enes Can Ak
