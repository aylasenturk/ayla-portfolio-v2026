import { useState } from "react";
import { ArrowRightLeft, AlertCircle } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";

type Unit = "celsius" | "fahrenheit" | "kelvin";

const UNIT_LABELS: Record<Unit, string> = {
  celsius: "Celsius (C)",
  fahrenheit: "Fahrenheit (F)",
  kelvin: "Kelvin (K)",
};

const UNIT_SYMBOLS: Record<Unit, string> = {
  celsius: "C",
  fahrenheit: "F",
  kelvin: "K",
};

const REFERENCE_DATA = [
  { label: "Su Donma Noktası", c: 0, f: 32, k: 273.15 },
  { label: "Oda Sıcaklığı", c: 20, f: 68, k: 293.15 },
  { label: "Vücut Sıcaklığı", c: 37, f: 98.6, k: 310.15 },
  { label: "Su Kaynama Noktası", c: 100, f: 212, k: 373.15 },
];

const FORMULAS = [
  { label: "Celsius -> Fahrenheit", formula: "F = (C x 9/5) + 32" },
  { label: "Celsius -> Kelvin", formula: "K = C + 273.15" },
  { label: "Fahrenheit -> Celsius", formula: "C = (F - 32) x 5/9" },
  { label: "Kelvin -> Celsius", formula: "C = K - 273.15" },
];

function convertTemperature(value: number, from: Unit, to: Unit): number {
  if (from === to) return value;

  let celsius: number;
  switch (from) {
    case "celsius":
      celsius = value;
      break;
    case "fahrenheit":
      celsius = (value - 32) * (5 / 9);
      break;
    case "kelvin":
      celsius = value - 273.15;
      break;
  }

  switch (to) {
    case "celsius":
      return celsius;
    case "fahrenheit":
      return celsius * (9 / 5) + 32;
    case "kelvin":
      return celsius + 273.15;
  }
}

export default function TemperatureConverterPage() {
  const [inputValue, setInputValue] = useState("");
  const [fromUnit, setFromUnit] = useState<Unit>("celsius");
  const [toUnit, setToUnit] = useState<Unit>("fahrenheit");
  const [result, setResult] = useState<{ value: number; unit: Unit } | null>(null);
  const [error, setError] = useState("");

  function handleConvert() {
    setError("");
    setResult(null);

    const numValue = parseFloat(inputValue);
    if (isNaN(numValue)) {
      setError("Lütfen geçerli bir sayı giriniz!");
      return;
    }

    const converted = convertTemperature(numValue, fromUnit, toUnit);
    setResult({ value: converted, unit: toUnit });
  }

  return (
    <div>
      <PageHeader section="Hesaplayıcılar" title="Sıcaklık Dönüştürücü" />

      <div className="flex justify-center">
        <div className="w-full max-w-md space-y-4">
          {/* Dönüştürücü */}
          <div className="card">
            <div className="card-header">
              <h2 className="text-base font-semibold flex items-center gap-2">
                <ArrowRightLeft className="w-4 h-4 text-red-500" />
                Sıcaklık Dönüştürücü
              </h2>
            </div>
            <div className="card-body space-y-4">
              <div>
                <label htmlFor="value" className="label">
                  Sıcaklık Değeri
                </label>
                <input
                  type="number"
                  id="value"
                  className="input"
                  placeholder="Örnek: 25"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleConvert()}
                />
              </div>

              <div>
                <label htmlFor="fromUnit" className="label">
                  Bu Birimden
                </label>
                <select
                  id="fromUnit"
                  className="select"
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value as Unit)}
                >
                  {(Object.keys(UNIT_LABELS) as Unit[]).map((unit) => (
                    <option key={unit} value={unit}>
                      {UNIT_LABELS[unit]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="toUnit" className="label">
                  Bu Birime
                </label>
                <select
                  id="toUnit"
                  className="select"
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value as Unit)}
                >
                  {(Object.keys(UNIT_LABELS) as Unit[]).map((unit) => (
                    <option key={unit} value={unit}>
                      {UNIT_LABELS[unit]}
                    </option>
                  ))}
                </select>
              </div>

              <button onClick={handleConvert} className="btn btn-primary w-full">
                <ArrowRightLeft className="w-4 h-4" />
                Dönüştür
              </button>

              {error && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 text-red-700 border border-red-200">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <p className="text-sm">{error}</p>
                </div>
              )}

              {result && (
                <div
                  className="text-center p-4 rounded-lg bg-emerald-50 border border-emerald-200"
                  role="alert"
                  aria-live="polite"
                >
                  <p className="text-2xl font-bold text-emerald-700">
                    {result.value.toFixed(2)} {UNIT_SYMBOLS[result.unit]}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Hızlı Referans */}
          <div className="card">
            <div className="card-header">
              <h2 className="text-sm font-semibold">Hızlı Referans</h2>
            </div>
            <div className="card-body overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-2 font-medium text-text-muted">Açıklama</th>
                    <th className="text-right py-2 px-2 font-medium text-text-muted">C</th>
                    <th className="text-right py-2 px-2 font-medium text-text-muted">F</th>
                    <th className="text-right py-2 pl-2 font-medium text-text-muted">K</th>
                  </tr>
                </thead>
                <tbody>
                  {REFERENCE_DATA.map((row) => (
                    <tr key={row.label} className="border-b border-border-light last:border-0">
                      <td className="py-2 pr-2 text-text-secondary">{row.label}</td>
                      <td className="text-right py-2 px-2">{row.c}</td>
                      <td className="text-right py-2 px-2">{row.f}</td>
                      <td className="text-right py-2 pl-2">{row.k}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Formüller */}
          <div className="card">
            <div className="card-header">
              <h2 className="text-sm font-semibold">Dönüşüm Formülleri</h2>
            </div>
            <div className="card-body space-y-2">
              {FORMULAS.map((f) => (
                <div key={f.label} className="flex items-baseline gap-2 text-sm">
                  <span className="font-medium text-text-secondary">{f.label}:</span>
                  <code className="text-xs bg-surface-alt px-2 py-0.5 rounded border border-border-light font-mono">
                    {f.formula}
                  </code>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
