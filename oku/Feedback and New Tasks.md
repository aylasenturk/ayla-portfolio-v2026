# Feedback ve Yeni Görev: .NET'ten React'a Göç

Öncelikle eline sağlık. Hazırladığın portfolyo projesini inceledim. Görsel olarak hazır bir template (Sneat) üzerinden gitmen, hızlı bir MVP (Minimum Viable Product) çıkarmak için kabul edilebilir bir strateji. Ancak teknik açıdan büyük bir mimari uyumsuzluk var:

> **Tespit:** Projenin "Backend" kısmı (ASP.NET Core MVC) neredeyse hiç kullanılmıyor. Sadece HTML sayfalarını (View) sunmak için koca bir sunucu mimarisini ayağa kaldırıyoruz. Oysa içindeki tüm mantık (Pomodoro, hesaplamalar vb.) zaten tarayıcıda (Client-side JS) çalışıyor. Bu projeyi Modern Frontend Mimarisine uygun hale getirmek için yeni görevin: **Projeyi Tamamen React'a Çevirmek.**

---

## Hedef ve Kapsam: Sadece Kişisel Portfolyo

Backend (C#/.NET) katmanını tamamen çöpe atmak ve projeyi %100 Static Web App / SPA haline getirmek.

**Önemli Not:** Bu dönüşümde SADECE KİŞİSEL PORTFOLYO sayfalarına odaklanacağız.

- **Admin Paneli Özellikleri:** Login, Register, Dashboard, Analytics gibi şablondan gelen gereksiz sayfaları taşımıyoruz.
- **Odak Noktası:** Ana Sayfa, Hakkımda, Projelerim, İletişim, Blog (varsa) ve CV sayfası.
- **Amacımız:** "Yönetim Paneli" kılığından kurtulup, temiz ve hızlı bir "Kişisel Web Sitesi" ortaya çıkarmak.

---

## Zorluk Derecesi: Orta

**Neden zor değil?**
- Çünkü zaten karmaşık bir Backend mantığın, veritabanı sorguların yok.
- Mevcut JavaScript kodlarını React component'leri içine taşıyacaksın.

**Neden kolay da değil?**
- jQuery ve Bootstrap bağımlılıklarını React mantığına (State/Props) çevirmen gerekecek.
- `_Layout.cshtml` yapısını React Router ve Layout Component yapısına dönüştürmelisin.
- Gereksiz "Admin Template" kodlarını temizleyip sadece ihtiyacın olan CSS'leri almalısın.

---

## Adım Adım Yol Haritası

### 1. Kurulum

Yeni bir React projesi oluştur (Vite kullanarak).

```bash
npm create vite@latest ayla-portfolio --template react
```

### 2. Varlıkları (Assets) Taşıma

- Mevcut projedeki `wwwroot` klasöründeki CSS, Resimler ve JS kütüphanelerini React projesinin `public` veya `src/assets` klasörüne taşı.
- **Dikkat:** Script tag'lerini `index.html`'e hemen yapıştırma, React içinde import etmeye çalışacağız.

### 3. Layout Dönüşümü

- `ContentNavbarLayout.cshtml` dosyasını `MainLayout.jsx` bileşenine çevir.
- Navbar ve Sidebar'ı ayrı bileşenler (`Navbar.jsx`, `Sidebar.jsx`) yap.
- Sayfa geçişleri için `react-router-dom` kur.

### 4. Sayfaları Bileşenlere (Component) Bölme

Her bir `.cshtml` dosyan bir React Component olacak.

| Eski (.NET)                        | Yeni (React)                  |
|------------------------------------|-------------------------------|
| `Views/Portfolio/Index.cshtml`     | `src/pages/Home.jsx`          |
| `Views/Tools/Pomodoro.cshtml`      | `src/pages/tools/Pomodoro.jsx`|

### 5. JavaScript Mantığını React Hook'larına Çevirme (EN ONEMLI KISIM)

Şu an `Pomodoro.cshtml` içinde `<script>` etiketleri arasında duran kodları React'ın `useState` ve `useEffect` yapılarına çevirmelisin.

**Eski (Vanilla JS):**

```javascript
let workTime = 25;
function updateDisplay() { document.getElementById('timer').innerText = workTime; }
```

**Yeni (React):**

```jsx
const [workTime, setWorkTime] = useState(25);
// updateDisplay'e gerek yok, React state değişince otomatik render eder.
<div>{workTime}</div>
```

### 6. Temizlik

- `.csproj`, `Controllers` klasörü ve `.cs` dosyalarını tamamen sil. Sadece React projesi kalsın.

---

**Beklentim:** Haftaya C# kodu kalmamış, tamamen tarayıcıda çalışan, modern ve hızlı bir React uygulaması görmek istiyorum. Kolay gelsin!
