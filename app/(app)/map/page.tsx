import { Map, MapPin } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { ComingSoon } from "@/components/coming-soon";
import { Card, CardContent } from "@/components/ui/card";
import { sites } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { t } from "@/lib/i18n";

export default function MapPage() {
  return (
    <div className="mx-auto max-w-[1400px] space-y-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        title={t.nav.map}
        description="सर्वेक्षण केलेल्या साइट्सचे भौगोलिक वितरण"
        crumbs={[{ label: t.brand.workspace, href: "/dashboard" }, { label: t.nav.map }]}
      />

      <Card className="overflow-hidden">
        <div className="relative h-[420px] bg-muted">
          <div
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                "linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          {sites.map((s, i) => (
            <div
              key={s.id}
              className="absolute -translate-x-1/2 -translate-y-full"
              style={{
                left: `${15 + ((i * 61) % 70)}%`,
                top: `${25 + ((i * 37) % 55)}%`,
              }}
            >
              <div className="group relative flex flex-col items-center">
                <div className="whitespace-nowrap rounded-md bg-background px-2 py-1 text-[11px] font-medium shadow-md">
                  {s.city} · {formatCurrency(s.valuation, true)}
                </div>
                <MapPin className="h-6 w-6 fill-primary/20 text-primary" />
              </div>
            </div>
          ))}
        </div>
        <CardContent className="p-4 text-sm text-muted-foreground">
          प्रातिनिधिक नकाशा — {sites.length} साइट्स दर्शवल्या. परस्परसंवादी नकाशा
          एकत्रीकरण या प्रोटोटाइपमध्ये stub केलेले आहे.
        </CardContent>
      </Card>
    </div>
  );
}
