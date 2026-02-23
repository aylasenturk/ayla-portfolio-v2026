"use client";

import { useState, type FormEvent } from "react";
import {
  Send,
  MapPin,
  Mail,
  Phone,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  CheckCircle,
} from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const initialFormData: ContactFormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const contactInfo = [
  { icon: MapPin, label: "Konum", value: "Çankaya, Ankara", color: "bg-primary-100 text-primary-600" },
  { icon: Mail, label: "E-posta", value: "ayla.senturk35@gmail.com", color: "bg-emerald-100 text-emerald-600" },
  { icon: Phone, label: "Telefon", value: "0553 153 75 88", color: "bg-cyan-100 text-cyan-600" },
];

const socialLinks = [
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/ayla-%C5%9Fent%C3%BCrk-9828163a9", color: "text-blue-600 hover:bg-blue-50" },
  { icon: Github, label: "GitHub", href: "https://github.com/aylasenturk", color: "text-slate-700 hover:bg-slate-50" },
  { icon: Twitter, label: "X", href: "https://x.com/SenturkAyl60453", color: "text-sky-500 hover:bg-sky-50" },
  { icon: Instagram, label: "Instagram", href: "#", color: "text-pink-600 hover:bg-pink-50" },
];

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [showSuccess, setShowSuccess] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const entry = {
      ...formData,
      date: new Date().toISOString(),
    };

    const messages = JSON.parse(localStorage.getItem("contactMessages") || "[]");
    messages.push(entry);
    localStorage.setItem("contactMessages", JSON.stringify(messages));

    setShowSuccess(true);
    setFormData(initialFormData);

    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  }

  function handleChange(field: keyof ContactFormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <div>
      <PageHeader section="Portfolio" title="İletişim" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="card-header">
              <h2 className="text-base font-semibold">Benimle İletişime Geçin</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit} aria-labelledby="contact-heading">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="name" className="label">
                      İsim <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="input"
                      placeholder="Adınızı girin"
                      required
                      aria-required="true"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="label">
                      E-posta <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="input"
                      placeholder="kullanıcı@örnek.com"
                      required
                      aria-required="true"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="subject" className="label">
                    Konu
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="input"
                    placeholder="Mesajınızın konusu"
                    value={formData.subject}
                    onChange={(e) => handleChange("subject", e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="message" className="label">
                    Mesajınız <span className="text-danger">*</span>
                  </label>
                  <textarea
                    id="message"
                    className="input min-h-32 resize-y"
                    placeholder="Mesajınızı yazın..."
                    required
                    aria-required="true"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  <Send className="w-4 h-4" />
                  Gönder
                </button>
              </form>

              {/* Başarı mesajı */}
              {showSuccess && (
                <div
                  className="flex items-center gap-2 mt-4 p-4 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200"
                  role="alert"
                >
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <p className="text-sm">
                    Teşekkürler {formData.name || ""}! Mesajınız alındı. En kısa
                    sürede dönüş yapılacaktır.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sağ kolon */}
        <div className="space-y-4">
          {/* İletişim bilgileri */}
          <div className="card">
            <div className="card-header">
              <h2 className="text-base font-semibold">İletişim Bilgileri</h2>
            </div>
            <div className="card-body space-y-4">
              {contactInfo.map((info) => {
                const Icon = info.icon;
                return (
                  <div key={info.label} className="flex items-center gap-3">
                    <div className={`avatar avatar-md ${info.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{info.label}</p>
                      <p className="text-xs text-text-muted">{info.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sosyal medya */}
          <div className="card">
            <div className="card-header">
              <h2 className="text-base font-semibold">Sosyal Medya</h2>
            </div>
            <div className="card-body">
              <div className="flex gap-2">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`btn btn-icon rounded-lg border border-border ${link.color} transition-colors`}
                      aria-label={link.label}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
