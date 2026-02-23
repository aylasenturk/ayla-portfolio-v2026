import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { clsx } from "clsx";
import PageHeader from "@/components/ui/PageHeader";

const MONTH_NAMES = [
  "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
  "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık",
];

const DAY_NAMES = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
const DAY_HEADERS = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cts", "Paz"];

interface CalendarDay {
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  date: Date;
}

function getCalendarDays(
  year: number,
  month: number,
  selectedDate: Date
): CalendarDay[] {
  const today = new Date();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  let startDay = firstDay.getDay() - 1;
  if (startDay < 0) startDay = 6;

  const days: CalendarDay[] = [];

  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = startDay - 1; i >= 0; i--) {
    const d = prevMonthLastDay - i;
    days.push({
      day: d,
      isCurrentMonth: false,
      isToday: false,
      isSelected: false,
      date: new Date(year, month - 1, d),
    });
  }

  for (let d = 1; d <= lastDay.getDate(); d++) {
    const date = new Date(year, month, d);
    days.push({
      day: d,
      isCurrentMonth: true,
      isToday:
        d === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear(),
      isSelected:
        d === selectedDate.getDate() &&
        month === selectedDate.getMonth() &&
        year === selectedDate.getFullYear(),
      date,
    });
  }

  const totalCells = days.length;
  const remaining = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
  for (let i = 1; i <= remaining; i++) {
    days.push({
      day: i,
      isCurrentMonth: false,
      isToday: false,
      isSelected: false,
      date: new Date(year, month + 1, i),
    });
  }

  return days;
}

export default function DatePickerPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const calendarDays = useMemo(
    () => getCalendarDays(year, month, selectedDate),
    [year, month, selectedDate]
  );

  function goToPrevMonth() {
    setCurrentDate(new Date(year, month - 1, 1));
  }

  function goToNextMonth() {
    setCurrentDate(new Date(year, month + 1, 1));
  }

  function selectDay(date: Date) {
    setSelectedDate(date);
  }

  const formattedSelected = `${selectedDate.getDate()} ${MONTH_NAMES[selectedDate.getMonth()]} ${selectedDate.getFullYear()}, ${DAY_NAMES[selectedDate.getDay()]}`;

  const isoFormat = selectedDate.toISOString().split("T")[0];
  const trFormat = `${selectedDate.getDate().toString().padStart(2, "0")}.${(selectedDate.getMonth() + 1).toString().padStart(2, "0")}.${selectedDate.getFullYear()}`;
  const unixFormat = Math.floor(selectedDate.getTime() / 1000);

  return (
    <div>
      <PageHeader section="Üretkenlik Araçları" title="Tarih Seçici" />

      <div className="flex justify-center">
        <div className="w-full max-w-sm space-y-4">
          {/* Takvim */}
          <div className="card">
            <div className="card-body">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={goToPrevMonth}
                  className="btn btn-icon btn-outline rounded-lg"
                  aria-label="Önceki ay"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <h2 className="text-base font-semibold">
                  {MONTH_NAMES[month]} {year}
                </h2>
                <button
                  onClick={goToNextMonth}
                  className="btn btn-icon btn-outline rounded-lg"
                  aria-label="Sonraki ay"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-7 mb-2">
                {DAY_HEADERS.map((header) => (
                  <div
                    key={header}
                    className="text-center text-xs font-semibold text-text-muted py-1"
                  >
                    {header}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-0.5" aria-label="Takvim günleri">
                {calendarDays.map((day, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => day.isCurrentMonth && selectDay(day.date)}
                    disabled={!day.isCurrentMonth}
                    className={clsx(
                      "aspect-square flex items-center justify-center rounded-lg text-sm transition-colors",
                      !day.isCurrentMonth && "text-text-muted/40 cursor-default",
                      day.isCurrentMonth &&
                        !day.isSelected &&
                        !day.isToday &&
                        "hover:bg-primary-50 cursor-pointer",
                      day.isToday &&
                        !day.isSelected &&
                        "bg-cyan-50 text-cyan-700 font-medium",
                      day.isSelected &&
                        "bg-primary-600 text-white font-medium"
                    )}
                    aria-label={`${day.day}`}
                    aria-current={day.isToday ? "date" : undefined}
                  >
                    {day.day}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Seçilen Tarih */}
          <div className="card">
            <div className="card-body">
              <p className="text-sm font-medium text-text-muted mb-1">Seçilen Tarih:</p>
              <p className="text-lg font-bold text-primary-600" aria-live="polite">
                {formattedSelected}
              </p>
            </div>
          </div>

          {/* Tarih Formatları */}
          <div className="card">
            <div className="card-header">
              <h2 className="text-sm font-semibold flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Tarih Formatları
              </h2>
            </div>
            <div className="card-body">
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b border-border-light">
                    <td className="py-2 text-text-muted">ISO 8601</td>
                    <td className="py-2 font-mono font-medium text-right">{isoFormat}</td>
                  </tr>
                  <tr className="border-b border-border-light">
                    <td className="py-2 text-text-muted">Türkçe</td>
                    <td className="py-2 font-mono font-medium text-right">{trFormat}</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-text-muted">Unix Timestamp</td>
                    <td className="py-2 font-mono font-medium text-right">{unixFormat}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
