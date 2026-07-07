import type {
  ActivityEvent,
  Photo,
  Site,
  SiteDocument,
  Surveyor,
  TimelineStep,
  WorkflowStage,
} from "./types";

// The firm / end-client this workspace is branded for.
export const clientBrand = {
  name: "Sahyadri Survey & Valuation",
  tagline: "Land Survey · Valuation · Compliance",
  district: "Pune, Maharashtra",
};

export const surveyors: Surveyor[] = [
  { id: "u1", name: "Aarti Deshmukh", role: "Senior Surveyor", email: "aarti.deshmukh@sahyadrisurvey.in", avatarColor: "217 91% 42%" },
  { id: "u2", name: "Rohan Kulkarni", role: "Structural Engineer", email: "rohan.kulkarni@sahyadrisurvey.in", avatarColor: "152 62% 36%" },
  { id: "u3", name: "Snehal Patil", role: "Valuation Analyst", email: "snehal.patil@sahyadrisurvey.in", avatarColor: "271 60% 50%" },
  { id: "u4", name: "Ganesh Pawar", role: "Field Surveyor", email: "ganesh.pawar@sahyadrisurvey.in", avatarColor: "38 92% 45%" },
];

export const currentUser = {
  name: "Aarti Deshmukh",
  role: "Senior Surveyor",
  email: "aarti.deshmukh@sahyadrisurvey.in",
  org: "Sahyadri Survey & Valuation LLP",
};

const img = (seed: string, w = 1200, h = 800) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

function makePhotos(prefix: string): Photo[] {
  const defs: Array<[Photo["category"], string, string?]> = [
    ["Exterior", "Main frontage and road access"],
    ["Exterior", "Boundary wall and gate", "Access"],
    ["Structural", "RCC column and beam junction", "Defect"],
    ["Interior", "Ground floor internal layout"],
    ["Interior", "First floor office area"],
    ["Structural", "Roof slab and waterproofing"],
    ["Site", "Plot boundary and open area"],
    ["Defect", "Seepage at plinth level, east side", "Priority"],
    ["Site", "Approach road and surroundings"],
    ["Exterior", "Front elevation and signage"],
    ["Interior", "Service and utility room"],
    ["Structural", "Foundation inspection pit"],
  ];
  return defs.map(([category, caption, tag], i) => ({
    id: `${prefix}-ph-${i + 1}`,
    url: img(`${prefix}${i}`, 1200, 800),
    thumb: img(`${prefix}${i}`, 480, 320),
    caption,
    category,
    takenAt: `2026-0${((i % 5) + 1)}-1${i % 8}`,
    tag,
  }));
}

function makeDocs(prefix: string, by: string): SiteDocument[] {
  return [
    { id: `${prefix}-d1`, name: "Full Survey Report.pdf", type: "Report", size: "4.2 MB", version: "v3.1", uploadedBy: "Aarti Deshmukh", uploadedAt: "2026-06-28" },
    { id: `${prefix}-d2`, name: "Valuation Summary.pdf", type: "Report", size: "1.1 MB", version: "v2.0", uploadedBy: "Snehal Patil", uploadedAt: "2026-06-29" },
    { id: `${prefix}-d3`, name: "7-12 Extract (Satbara Utara).pdf", type: "Legal", size: "0.6 MB", version: "v1.0", uploadedBy: by, uploadedAt: "2026-06-20" },
    { id: `${prefix}-d4`, name: "Property Card & CTS.pdf", type: "Legal", size: "0.9 MB", version: "v1.0", uploadedBy: by, uploadedAt: "2026-06-18" },
    { id: `${prefix}-d5`, name: "Mojani Measurement Map.pdf", type: "Drawing", size: "3.4 MB", version: "v1.2", uploadedBy: "Ganesh Pawar", uploadedAt: "2026-06-15" },
    { id: `${prefix}-d6`, name: "NA Order (Non-Agricultural).pdf", type: "Certificate", size: "0.7 MB", version: "v1.0", uploadedBy: "Snehal Patil", uploadedAt: "2026-06-12" },
    { id: `${prefix}-d7`, name: "Cost Analysis.xlsx", type: "Spreadsheet", size: "0.8 MB", version: "v2.2", uploadedBy: "Snehal Patil", uploadedAt: "2026-06-30" },
  ];
}

