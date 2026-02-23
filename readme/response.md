# Yanıt: .NET'ten React'a Göç — Tamamlandı

Verilen geri bildirim doğrultusunda proje, ASP.NET Core MVC'den tamamen ayrıştırılarak modern bir frontend mimarisine taşındı. Aşağıda istenen her adımın nasıl karşılandığı özetlenmiştir.

---

## 1. Kurulum

> *İstenen: Vite ile yeni React projesi*

İstenildiği gibi **Vite** kullanılarak React projesi oluşturuldu.

```bash
npm create vite@latest ayla-portfolio --template react-ts
```

**Teknoloji yığını:** Vite 6, React 19, TypeScript 5.7, Tailwind CSS v4, react-router-dom 7, Lucide React

---

## 2. Varlıkları (Assets) Taşıma

> *İstenen: wwwroot → public veya src/assets*

- Görseller `public/img/` altına taşındı (avatarlar, proje görselleri vb.).
- Bootstrap ve jQuery **tamamen kaldırıldı**; yerine Tailwind CSS v4 kullanıldı.
- Sneat template'inin hazır CSS'leri yerine `src/index.css` içinde `@theme` direktifi ile özel bir tasarım sistemi oluşturuldu.

**İlgili dosya:** `src/index.css` — 13 renk değişkeni, 15+ bileşen sınıfı (.card, .btn-\*, .badge-\*, .input, .select)

---

## 3. Layout Dönüşümü

> *İstenen: ContentNavbarLayout.cshtml → MainLayout.jsx, Navbar.jsx, Sidebar.jsx*

| Eski (.NET)                          | Yeni (React/Vite)                            | Satır |
|--------------------------------------|----------------------------------------------|-------|
| `ContentNavbarLayout.cshtml`         | `src/components/layout/MainLayout.tsx`        | 45    |
| Navbar kısmı (partial view)          | `src/components/layout/Navbar.tsx`            | 65    |
| Sidebar kısmı (partial view)         | `src/components/layout/Sidebar.tsx`           | 96    |
| Footer kısmı                         | `src/components/layout/Footer.tsx`            | 47    |
| `_Layout.cshtml` (kök)              | `src/App.tsx` + `index.html`                  | 30+18 |

- Sayfa geçişleri için **react-router-dom v7** kullanıldı (istendiği gibi).
- Navigasyon yapısı `src/lib/navigation.ts` dosyasında merkezi olarak tanımlı; 3 grup, 10 link.
- Sidebar mobilde overlay ile açılıp kapanıyor, masaüstünde sabit.
- Navbar'da dark mode toggle butonu (Sun/Moon) ve sosyal medya linkleri mevcut.

---

## 4. Sayfaları Bileşenlere Bölme

> *İstenen: Her .cshtml → bir React Component*

| Eski (.NET View)                        | Yeni (React Sayfası)                                   |
|-----------------------------------------|---------------------------------------------------------|
| `Views/Portfolio/Index.cshtml`          | `src/pages/HomePage.tsx`                                |
| `Views/Portfolio/Projects.cshtml`       | `src/pages/ProjectsPage.tsx`                            |
| `Views/Portfolio/Articles.cshtml`       | `src/pages/ArticlesPage.tsx`                            |
| `Views/Portfolio/Contact.cshtml`        | `src/pages/ContactPage.tsx`                             |
| `Views/Portfolio/Resume.cshtml`         | `src/pages/ResumePage.tsx`                              |
| `Views/Tools/Pomodoro.cshtml`           | `src/pages/PomodoroPage.tsx`                            |
| `Views/Tools/TaskTracker.cshtml`        | `src/pages/TaskTrackerPage.tsx`                         |
| `Views/Tools/DatePicker.cshtml`         | `src/pages/DatePickerPage.tsx`                          |
| `Views/Tools/TempConverter.cshtml`      | `src/pages/TemperatureConverterPage.tsx`                |
| `Views/Tools/AgeCalculator.cshtml`      | `src/pages/AgeCalculatorPage.tsx`                       |

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

**Sonuç:** Proje %100 statik frontend uygulaması. `npm run build` komutu `dist/` dizinine saf HTML/CSS/JS çıktısı üretiyor. Herhangi bir statik hosting servisine (Vercel, Netlify, GitHub Pages) doğrudan deploy edilebilir.

---

## Ek Geliştirmeler (Görev Kapsamı Dışında)

Görevde istenenin ötesinde şu iyileştirmeler de yapıldı:

| Özellik                  | Açıklama                                                        |
|--------------------------|-----------------------------------------------------------------|
| **TypeScript**           | Tüm bileşenler tip güvenli (interface, type tanımları)          |
| **Tailwind CSS v4**      | Bootstrap yerine utility-first CSS; özel tasarım sistemi        |
| **Dark Mode**            | Manuel toggle, localStorage ile kalıcı, koyu lacivert tema      |
| **Responsive Tasarım**   | Mobil uyumlu sidebar overlay, tüm sayfalarda responsive grid    |
| **Erişilebilirlik**      | aria-label, aria-current, semantik HTML                         |

---

**Repo:** [github.com/aylasenturk/ayla-portfolio-v2026](https://github.com/aylasenturk/ayla-portfolio-v2026)
