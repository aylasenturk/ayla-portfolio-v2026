// ── Dosya Detay Verileri ──
// Her kaynak dosyanin export, aciklama, state, fonksiyon, hook bilgileri
const fileDetails = {
  "src/main.tsx": {
    export: "- (Giris noktasi)",
    desc: "Uygulama giris noktasi - StrictMode, BrowserRouter, root render",
    consts: [],
    state: [], fns: [], types: [], hooks: [],
    meta: "ReactDOM.createRoot | BrowserRouter wrapper"
  },
  "src/App.tsx": {
    export: "App",
    desc: "Rota tanimlari - 10 sayfa icin Routes/Route yapisi",
    consts: [],
    state: [], fns: [], types: [], hooks: [],
    meta: "react-router-dom Routes | MainLayout wrapper"
  },
  "src/index.css": {
    export: "-",
    desc: "Tema & Tasarim Sistemi",
    consts: ["@theme: primary-50..900, surface, text-*", "@layer components: .card, .btn-*, .badge-*, .input, .select, .avatar, .progress-bar", "html[data-theme='dark']: koyu tema override"],
    state: [], fns: [], types: [], hooks: [],
    meta: "Tailwind CSS v4 | @import 'tailwindcss' | Dark mode degiskenleri"
  },
  "src/pages/HomePage.tsx": {
    export: "HomePage",
    desc: "Ana Sayfa - Hos geldiniz, hizli erisim kartlari, ozellik tanitimi",
    consts: ["quickAccessCards (3 kart)", "features (6 ozellik)"],
    state: [], fns: [], types: [], hooks: [],
    meta: "Link (react-router-dom)"
  },
  "src/pages/ProjectsPage.tsx": {
    export: "ProjectsPage",
    desc: "Projeler Sayfasi - 6 proje karti",
    consts: ["projects (6 proje nesnesi: title, desc, tags, icon, color)"],
    state: [], fns: [], types: [], hooks: [],
    meta: "PageHeader bileseni"
  },
  "src/pages/ArticlesPage.tsx": {
    export: "ArticlesPage",
    desc: "Makaleler Sayfasi - 4 makale karti",
    consts: ["articles (4 makale: title, date, desc, tags, icon)"],
    state: [], fns: [], types: [], hooks: [],
    meta: "PageHeader bileseni"
  },
  "src/pages/ContactPage.tsx": {
    export: "ContactPage",
    desc: "Iletisim Formu - form + localStorage kayit + sosyal linkler",
    consts: ["initialFormData", "contactInfo (3 bilgi)", "socialLinks (4 link)"],
    state: ["formData: ContactFormData = initialFormData", "showSuccess: boolean = false"],
    fns: ["handleSubmit(e) - localStorage'a kaydet", "handleChange(field, value) - form alani guncelle"],
    types: ["ContactFormData {name, email, subject, message}"],
    hooks: ["useState (2)"],
    meta: "Form yonetimi | localStorage"
  },
  "src/pages/ResumePage.tsx": {
    export: "ResumePage",
    desc: "Ozgecmis (CV) - Profil, beceriler, egitim, deneyim, projeler",
    consts: ["webSkills (3)", "backendSkills (3)", "dbSkills (3)", "programmingSkills (3)", "courses (12 ders)"],
    state: [],
    fns: ["SkillSection({title, icon, skills, note}) - beceri cubugu bileseni"],
    types: ["SkillBar {name, level, label}"],
    hooks: [],
    meta: "En buyuk dosya (483 satir) | img etiketi"
  },
  "src/pages/PomodoroPage.tsx": {
    export: "PomodoroPage",
    desc: "Pomodoro Zamanlayici - calisma/mola dongusu, ses bildirimi",
    consts: ["MODE_LABELS {work, shortBreak, longBreak}", "MODE_COLORS", "DEFAULT_SETTINGS {25dk, 5dk, 15dk}"],
    state: ["settings: TimerSettings = DEFAULT_SETTINGS", "timeLeft: number = 25*60", "isRunning: boolean = false", "mode: TimerMode = 'work'", "sessionCount: number = 0", "showToast: boolean = false"],
    fns: ["formatTime(s) - MM:SS", "handleStart()", "handlePause()", "handleReset()", "handleApplySettings()"],
    types: ["TimerMode = 'work'|'shortBreak'|'longBreak'", "TimerSettings {workMinutes, shortBreakMinutes, longBreakMinutes}"],
    hooks: ["useState (6)", "useRef (2): intervalRef, audioRef", "useEffect (2): ses yukleme, zamanlayici", "useCallback (2): getTimeForMode, switchToNextSession"],
    meta: "En cok hook kullanan dosya (12 hook)"
  },
  "src/pages/TaskTrackerPage.tsx": {
    export: "TaskTrackerPage",
    desc: "Gorev Takipcisi - CRUD + localStorage + filtre",
    consts: ["STORAGE_KEY = 'tasks'", "filters [{all, todo, done}]"],
    state: ["tasks: Task[] = []", "input: string = ''", "filter: FilterType = 'all'", "isLoaded: boolean = false"],
    fns: ["loadTasks() - localStorage'dan yukle", "saveTasks(tasks) - localStorage'a kaydet", "addTask() - UUID ile yeni gorev", "toggleTask(id) - todo/done degistir", "removeTask(id) - gorev sil"],
    types: ["Task {id, title, status: 'todo'|'done'}", "FilterType = 'all'|'todo'|'done'"],
    hooks: ["useState (4)", "useEffect (2): yukle + kaydet"],
    meta: "crypto.randomUUID() | localStorage"
  },
  "src/pages/DatePickerPage.tsx": {
    export: "DatePickerPage",
    desc: "Tarih Secici - takvim gorunumu + format donusturme",
    consts: ["MONTH_NAMES (12 ay)", "DAY_NAMES (7 gun)", "DAY_HEADERS (kisaltma)"],
    state: ["currentDate: Date = new Date()", "selectedDate: Date = new Date()"],
    fns: ["getCalendarDays(year, month, selected) - takvim gunleri olustur", "goToPrevMonth()", "goToNextMonth()", "selectDay(date)"],
    types: ["CalendarDay {day, isCurrentMonth, isToday, isSelected, date}"],
    hooks: ["useState (2)", "useMemo (1): calendarDays hesaplama"],
    meta: "ISO/TR/Unix format donusumu"
  },
  "src/pages/TemperatureConverterPage.tsx": {
    export: "TemperatureConverterPage",
    desc: "Sicaklik Donusturucu - C/F/K arasi cevrim",
    consts: ["UNIT_LABELS", "UNIT_SYMBOLS", "REFERENCE_DATA (4 referans)", "FORMULAS (4 formul)"],
    state: ["inputValue: string = ''", "fromUnit: Unit = 'celsius'", "toUnit: Unit = 'fahrenheit'", "result: {value, unit}|null", "error: string = ''"],
    fns: ["convertTemperature(value, from, to) - Celsius uzerinden cevir", "handleConvert()"],
    types: ["Unit = 'celsius'|'fahrenheit'|'kelvin'"],
    hooks: ["useState (5)"],
    meta: "Enter ile hesaplama"
  },
  "src/pages/AgeCalculatorPage.tsx": {
    export: "AgeCalculatorPage",
    desc: "Yas Hesaplayici - yas + burc + dogum gunu sayaci",
    consts: ["MONTH_NAMES (12)", "ZODIAC_SIGNS (12 burc)", "currentYear", "dayOptions (1-31)", "yearOptions (1900-now)"],
    state: ["day: string = ''", "month: string = ''", "year: string = ''", "result: AgeResult|null", "error: string = ''"],
    fns: ["getZodiacSign(month, day) - burc belirle", "calculateAge(d, m, y) - detayli yas hesapla", "handleCalculate()"],
    types: ["AgeResult {years, months, days, totalDays, totalWeeks, totalMonths, daysUntilBirthday, zodiac}"],
    hooks: ["useState (5)"],
    meta: "Sonraki dogum gunune geri sayim"
  },
  "src/components/layout/MainLayout.tsx": {
    export: "MainLayout",
    desc: "Ana kabuk - Sidebar + Navbar + icerik + Footer",
    consts: [],
    state: ["sidebarOpen: boolean = false", "theme: 'light' | 'dark' = 'light'"],
    fns: ["toggleTheme() - light/dark gecisi + localStorage"],
    types: ["MainLayoutProps {children: React.ReactNode}"],
    hooks: ["useState (2)", "useEffect (1): tema yukleme"],
    meta: "Sidebar + Dark mode yonetimi"
  },
  "src/components/layout/Navbar.tsx": {
    export: "Navbar",
    desc: "Ust navigasyon - menu butonu + tema toggle + sosyal medya",
    consts: [],
    state: [],
    fns: [],
    types: ["NavbarProps {onMenuToggle, theme, onThemeToggle}"],
    hooks: [],
    meta: "Sun/Moon toggle | Props ile sidebar + tema tetikleme"
  },
  "src/components/layout/Sidebar.tsx": {
    export: "Sidebar",
    desc: "Yan menu - NavGroup'lardan dinamik menu olusturur",
    consts: [],
    state: [],
    fns: [],
    types: ["SidebarProps {isOpen: boolean, onClose: () => void}"],
    hooks: ["useLocation (react-router-dom)"],
    meta: "Aktif sayfa vurgulama | navigation.ts'den veri alir"
  },
  "src/components/layout/Footer.tsx": {
    export: "Footer",
    desc: "Alt bilgi - telif hakki + yil",
    consts: ["currentYear"],
    state: [], fns: [], types: [], hooks: [],
    meta: "Statik bilesen"
  },
  "src/components/ui/PageHeader.tsx": {
    export: "PageHeader",
    desc: "Breadcrumb baslik - 'Bolum / Baslik' formatinda",
    consts: [],
    state: [], fns: [], types: ["PageHeaderProps {section, title, className?}"],
    hooks: [],
    meta: "6 sayfada kullaniliyor"
  },
  "src/lib/navigation.ts": {
    export: "navigation, NavItem, NavGroup",
    desc: "Merkezi navigasyon yapisi - sidebar menusunu besler",
    consts: ["navigation (3 grup: Portfolio, Uretkenlik, Hesaplayicilar)"],
    state: [], fns: [],
    types: ["NavItem {label, href, icon: LucideIcon}", "NavGroup {title, items: NavItem[]}"],
    hooks: [],
    meta: "Yeni sayfa eklemek icin bu dosyayi duzenle"
  }
};

