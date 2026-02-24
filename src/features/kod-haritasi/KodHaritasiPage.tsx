import PageHeader from "@/components/ui/PageHeader";
import ForceGraph from "./components/ForceGraph";

export default function KodHaritasiPage() {
  return (
    <div>
      <PageHeader section="Araçlar" title="Kod Haritası" />
      <p className="text-sm text-text-secondary mb-4">
        Düğümlere tıklayarak dosya detaylarını görüntüleyin. Sürükleyerek düğümleri hareket ettirin.
      </p>
      <ForceGraph />
    </div>
  );
}
