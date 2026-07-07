import { notFound } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { getSite, sites, currentUser } from "@/lib/mock-data";
import { PrintToolbar } from "@/components/print-toolbar";
import { PrintStamp } from "@/components/print-stamp";
import { formatCurrency, formatDate, formatNumber } from "@/lib/utils";

export function generateStaticParams() {
  return sites.map((s) => ({ id: s.id }));
}

export default async function PrintPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const site = getSite(id);
  if (!site) notFound();

  const keyFacts: [string, string][] = [
    ["Reference", site.reference],
    ["Survey No.", site.surveyNo],
    ["Village / Locality", site.village],
    ["Asset type", site.type],
    ["Address", `${site.address}, ${site.city}, ${site.region}`],
    ["Coordinates", `${site.coordinates.lat.toFixed(4)}, ${site.coordinates.lng.toFixed(4)}`],
    ["Floor area", `${formatNumber(site.areaSqFt)} sq ft`],
    ["Plot size", site.plotSize],
    ["Year built", site.yearBuilt === 0 ? "Undeveloped" : String(site.yearBuilt)],
    ["Overall condition", site.condition],
    ["Survey date", formatDate(site.surveyDate)],
  ];

  return (
    <div className="min-h-screen bg-muted/50">
      <PrintToolbar backHref={`/sites/${site.id}`} />

      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="print-page mx-auto rounded-lg border bg-white p-10 text-[13px] leading-relaxed text-slate-800 shadow-lg print:p-0 print:shadow-none">
          {/* Letterhead */}
          <div className="flex items-start justify-between border-b-2 border-slate-800 pb-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-900">
                <ShieldCheck className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-lg font-bold tracking-tight text-slate-900">
                  SiteValue
                </p>
                <p className="text-xs text-slate-500">{currentUser.org}</p>
              </div>
            </div>
            <div className="text-right text-xs text-slate-500">
              <p className="font-semibold uppercase tracking-wide text-slate-700">
                Valuation Report
              </p>
              <p>Ref: {site.reference}</p>
              <p>Issued: {formatDate(site.lastUpdated)}</p>
              <p>Status: {site.status}</p>
            </div>
          </div>

          {/* Title */}
          <div className="py-6">
            <p className="text-xs uppercase tracking-widest text-slate-400">
              Survey &amp; Site Valuation
            </p>
            <h1 className="mt-1 text-2xl font-bold text-slate-900">
              {site.name}
            </h1>
            <p className="mt-1 text-slate-500">
              {site.address}, {site.city}, {site.region}
            </p>
          </div>

          {/* Headline valuation */}
          <div className="grid grid-cols-3 gap-4 rounded-lg bg-slate-50 p-5">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Assessed value
              </p>
              <p className="text-2xl font-bold text-slate-900">
                {formatCurrency(site.valuation)}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Value / sq ft
              </p>
              <p className="text-2xl font-bold text-slate-900">
                {formatCurrency(site.valuationPerSqFt)}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Confidence
              </p>
              <p className="text-2xl font-bold text-slate-900">
                {site.confidence}%
              </p>
            </div>
          </div>

          {/* Section: Property particulars */}
          <Section title="1. Property Particulars">
            <table className="w-full">
              <tbody>
                {keyFacts.map(([k, v], i) => (
                  <tr key={k} className={i % 2 ? "bg-slate-50" : ""}>
                    <td className="w-56 py-1.5 pl-2 font-medium text-slate-500">
                      {k}
                    </td>
                    <td className="py-1.5 text-slate-900">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>

          {/* Section: Executive summary */}
          <Section title="2. Executive Summary">
            <p className="text-slate-700">{site.summary}</p>
          </Section>

          {/* Section: Valuation build-up */}
          <Section title="3. Valuation Build-up">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-slate-300 text-left text-xs uppercase tracking-wide text-slate-500">
                  <th className="py-2">Component</th>
                  <th className="py-2 text-right">Amount</th>
                  <th className="py-2 text-right">Share</th>
                </tr>
              </thead>
              <tbody>
                {site.valuationBreakdown.map((line) => (
                  <tr key={line.label} className="border-b border-slate-100">
                    <td className="py-2 text-slate-700">{line.label}</td>
                    <td className="py-2 text-right tabular-nums text-slate-900">
                      {formatCurrency(line.amount)}
                    </td>
                    <td className="py-2 text-right tabular-nums text-slate-500">
                      {Math.round((line.amount / site.valuation) * 100)}%
                    </td>
                  </tr>
                ))}
                <tr className="border-t-2 border-slate-800 font-bold">
                  <td className="py-2 text-slate-900">Total assessed value</td>
                  <td className="py-2 text-right tabular-nums text-slate-900">
                    {formatCurrency(site.valuation)}
                  </td>
                  <td className="py-2 text-right text-slate-900">100%</td>
                </tr>
              </tbody>
            </table>
          </Section>

          {/* Section: Condition assessment */}
          <Section title="4. Condition Assessment">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-slate-300 text-left text-xs uppercase tracking-wide text-slate-500">
                  <th className="py-2">Element</th>
                  <th className="py-2">Condition</th>
                  <th className="py-2">Notes</th>
                </tr>
              </thead>
              <tbody>
                {site.inspection.map((item) => (
                  <tr key={item.category} className="border-b border-slate-100 align-top">
                    <td className="py-2 font-medium text-slate-700">
                      {item.category}
                    </td>
                    <td className="py-2 text-slate-900">{item.condition}</td>
                    <td className="py-2 text-slate-600">{item.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>

          {/* Section: Photographic record */}
          <Section title="5. Photographic Record">
            <div className="grid grid-cols-3 gap-3">
              {site.photos.slice(0, 6).map((p) => (
                <figure key={p.id} className="overflow-hidden rounded border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.thumb}
                    alt={p.caption}
                    className="h-24 w-full object-cover"
                  />
                  <figcaption className="px-2 py-1 text-[10px] text-slate-500">
                    {p.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </Section>

          {/* Sign off */}
          <div className="mt-8 grid grid-cols-2 gap-8 border-t border-slate-300 pt-6">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Prepared by
              </p>
              <p className="mt-4 border-b border-slate-400 pb-1 font-medium text-slate-900">
                {site.surveyor.name}
              </p>
              <p className="text-xs text-slate-500">
                {site.surveyor.role}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Reviewed &amp; approved
              </p>
              <p className="mt-4 border-b border-slate-400 pb-1 font-medium text-slate-900">
                {currentUser.name}
              </p>
              <p className="text-xs text-slate-500">{currentUser.role}</p>
            </div>
          </div>

          {/* Print stamp */}
          <PrintStamp
            printedBy={currentUser.name}
            version={`${site.reference}-R${site.documents.length}.0`}
          />

          <p className="mt-6 border-t border-slate-200 pt-4 text-[10px] leading-relaxed text-slate-400">
            This report is a design prototype produced with mock data for
            demonstration purposes only and does not constitute professional
            valuation advice. © {new Date().getFullYear()} {currentUser.org}.
            All figures are illustrative.
          </p>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-6 break-inside-avoid">
      <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-900">
        {title}
      </h2>
      {children}
    </section>
  );
}
