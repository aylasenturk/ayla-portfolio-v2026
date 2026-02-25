Markdown

```
# Yanıt: .NET'ten React'a Göç — Tamamlandı

Verilen geri bildirim doğrultusunda proje, ASP.NET Core MVC'den tamamen ayrıştırılarak %100 statik ve modern bir frontend mimarisine (Vite + React) taşındı. Aşağıda istenen her adımın ve uygulanan katı kuralların nasıl karşılandığı özetlenmiştir.

---

## 1. Kurulum ve Mimari Seçimi

> *İstenen: Vite ile yeni React projesi*

Orijinal görev dosyasına sadık kalınarak proje **Vite** kullanılarak oluşturuldu ve Next.js veya benzeri farklı bir mimariye sapılmadı. Geliştirme deneyimini ve kod kalitesini artırmak için TypeScript tercih edildi.

```bashnpm create vite@latest ayla-portfolio --template react-ts
```

**Teknoloji yığını:** Vite 6, React 19, TypeScript 5.7, Tailwind CSS v4, react-router-dom 7, Lucide React

---

## 2. Varlıkları (Assets) Taşıma

> *İstenen: wwwroot → public veya src/assets*

- Görseller ve ikonlar `public/img/` altına taşındı.

- Eski mimarinin Bootstrap ve jQuery bağımlılıkları **tamamen kaldırıldı**. Yerine modern Utility-first yaklaşımı olan Tailwind CSS v4 entegre edildi.

---

## 3. Layout Dönüşümü

> *İstenen: ContentNavbarLayout -> MainLayout ve react-router-dom entegrasyonu*

- Eski MVC layout yapısı terk edildi. Sayfa geçişleri için `react-router-dom` kurularak `App.tsx` içerisinde sayfa yönlendirmeleri yapılandırıldı.

- Navbar ve Sidebar gibi bileşenler `MainLayout.tsx` içerisine modüler olarak bölündü.

---

## 4. Kapsam Daraltma ve Sayfa Bileşenleri (En Önemli Kriter)

> *İstenen: SADECE KİŞİSEL PORTFOLYO sayfalarına odaklanılacak.*

Görev dosyasındaki "Yönetim paneli kılığından kurtulma" ve "Sadece portfolyoya odaklanma" kuralı harfiyen uygulandı.

- **Silinenler:** Portfolyo amacından sapan "Tarih Seçici", "Yaş Hesaplayıcı" ve "Sıcaklık Dönüştürücü" gibi araç sayfaları projeden tamamen silinerek odak netleştirildi.

- **Kalanlar:** Sadece `Home`, `Projects`, `Articles`, `Contact`, `Resume` sayfaları ile yetenek gösterimi (Showcase) amacıyla `Pomodoro` ve `TaskTracker` araçları tutuldu.

---

## 5. JavaScript Mantığını React Hook'larına Çevirme (Clean Code)

> *İstenen: Vanilla JS kodlarını React useState ve useEffect yapılarına çevirme*

Projede sadece Hook dönüşümü yapılmakla kalınmadı, aynı zamanda "Separation of Concerns" (İlgi Alanlarının Ayrılması) prensibine uyularak **Custom Hooks** mimarisi uygulandı:

- **`usePomodoro.ts`:** Pomodoro sayfasındaki zamanlayıcı, state yönetimi ve ses çalma mantığı (Business Logic) UI bileşeninden koparılarak ayrı bir Hook'a taşındı.

- **`useTaskTracker.ts`:** Görev takipçisi sayfasındaki ekleme, silme ve filtreleme işlemleri ayrı bir Hook içerisine alınarak `TaskTrackerPage.tsx` bileşeni tamamen sadeleştirildi.

---

## 6. Erişilebilirlik (A11y / ARIA) ve Kod Standartları Düzeltmeleri

Linter ve Axe erişilebilirlik araçlarından gelen uyarılar doğrultusunda şu best-practice uygulamaları yapıldı:

- **ARIA Standartları:** `TaskTracker` sayfasındaki `aria-pressed` gibi özelliklere doğrudan boolean yerine string ifadeler (`? "true" : "false"`) geçilerek ekran okuyucular (Screen Readers) için tam uyumluluk sağlandı.

- **Satır İçi CSS Temizliği:** `ResumePage.tsx` sayfasındaki yetenek barlarında bulunan satır içi (inline) CSS'ler temizlendi. Yerine Tailwind'in Arbitrary Values (`w-[${skill.level}%]`) yapısı kullanıldı.

---

## 7. Temizlik

> *İstenen: .csproj, Controllers, .cs dosyalarını sil*

Projede hiçbir .NET kalıntısı bırakılmadı:

- `.csproj`, `Controllers/`, `.cs`, `wwwroot/`, `Views/` tamamen silindi.

**Sonuç:** Proje %100 statik SPA (Single Page Application) uygulamasıdır. `npm run build` komutu `dist/` dizinine saf HTML/CSS/JS çıktısı üretir ve Vercel, Netlify, GitHub Pages gibi platformlara anında deploy edilebilir.