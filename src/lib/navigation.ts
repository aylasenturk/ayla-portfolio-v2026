import {
  Home,
  FolderOpen,
  BookOpen,
  Mail,
  User,
  Timer,
  ListChecks,
  Network,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export const navigation: NavGroup[] = [
  {
    title: "Portfolio",
    items: [
      { label: "Ana Sayfa", href: "/", icon: Home },
      { label: "Projeler", href: "/projeler", icon: FolderOpen },
      { label: "Makaleler", href: "/makaleler", icon: BookOpen },
      { label: "İletişim", href: "/iletisim", icon: Mail },
      { label: "Özgeçmiş", href: "/ozgecmis", icon: User },
    ],
  },
  {
    title: "Üretkenlik Araçları",
    items: [
      { label: "Pomodoro Zamanlayıcı", href: "/tools/pomodoro", icon: Timer },
      { label: "Görev Takipçisi", href: "/tools/task-tracker", icon: ListChecks },
      { label: "Kod Haritası", href: "/tools/code-map", icon: Network },
    ],
  },
];
