// ── Dosya Detay Verileri ──
const fileDetails = {
  "src/main.tsx": { export: "- (Giriş noktası)", desc: "Uygulama giriş noktası", consts: [], state: [], fns: [], types: [], hooks: [] },
  "src/App.tsx": { export: "App", desc: "Rota tanımları", consts: [], state: [], fns: [], types: [], hooks: [] },
  "src/index.css": { export: "-", desc: "Tema & Tasarım Sistemi", consts: ["@theme"], state: [], fns: [], types: [], hooks: [] },
  "src/pages/HomePage.tsx": { export: "HomePage", desc: "Ana Sayfa", consts: ["quickAccessCards", "features"], state: [], fns: [], types: [], hooks: [] },
  "src/pages/ProjectsPage.tsx": { export: "ProjectsPage", desc: "Projeler Sayfası", consts: ["projects"], state: [], fns: [], types: [], hooks: [] },
  "src/pages/ArticlesPage.tsx": { export: "ArticlesPage", desc: "Makaleler Sayfası", consts: ["articles"], state: [], fns: [], types: [], hooks: [] },
  "src/pages/ContactPage.tsx": { export: "ContactPage", desc: "İletişim Formu", consts: ["initialFormData", "contactInfo", "socialLinks"], state: ["formData", "showSuccess"], fns: ["handleSubmit", "handleChange"], types: ["ContactFormData"], hooks: ["useState"] },
  "src/pages/ResumePage.tsx": { export: "ResumePage", desc: "Özgeçmiş (CV)", consts: ["webSkills", "backendSkills", "dbSkills", "programmingSkills", "courses"], state: [], fns: ["SkillSection"], types: ["SkillBar"], hooks: [] },
  "src/pages/PomodoroPage.tsx": { export: "PomodoroPage", desc: "Pomodoro Arayüzü", consts: [], state: [], fns: [], types: [], hooks: ["usePomodoro"] },
  "src/pages/TaskTrackerPage.tsx": { export: "TaskTrackerPage", desc: "Görev Takipçi Arayüzü", consts: ["FILTERS"], state: [], fns: [], types: [], hooks: ["useTaskTracker", "useMemo"] },
  "src/hooks/usePomodoro.ts": { export: "usePomodoro", desc: "Zamanlayıcı İş Mantığı", consts: ["MODE_LABELS", "MODE_COLORS", "DEFAULT_SETTINGS"], state: ["settings", "timeLeft", "isRunning", "mode", "sessionCount", "showToast"], fns: ["handleStart", "handlePause", "handleReset", "handleApplySettings", "switchToNextSession"], types: ["TimerMode", "TimerSettings", "PomodoroState"], hooks: ["useState", "useRef", "useEffect", "useCallback"] },
  "src/hooks/useTaskTracker.ts": { export: "useTaskTracker", desc: "Görev CRUD Mantığı", consts: ["STORAGE_KEY"], state: ["tasks", "input", "filter"], fns: ["addTask", "toggleTask", "removeTask"], types: ["Task", "FilterType"], hooks: ["useState", "useEffect"] },
  "src/components/layout/MainLayout.tsx": { export: "MainLayout", desc: "Ana kabuk", consts: [], state: ["sidebarOpen", "theme"], fns: ["toggleTheme"], types: ["MainLayoutProps"], hooks: ["useState", "useEffect"] },
  "src/components/layout/Navbar.tsx": { export: "Navbar", desc: "Üst navigasyon", consts: [], state: [], fns: [], types: ["NavbarProps"], hooks: [] },
  "src/components/layout/Sidebar.tsx": { export: "Sidebar", desc: "Yan menü", consts: [], state: [], fns: [], types: ["SidebarProps"], hooks: ["useLocation"] },
  "src/components/layout/Footer.tsx": { export: "Footer", desc: "Alt bilgi", consts: ["currentYear"], state: [], fns: [], types: [], hooks: [] },
  "src/components/ui/PageHeader.tsx": { export: "PageHeader", desc: "Breadcrumb başlık", consts: [], state: [], fns: [], types: ["PageHeaderProps"], hooks: [] },
  "src/lib/navigation.ts": { export: "navigation", desc: "Merkezi navigasyon", consts: ["navigation"], state: [], fns: [], types: ["NavItem", "NavGroup"], hooks: [] }
};

// ── Ağaç Verisi ──
const data = {
  name: "src",
  children: [
    { name: "main.tsx", desc: "Giriş noktası", lines: 13, type: "config" },
    { name: "App.tsx", desc: "Rota tanımları", lines: 31, type: "config" },
    { name: "index.css", desc: "Tema Sistemi", lines: 226, type: "style" },
    {
      name: "pages",
      children: [
        { name: "HomePage.tsx", desc: "Ana Sayfa", lines: 147, type: "page" },
        { name: "ProjectsPage.tsx", desc: "Projeler", lines: 125, type: "page" },
        { name: "ArticlesPage.tsx", desc: "Makaleler", lines: 99, type: "page" },
        { name: "ContactPage.tsx", desc: "İletişim", lines: 223, type: "page" },
        { name: "ResumePage.tsx", desc: "Özgeçmiş", lines: 483, type: "page" },
        { name: "PomodoroPage.tsx", desc: "Pomodoro UI", lines: 150, type: "page" },
        { name: "TaskTrackerPage.tsx", desc: "Görev UI", lines: 120, type: "page" }
      ]
    },
    {
      name: "hooks",
      children: [
        { name: "usePomodoro.ts", desc: "Pomodoro Logic", lines: 120, type: "component" },
        { name: "useTaskTracker.ts", desc: "Task Logic", lines: 80, type: "component" }
      ]
    },
    {
      name: "components",
      children: [
        { name: "layout", children: [
          { name: "MainLayout.tsx", lines: 45, type: "component" },
          { name: "Navbar.tsx", lines: 65, type: "component" },
          { name: "Sidebar.tsx", lines: 95, type: "component" },
          { name: "Footer.tsx", lines: 47, type: "component" }
        ]},
        { name: "ui", children: [ { name: "PageHeader.tsx", lines: 16, type: "component" } ]}
      ]
    },
    { name: "lib", children: [ { name: "navigation.ts", lines: 52, type: "config" } ] }
  ]
};

const typeColors = { page: "#a78bfa", component: "#34d399", config: "#fbbf24", style: "#f472b6", folder: "var(--accent)" };