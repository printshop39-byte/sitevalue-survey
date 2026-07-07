import { notFound } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { getSite, sites, currentUser } from "@/lib/mock-data";
import { PrintToolbar } from "@/components/print-toolbar";
import { PrintStamp } from "@/components/print-stamp";
import { formatCurrency, formatDate, formatNumber } from "@/lib/utils";
import { t, tCondition, tStatus, tType } from "@/lib/i18n";

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
    [t.print.fReference, site.reference],
    [t.print.fSurveyNo, site.surveyNo],
    [t.print.fVillage, site.village],
    [t.print.fAssetType, tType[site.type]],
    [t.print.fAddress, `${site.address}, ${site.city}, ${site.region}`],
    [t.print.fCoordinates, `${site.coordinates.lat.toFixed(4)}, ${site.coordinates.lng.toFixed(4)}`],
    [t.print.fFloorArea, `${formatNumber(site.areaSqFt)} ${t.sites.sqft}`],
    [t.print.fPlotSize, site.plotSize],
    [t.print.fYearBuilt, site.yearBuilt === 0 ? t.print.undeveloped : String(site.yearBuilt)],
    [t.print.fOverallCondition, tCondition[site.condition]],
    [t.print.fSurveyDate, formatDate(site.surveyDate)],
  ];

  return (
    <div className="min-h-screen bg-muted/50">
      <PrintToolbar backHref={`/sites/${site.id}`} />

      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="print-page mx-auto rounded-lg border bg-white p-5 text-[13px] leading-relaxed text-slate-800 shadow-lg sm:p-10 print:p-0 print:shadow-none">
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
                {t.print.valuationReport}
              </p>
              <p>{t.print.ref}: {site.reference}</p>
              <p>{t.print.issued}: {formatDate(site.lastUpdated)}</p>
              <p>{t.print.status}: {tStatus[site.status]}</p>
            </div>
          </div>

          {/* Title */}
          <div className="py-6">
            <p className="text-xs uppercase tracking-widest text-slate-400">
              {t.print.surveyValuation}
            </p>
            <h1 className="mt-1 text-2xl font-bold text-slate-900">
              {site.name}
            </h1>
            <p className="mt-1 text-slate-500">
              {site.address}, {site.city}, {site.region}
            </p>
          </div>

          {/* Headline valuation */}
          <div className="grid grid-cols-1 gap-3 rounded-lg bg-slate-50 p-4 sm:grid-cols-3 sm:gap-4 sm:p-5">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">
                {t.print.assessedValue}
              </p>
              <p className="text-2xl font-bold text-slate-900">
                {formatCurrency(site.valuation)}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">
                {t.print.valuePerSqft}
              </p>
              <p className="text-2xl font-bold text-slate-900">
                {formatCurrency(site.valuationPerSqFt)}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">
                {t.print.confidence}
              </p>
              <p className="text-2xl font-bold text-slate-900">
                {site.confidence}%
              </p>
            </div>
          </div>

          {/* Section: Property particulars */}
          <Section title={t.print.sec1}>
            <table className="w-full">
              <tbody>
                {keyFacts.map(([k, v], i) => (
                  <tr key={k} className={i % 2 ? "bg-slate-50" : ""}>
                    <td className="w-32 py-1.5 pl-2 align-top font-medium text-slate-500 sm:w-56">
                      {k}
                    </td>
                    <td className="py-1.5 text-slate-900">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>

          {/* Section: Executive summary */}
          <Section title={t.print.sec2}>
            <p className="text-slate-700">{site.summary}</p>
          </Section>

          {/* Section: Valuation build-up */}
          <Section title={t.print.sec3}>
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-slate-300 text-left text-xs uppercase tracking-wide text-slate-500">
                  <th className="py-2">{t.print.component}</th>
                  <th className="py-2 text-right">{t.print.amount}</th>
                  <th className="py-2 text-right">{t.print.share}</th>
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
                  <td className="py-2 text-slate-900">{t.print.totalAssessed}</td>
                  <td className="py-2 text-right tabular-nums text-slate-900">
                    {formatCurrency(site.valuation)}
                  </td>
                  <td className="py-2 text-right text-slate-900">100%</td>
                </tr>
              </tbody>
            </table>
          </Section>

          {/* Section: Condition assessment */}
          <Section title={t.print.sec4}>
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-slate-300 text-left text-xs uppercase tracking-wide text-slate-500">
                  <th className="py-2">{t.print.element}</th>
                  <th className="py-2">{t.print.conditionCol}</th>
                  <th className="py-2">{t.print.notes}</th>
                </tr>
              </thead>
              <tbody>
                {site.inspection.map((item) => (
                  <tr key={item.category} className="border-b border-slate-100 align-top">
                    <td className="py-2 font-medium text-slate-700">
                      {item.category}
                    </td>
                    <td className="py-2 text-slate-900">{tCondition[item.condition]}</td>
                    <td className="py-2 text-slate-600">{item.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>

          {/* Section: Photographic record */}
          <Section title={t.print.sec5}>
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
                {t.print.preparedBy}
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
                {t.print.reviewedApproved}
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
            {t.print.disclaimer} © {new Date().getFullYear()} {currentUser.org}.
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