interface SiteSeed {
  id: string;
  reference: string;
  name: string;
  type: Site["type"];
  status: Site["status"];
  address: string;
  city: string;
  region: string;
  lat: number;
  lng: number;
  area: number;
  plotSize: string;
  yearBuilt: number;
  condition: Site["condition"];
  surveyor: Surveyor;
  surveyDate: string;
  lastUpdated: string;
  valuation: number;
  confidence: number;
  progress: number;
  coverSeed: string;
  summary: string;
}

const seeds: SiteSeed[] = [
  {
    id: "STE-4821", reference: "STE-4821", name: "Chakan Logistics Park", type: "Industrial", status: "Approved",
    address: "Plot D-14, MIDC Chakan Phase II", city: "Chakan", region: "Pune", lat: 18.7606, lng: 73.8636,
    area: 184000, plotSize: "6.4 acres (2.59 Ha)", yearBuilt: 2017, condition: "Excellent", surveyor: surveyors[0],
    surveyDate: "2026-06-18", lastUpdated: "2026-07-02", valuation: 465000000, confidence: 94, progress: 100,
    coverSeed: "chakan",
    summary: "Modern PEB warehouse in the Chakan–Talegaon automotive belt with 10 dock levels, 12m clear height and Grade-A office block. Excellent connectivity to the Pune–Nashik highway and JNPT corridor.",
  },
  {
    id: "STE-4796", reference: "STE-4796", name: "Hinjawadi IT Commercial Tower", type: "Commercial", status: "In Review",
    address: "Rajiv Gandhi Infotech Park, Phase 1", city: "Hinjawadi", region: "Pune", lat: 18.5912, lng: 73.7389,
    area: 96500, plotSize: "1.8 acres", yearBuilt: 2012, condition: "Good", surveyor: surveyors[2],
    surveyDate: "2026-06-25", lastUpdated: "2026-07-05", valuation: 580000000, confidence: 88, progress: 72,
    coverSeed: "hinjawadi",
    summary: "Multi-tenant IT/ITeS office tower in the Hinjawadi Phase 1 cluster with strong occupier demand. Lift modernisation and facade cleaning recommended; overall valuation reflects premium rentals.",
  },
  {
    id: "STE-4772", reference: "STE-4772", name: "Kothrud Residential Complex", type: "Residential", status: "Approved",
    address: "Survey Colony, Kothrud", city: "Kothrud", region: "Pune", lat: 18.5074, lng: 73.8077,
    area: 62000, plotSize: "0.9 acres", yearBuilt: 2019, condition: "Excellent", surveyor: surveyors[0],
    surveyDate: "2026-06-10", lastUpdated: "2026-06-30", valuation: 434000000, confidence: 91, progress: 100,
    coverSeed: "kothrud",
    summary: "48-flat residential development in a prime Kothrud location with amenity podium and stilt parking. Low deferred maintenance and strong resale demand in the micro-market.",
  },
  {
    id: "STE-4755", reference: "STE-4755", name: "Wagholi Mixed-Use Township", type: "Mixed Use", status: "Draft",
    address: "Nagar Road, Wagholi", city: "Wagholi", region: "Pune", lat: 18.5793, lng: 73.9819,
    area: 128000, plotSize: "2.6 acres", yearBuilt: 2022, condition: "Excellent", surveyor: surveyors[3],
    surveyDate: "2026-07-01", lastUpdated: "2026-07-06", valuation: 512000000, confidence: 79, progress: 34,
    coverSeed: "wagholi",
    summary: "Integrated scheme on Nagar Road combining ground-floor retail, mid-rise offices and residential towers. Survey in progress; podium structural review and RERA compliance check pending.",
  },
  {
    id: "STE-4731", reference: "STE-4731", name: "Waluj MIDC Industrial Estate", type: "Industrial", status: "In Review",
    address: "Sector E, Waluj MIDC", city: "Waluj", region: "Chh. Sambhajinagar", lat: 19.83, lng: 75.24,
    area: 210500, plotSize: "8.1 acres", yearBuilt: 2005, condition: "Fair", surveyor: surveyors[1],
    surveyDate: "2026-06-22", lastUpdated: "2026-07-04", valuation: 368000000, confidence: 82, progress: 66,
    coverSeed: "waluj",
    summary: "Established multi-shed engineering estate in Waluj MIDC, Chhatrapati Sambhajinagar. Ageing roof sheeting and localised RCC spalling noted; capital expenditure allowance applied to valuation.",
  },
  {
    id: "STE-4708", reference: "STE-4708", name: "Nira Agricultural Land Parcel", type: "Agricultural", status: "Approved",
    address: "Gat 405, Nira, Baramati Taluka", city: "Baramati", region: "Pune", lat: 18.1514, lng: 74.5772,
    area: 435600, plotSize: "10 acres (400 Guntha)", yearBuilt: 0, condition: "Good", surveyor: surveyors[3],
    surveyDate: "2026-05-28", lastUpdated: "2026-06-18", valuation: 96000000, confidence: 76, progress: 100,
    coverSeed: "nira",
    summary: "Irrigated agricultural holding near Nira with canal access and road frontage. NA potential for warehousing subject to zone conversion; low contamination risk confirmed by soil testing.",
  },
  {
    id: "STE-4690", reference: "STE-4690", name: "Nashik Wine Park Commercial", type: "Commercial", status: "In Review",
    address: "Ambad Industrial Area, Ambad", city: "Nashik", region: "Nashik", lat: 19.9975, lng: 73.7898,
    area: 74200, plotSize: "1.4 acres", yearBuilt: 2018, condition: "Excellent", surveyor: surveyors[2],
    surveyDate: "2026-06-30", lastUpdated: "2026-07-06", valuation: 297000000, confidence: 90, progress: 58,
    coverSeed: "nashik",
    summary: "Purpose-built processing and office facility in Ambad, Nashik let to a single food & beverage tenant. High-specification services and good compliance record.",
  },
  {
    id: "STE-4663", reference: "STE-4663", name: "Kolhapur Heritage Wada", type: "Mixed Use", status: "Archived",
    address: "Rajarampuri, 4th Lane", city: "Kolhapur", region: "Kolhapur", lat: 16.705, lng: 74.2433,
    area: 51800, plotSize: "1.1 acres", yearBuilt: 1912, condition: "Poor", surveyor: surveyors[1],
    surveyDate: "2026-04-14", lastUpdated: "2026-05-02", valuation: 128000000, confidence: 68, progress: 100,
    coverSeed: "kolhapurwada",
    summary: "Heritage wada structure in Rajarampuri with significant refurbishment liability. Valuation reflects redevelopment potential subject to heritage and structural constraints.",
  },
];

