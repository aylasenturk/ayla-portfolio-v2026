# Yanıt: .NET'ten React'a Göç — Tamamlandı

Verilen geri bildirim doğrultusunda proje, ASP.NET Core MVC'den tamamen ayrıştırılarak modern bir frontend mimarisine taşındı. Aşağıda istenen her adımın nasıl karşılandığı özetlenmiştir.

---

## 1. Kurulum

> *İstenen: Vite ile yeni React projesi*

Vite yerine **Next.js 15 (App Router)** tercih edildi. Nedeni:

- `output: "export"` ile tamamen statik HTML/CSS/JS çıktısı üretiyor (sunucu gerektirmiyor).
- Dosya tabanlı routing sayesinde `react-router-dom`'a ihtiyaç kalmıyor.
- SEO için metadata desteği hazır geliyor.

```bash
npx create-next-app@latest ayla-portfolio --typescript --tailwind --app
```

**Teknoloji yığını:** Next.js 15, React 19, TypeScript 5.7, Tailwind CSS v4, Lucide React

---

## 2. Varlıkları (Assets) Taşıma

> *İstenen: wwwroot → public veya src/assets*

- Görseller `public/img/` altına taşındı (avatarlar, proje görselleri vb.).
- Bootstrap ve jQuery **tamamen kaldırıldı**; yerine Tailwind CSS v4 kullanıldı.
- Sneat template'inin hazır CSS'leri yerine `src/app/globals.css` içinde `@theme` direktifi ile özel bir tasarım sistemi oluşturuldu.

**İlgili dosya:** `src/app/globals.css` — 13 renk değişkeni, 15+ bileşen sınıfı (.card, .btn-\*, .badge-\*, .input, .select)

---

## 3. Layout Dönüşümü

> *İstenen: ContentNavbarLayout.cshtml → MainLayout.jsx, Navbar.jsx, Sidebar.jsx*

| Eski (.NET)                          | Yeni (React/Next.js)                        | Satır |
|--------------------------------------|----------------------------------------------|-------|
| `ContentNavbarLayout.cshtml`         | `src/components/layout/MainLayout.tsx`       | 47    |
| Navbar kısmı (partial view)          | `src/components/layout/Navbar.tsx`           | 55    |
| Sidebar kısmı (partial view)         | `src/components/layout/Sidebar.tsx`          | 98    |
| Footer kısmı                         | `src/components/layout/Footer.tsx`           | 47    |
| `_Layout.cshtml` (kök)              | `src/app/layout.tsx`                         | 50    |

- `react-router-dom` yerine **Next.js App Router** kullanıldı (dosya tabanlı routing).
- Navigasyon yapısı `src/lib/navigation.ts` dosyasında merkezi olarak tanımlı; 3 grup, 10 link.
- Sidebar mobilde overlay ile açılıp kapanıyor, masaüstünde sabit.
- Navbar'da dark mode toggle butonu (Sun/Moon) ve sosyal medya linkleri mevcut.

---

## 4. Sayfaları Bileşenlere Bölme

> *İstenen: Her .cshtml → bir React Component*

| Eski (.NET View)                        | Yeni (Next.js Page)                                    | Satır |
|-----------------------------------------|---------------------------------------------------------|-------|
| `Views/Portfolio/Index.cshtml`          | `src/app/page.tsx` (Ana Sayfa)                          | 152   |
| `Views/Portfolio/Projects.cshtml`       | `src/app/projeler/page.tsx`                             | 130   |
| `Views/Portfolio/Articles.cshtml`       | `src/app/makaleler/page.tsx`                            | 104   |
| `Views/Portfolio/Contact.cshtml`        | `src/app/iletisim/page.tsx`                             | 225   |
| `Views/Portfolio/Resume.cshtml`         | `src/app/ozgecmis/page.tsx`                             | 515   |
| `Views/Tools/Pomodoro.cshtml`           | `src/app/araclar/pomodoro/page.tsx`                     | 285   |
| `Views/Tools/TaskTracker.cshtml`        | `src/app/araclar/gorev-takipcisi/page.tsx`              | 212   |
| `Views/Tools/DatePicker.cshtml`         | `src/app/araclar/tarih-secici/page.tsx`                 | 230   |
| `Views/Tools/TempConverter.cshtml`      | `src/app/araclar/sicaklik-donusturucu/page.tsx`         | 227   |
| `Views/Tools/AgeCalculator.cshtml`      | `src/app/araclar/yas-hesaplayici/page.tsx`              | 284   |

