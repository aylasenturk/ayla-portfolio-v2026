"use client";

import { useState } from "react";
import { Calculator, AlertCircle, Info } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";

const MONTH_NAMES = [
  "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
  "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık",
];

const ZODIAC_SIGNS = [
  { name: "Oğlak", start: [12, 22], end: [1, 19] },
  { name: "Kova", start: [1, 20], end: [2, 18] },
  { name: "Balık", start: [2, 19], end: [3, 20] },
  { name: "Koç", start: [3, 21], end: [4, 19] },
  { name: "Boğa", start: [4, 20], end: [5, 20] },
  { name: "İkizler", start: [5, 21], end: [6, 20] },
  { name: "Yengeç", start: [6, 21], end: [7, 22] },
  { name: "Aslan", start: [7, 23], end: [8, 22] },
  { name: "Başak", start: [8, 23], end: [9, 22] },
  { name: "Terazi", start: [9, 23], end: [10, 22] },
  { name: "Akrep", start: [10, 23], end: [11, 21] },
  { name: "Yay", start: [11, 22], end: [12, 21] },
];

function getZodiacSign(month: number, day: number): string {
  for (const sign of ZODIAC_SIGNS) {
    if (
      (month === sign.start[0] && day >= sign.start[1]) ||
      (month === sign.end[0] && day <= sign.end[1])
    ) {
      return sign.name;
    }
  }
  return "Oğlak";
}

interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalWeeks: number;
  totalMonths: number;
  daysUntilBirthday: number;
  zodiac: string;
}

function calculateAge(day: number, month: number, year: number): AgeResult | null {
  const birthDate = new Date(year, month - 1, day);
  const now = new Date();

  if (birthDate.getDate() !== day) return null;
  if (birthDate > now) return null;

  let years = now.getFullYear() - birthDate.getFullYear();
  let months = now.getMonth() - birthDate.getMonth();
  let days = now.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  const totalMs = now.getTime() - birthDate.getTime();
  const totalDays = Math.floor(totalMs / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.floor(totalDays / 7);
  const totalMonths = years * 12 + months;

  const nextBirthday = new Date(now.getFullYear(), month - 1, day);
  if (nextBirthday < now) {
    nextBirthday.setFullYear(now.getFullYear() + 1);
  }
  const daysUntilBirthday = Math.ceil(
    (nextBirthday.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );

  return {
    years,
    months,
    days,
    totalDays,
    totalWeeks,
    totalMonths,
    daysUntilBirthday,
    zodiac: getZodiacSign(month, day),
  };
}

const currentYear = new Date().getFullYear();
const dayOptions = Array.from({ length: 31 }, (_, i) => i + 1);
const yearOptions = Array.from({ length: currentYear - 1899 }, (_, i) => currentYear - i);

export default function AgeCalculatorPage() {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [result, setResult] = useState<AgeResult | null>(null);
  const [error, setError] = useState("");

  function handleCalculate() {
    setError("");
    setResult(null);

    const d = parseInt(day);
    const m = parseInt(month);
    const y = parseInt(year);

    if (!d || !m || !y) {
      setError("Lütfen tüm tarih alanlarını doldurun.");
      return;
    }

    const ageResult = calculateAge(d, m, y);
    if (!ageResult) {
      setError("Geçersiz doğum tarihi.");
      return;
    }

    setResult(ageResult);
  }

  return (
    <div>
      <PageHeader section="Hesaplayıcılar" title="Yaş Hesaplayıcı" />

      <div className="flex justify-center">
        <div className="w-full max-w-md space-y-4">
          {/* Hesaplayıcı */}
          <div className="card">
            <div className="card-header">
              <h2 className="text-base font-semibold flex items-center gap-2">
                <Calculator className="w-4 h-4 text-primary-600" />
                Yaş Hesaplayıcı
              </h2>
            </div>
            <div className="card-body">
              <fieldset className="mb-4">
                <legend className="text-sm font-medium mb-3">
                  Doğum Tarihinizi Seçin
                </legend>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label htmlFor="day" className="label">
                      Gün
                    </label>
                    <select
                      id="day"
                      className="select"
                      value={day}
                      onChange={(e) => setDay(e.target.value)}
                    >
                      <option value="">Gün</option>
                      {dayOptions.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="month" className="label">
                      Ay
                    </label>
                    <select
                      id="month"
                      className="select"
                      value={month}
                      onChange={(e) => setMonth(e.target.value)}
                    >
                      <option value="">Ay</option>
                      {MONTH_NAMES.map((name, i) => (
                        <option key={name} value={i + 1}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="year" className="label">
                      Yıl
                    </label>
                    <select
                      id="year"
                      className="select"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                    >
                      <option value="">Yıl</option>
                      {yearOptions.map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </fieldset>

              <button onClick={handleCalculate} className="btn btn-primary w-full mb-4">
                <Calculator className="w-4 h-4" />
                Hesapla
              </button>

              {/* Hata */}
              {error && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 text-red-700 border border-red-200">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <p className="text-sm">{error}</p>
                </div>
              )}

              {/* Sonuç */}
              {result && (
                <div className="space-y-4" aria-live="polite">
                  <div className="text-center p-4 rounded-lg bg-emerald-50 border border-emerald-200">
                    <p className="text-xl font-bold text-emerald-700">
                      {result.years} yıl, {result.months} ay, {result.days} gün
                    </p>
                    <p className="text-xs text-emerald-600 mt-1">
                      {result.daysUntilBirthday === 0
                        ? "Doğum gününüz kutlu olsun!"
                        : `Sonraki doğum gününüze ${result.daysUntilBirthday} gün kaldı.`}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center p-3 rounded-lg bg-primary-50 border border-primary-100">
                      <p className="text-lg font-bold text-primary-700">
                        {result.totalDays.toLocaleString("tr-TR")}
                      </p>
                      <p className="text-xs text-primary-600">Gün</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-cyan-50 border border-cyan-100">
                      <p className="text-lg font-bold text-cyan-700">
                        {result.totalWeeks.toLocaleString("tr-TR")}
                      </p>
                      <p className="text-xs text-cyan-600">Hafta</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-emerald-50 border border-emerald-100">
                      <p className="text-lg font-bold text-emerald-700">
                        {result.totalMonths.toLocaleString("tr-TR")}
                      </p>
                      <p className="text-xs text-emerald-600">Ay</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Burç */}
          <div className="card">
            <div className="card-header">
              <h2 className="text-sm font-semibold">Burç Bilgisi</h2>
            </div>
            <div className="card-body text-center">
              {result ? (
                <div>
                  <p className="text-xl font-bold text-primary-600">
                    {result.zodiac}
                  </p>
                  <p className="text-xs text-text-muted">Burcunuz</p>
                </div>
              ) : (
                <p className="text-sm text-text-muted flex items-center justify-center gap-1">
                  <Info className="w-4 h-4" />
                  Doğum tarihinizi girerek burcunuzu öğrenin.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