function breakdownFor(seed: SiteSeed) {
  const land = Math.round(seed.valuation * 0.34);
  const structure = Math.round(seed.valuation * 0.41);
  const services = Math.round(seed.valuation * 0.12);
  const external = Math.round(seed.valuation * 0.08);
  const contingency = seed.valuation - land - structure - services - external;
  return [
    { label: "जमीन मूल्य", amount: land },
    { label: "संरचना व आवरण", amount: structure },
    { label: "इमारत सेवा (MEP)", amount: services },
    { label: "बाह्य कामे", amount: external },
    { label: "आकस्मिकता व शुल्क", amount: contingency },
  ];
}

function inspectionFor(seed: SiteSeed) {
  const base = seed.condition;
  const step = (c: string): Site["condition"] => c as Site["condition"];
  return [
    { category: "संरचना व सांगाडा", condition: step(base), notes: "मुख्य संरचना भक्कम; लक्षणीय हालचाल आढळली नाही." },
    { category: "छत व जलरोधन", condition: seed.condition === "Excellent" ? "Good" : seed.condition, notes: "२४ महिन्यांत स्थानिक दुरुस्ती सुचवली आहे." },
    { category: "बाह्य आवरण", condition: step(base), notes: "क्लॅडिंग व प्लास्टर वापरण्यायोग्य स्थितीत." },
    { category: "यांत्रिक व विद्युत", condition: seed.condition === "Poor" ? "Fair" : "Good", notes: "यंत्रणा कार्यरत; नियमित देखभाल अद्ययावत." },
    { category: "जागा व बाह्य भाग", condition: "Good", notes: "आवार, निचरा व हार्डस्टँडिंग योग्यरित्या कार्यरत." },
    { category: "नोंदी व अनुपालन", condition: seed.status === "Archived" ? "Poor" : "Good", notes: "७/१२, प्रॉपर्टी कार्ड व NA आदेश सद्यस्थितीनुसार तपासले." },
  ] as Site["inspection"];
}