// ── Agac Verisi ──
// Proje dosya yapisi (src/ dizini)
const data = {
  name: "src",
  children: [
    { name: "main.tsx", desc: "Giris noktasi", lines: 13, type: "config" },
    { name: "App.tsx", desc: "Rota tanimlari", lines: 31, type: "config" },
    { name: "index.css", desc: "Tema & Tasarim Sistemi", lines: 226, type: "style" },
    { name: "vite-env.d.ts", desc: "Vite tip bildirimi", lines: 1, type: "config" },
    {
      name: "pages",
      children: [
        { name: "HomePage.tsx", desc: "Ana Sayfa", lines: 147, type: "page" },
        { name: "ProjectsPage.tsx", desc: "Projeler", lines: 125, type: "page" },
        { name: "ArticlesPage.tsx", desc: "Makaleler", lines: 99, type: "page" },
        { name: "ContactPage.tsx", desc: "Iletisim Formu (2 state)", lines: 223, type: "page" },
        { name: "ResumePage.tsx", desc: "Ozgecmis/CV (5 const)", lines: 483, type: "page" },
        { name: "PomodoroPage.tsx", desc: "Pomodoro (6 state, 12 hook)", lines: 277, type: "page" },
        { name: "TaskTrackerPage.tsx", desc: "Gorev Takipci (4 state, 5 fn)", lines: 207, type: "page" },
        { name: "DatePickerPage.tsx", desc: "Tarih Secici (2 state, useMemo)", lines: 222, type: "page" },
        { name: "TemperatureConverterPage.tsx", desc: "Sicaklik (5 state, 4 const)", lines: 221, type: "page" },
        { name: "AgeCalculatorPage.tsx", desc: "Yas Hesap (5 state, 12 burc)", lines: 280, type: "page" }
      ]
    },
    {
      name: "components",
      children: [
        { name: "layout", children: [
          { name: "MainLayout.tsx", desc: "Ana kabuk (2 state)", lines: 45, type: "component" },
          { name: "Navbar.tsx", desc: "Ust nav + tema toggle", lines: 65, type: "component" },
          { name: "Sidebar.tsx", desc: "Yan menu (useLocation)", lines: 95, type: "component" },
          { name: "Footer.tsx", desc: "Alt bilgi", lines: 47, type: "component" }
        ]},
        { name: "ui", children: [
          { name: "PageHeader.tsx", desc: "Breadcrumb baslik", lines: 16, type: "component" }
        ]}
      ]
    },
    {
      name: "lib",
      children: [
        { name: "navigation.ts", desc: "NavGroup[] (3 grup, 10 link)", lines: 52, type: "config" }
      ]
    }
  ]
};

// ── Tip Renkleri ──
const typeColors = {
  page: "#a78bfa",
  component: "#34d399",
  config: "#fbbf24",
  style: "#f472b6",
  folder: "var(--accent)"
};