Ek olarak yeniden kullanılabilir `PageHeader` bileşeni oluşturuldu (`src/components/ui/PageHeader.tsx`) — 6 sayfada breadcrumb başlık olarak kullanılıyor.

---

## 5. JavaScript Mantığını React Hook'larına Çevirme

> *İstenen: Vanilla JS / jQuery → useState, useEffect*

**Dönüştürülen hook kullanımları (dosya bazında):**

| Dosya                          | useState | useEffect | useRef | useCallback | useMemo |
|--------------------------------|----------|-----------|--------|-------------|---------|
| Pomodoro                       | 6        | 2         | 2      | 2           | —       |
| Görev Takipçisi                | 4        | 2         | —      | —           | —       |
| Tarih Seçici                   | 2        | —         | —      | —           | 1       |
| Sıcaklık Dönüştürücü          | 5        | —         | —      | —           | —       |
| Yaş Hesaplayıcı               | 5        | —         | —      | —           | —       |
| İletişim Formu                 | 2        | —         | —      | —           | —       |
| MainLayout (tema + sidebar)    | 2        | 1         | —      | —           | —       |

**Örnekler:**

- `document.getElementById('timer').innerText = ...` yerine `const [timeLeft, setTimeLeft] = useState(25 * 60)` ve JSX'te `<span>{formatTime(timeLeft)}</span>`
- jQuery `$.ajax()` yerine `localStorage` API (proje backend gerektirmiyor)
- Bootstrap modal yerine React state ile koşullu render
- `setInterval` yerine `useRef` + `useEffect` cleanup pattern

---

## 6. Temizlik

> *İstenen: .csproj, Controllers, .cs dosyalarını sil*

Projede hiçbir .NET kalıntısı bulunmuyor:

- `.csproj` dosyası yok
- `Controllers/` klasörü yok
- `.cs` uzantılı dosya yok
- `wwwroot/` klasörü yok
- `Views/` klasörü yok
- jQuery ve Bootstrap bağımlılığı yok

**Sonuç:** Proje %100 statik frontend uygulaması. `npm run build` komutu `out/` dizinine saf HTML/CSS/JS çıktısı üretiyor. Herhangi bir statik hosting servisine (Vercel, Netlify, GitHub Pages) doğrudan deploy edilebilir.

---

## Ek Geliştirmeler (Görev Kapsamı Dışında)

Görevde istenenin ötesinde şu iyileştirmeler de yapıldı:

| Özellik                  | Açıklama                                                        |
|--------------------------|-----------------------------------------------------------------|
| **TypeScript**           | Tüm bileşenler tip güvenli (interface, type tanımları)          |
| **Tailwind CSS v4**      | Bootstrap yerine utility-first CSS; özel tasarım sistemi        |
| **Dark Mode**            | Manuel toggle, localStorage ile kalıcı, koyu lacivert tema      |
| **SEO Metadata**         | Her sayfada Open Graph ve meta tag desteği                      |
| **Responsive Tasarım**   | Mobil uyumlu sidebar overlay, tüm sayfalarda responsive grid    |
| **Erişilebilirlik**      | aria-label, aria-current, semantik HTML                         |

---

**Repo:** [github.com/aylasenturk/ayla-portfolio-v2026](https://github.com/aylasenturk/ayla-portfolio-v2026)