// Cadastral / land-record particulars per site (Gat/Survey no. + village)
const landExtra: Record<string, { surveyNo: string; village: string }> = {
  "STE-4821": { surveyNo: "Gat No. 142/2B", village: "Kharabwadi, Chakan" },
  "STE-4796": { surveyNo: "Survey No. 87/1A", village: "Man, Mulshi" },
  "STE-4772": { surveyNo: "CTS No. 263/4", village: "Kothrud, Pune" },
  "STE-4755": { surveyNo: "Gat No. 19/3C", village: "Wagholi, Haveli" },
  "STE-4731": { surveyNo: "Survey No. 311/2", village: "Waluj, Gangapur" },
  "STE-4708": { surveyNo: "Gat No. 405/7", village: "Nira, Baramati" },
  "STE-4690": { surveyNo: "Survey No. 58/1B", village: "Ambad, Nashik" },
  "STE-4663": { surveyNo: "CTS No. 224/6", village: "Rajarampuri, Kolhapur" },
};

function stageFromProgress(p: number): WorkflowStage {
  if (p >= 100) return "Completed";
  if (p >= 66) return "Ready for Print";
  if (p >= 50) return "Documents Pending";
  if (p >= 34) return "Survey Pending";
  return "Draft";
}

const STAGE_ORDER: WorkflowStage[] = [
  "Draft",
  "Survey Pending",
  "Documents Pending",
  "Ready for Print",
  "Completed",
];

function buildTimeline(
  stage: WorkflowStage,
  surveyDate: string,
  lastUpdated: string
): TimelineStep[] {
  const idx = STAGE_ORDER.indexOf(stage);
  const defs: Array<{ key: string; label: string; minIdx: number; date: string }> = [
    { key: "created", label: "Site Created", minIdx: 0, date: surveyDate },
    { key: "survey", label: "Survey Completed", minIdx: 2, date: surveyDate },
    { key: "photos", label: "Photos Uploaded", minIdx: 2, date: surveyDate },
    { key: "documents", label: "Documents Uploaded", minIdx: 3, date: lastUpdated },
    { key: "printed", label: "Report Printed", minIdx: 4, date: lastUpdated },
  ];
  return defs.map((d) => {
    const done = idx >= d.minIdx;
    return { key: d.key, label: d.label, date: done ? d.date : null, done };
  });
}

export const sites: Site[] = seeds.map((s) => ({
  id: s.id,
  reference: s.reference,
  surveyNo: landExtra[s.id]?.surveyNo ?? "Survey No. —",
  village: landExtra[s.id]?.village ?? s.city,
  name: s.name,
  type: s.type,
  status: s.status,
  workflowStage: stageFromProgress(s.progress),
  timeline: buildTimeline(stageFromProgress(s.progress), s.surveyDate, s.lastUpdated),
  address: s.address,
  city: s.city,
  region: s.region,
  coordinates: { lat: s.lat, lng: s.lng },
  areaSqFt: s.area,
  plotSize: s.plotSize,
  yearBuilt: s.yearBuilt,
  condition: s.condition,
  surveyor: s.surveyor,
  surveyDate: s.surveyDate,
  lastUpdated: s.lastUpdated,
  valuation: s.valuation,
  valuationPerSqFt: Math.round(s.valuation / s.area),
  confidence: s.confidence,
  progress: s.progress,
  coverImage: img(s.coverSeed, 1600, 900),
  summary: s.summary,
  valuationBreakdown: breakdownFor(s),
  inspection: inspectionFor(s),
  photos: makePhotos(s.id),
  documents: makeDocs(s.id, s.surveyor.name),
}));

export function getSite(id: string): Site | undefined {
  return sites.find((s) => s.id === id);
}

export const activity: ActivityEvent[] = [
  { id: "a1", actor: "Snehal Patil", action: "ने मूल्यांकन अद्यतनित केले —", target: "Hinjawadi IT Commercial Tower", time: "२ तासांपूर्वी", type: "updated" },
  { id: "a2", actor: "Aarti Deshmukh", action: "ने मंजूर केले —", target: "Chakan Logistics Park", time: "५ तासांपूर्वी", type: "approved" },
  { id: "a3", actor: "Ganesh Pawar", action: "ने ८ फोटो अपलोड केले —", target: "Wagholi Mixed-Use Township", time: "काल", type: "upload" },
  { id: "a4", actor: "Rohan Kulkarni", action: "ने संरचनात्मक दोष नोंदवला —", target: "Waluj MIDC Industrial Estate", time: "काल", type: "comment" },
  { id: "a5", actor: "Snehal Patil", action: "ने नवीन सर्वेक्षण तयार केले —", target: "Nashik Wine Park Commercial", time: "२ दिवसांपूर्वी", type: "created" },
  { id: "a6", actor: "Aarti Deshmukh", action: "ने पुनरावलोकनाची विनंती केली —", target: "Nashik Wine Park Commercial", time: "३ दिवसांपूर्वी", type: "comment" },
];

// ---- Dashboard aggregates -------------------------------------------------

export const portfolioStats = (() => {
  const total = sites.reduce((sum, s) => sum + s.valuation, 0);
  const approved = sites.filter((s) => s.status === "Approved").length;
  const inReview = sites.filter((s) => s.status === "In Review").length;
  const draft = sites.filter((s) => s.status === "Draft").length;
  const totalArea = sites.reduce((sum, s) => sum + s.areaSqFt, 0);
  const avgConfidence = Math.round(
    sites.reduce((sum, s) => sum + s.confidence, 0) / sites.length
  );
  return {
    totalValuation: total,
    siteCount: sites.length,
    approved,
    inReview,
    draft,
    totalArea,
    avgConfidence,
    avgPerSqFt: Math.round(total / totalArea),
  };
})();

export const valuationByType = (() => {
  const map = new Map<string, number>();
  for (const s of sites) {
    map.set(s.type, (map.get(s.type) ?? 0) + s.valuation);
  }
  return Array.from(map.entries())
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value);
})();

export const statusDistribution = (() => {
  const order = ["Approved", "In Review", "Draft", "Archived"] as const;
  return order.map((label) => ({
    label,
    value: sites.filter((s) => s.status === label).length,
  }));
})();

// Monthly logged valuation (mock trend, in ₹ crore)
export const valuationTrend = [
  { month: "Jan", value: 152 },
  { month: "Feb", value: 174 },
  { month: "Mar", value: 193 },
  { month: "Apr", value: 208 },
  { month: "May", value: 235 },
  { month: "Jun", value: 262 },
  { month: "Jul", value: 288 },
];
