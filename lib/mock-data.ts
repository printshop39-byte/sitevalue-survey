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

// The software vendor / demo owner (shown on the Company Profile page).
export const company = {
  name: "K D SOFT",
  owner: "KEDAR DINGANKAR DME",
  email: "hello@kdsoft.in",
  district: "Pune, Maharashtra",
};

// Access level = the only real permission role (Admin / Staff). `role` below is
// a display-only job designation.
export type StaffAccess = "Admin" | "Staff";
export type StaffStatus = "Active" | "Inactive";

// Job designations offered in the Add Staff dialog (display labels only).
export const staffDesignations = [
  "Survey Engineer",
  "Site Engineer",
  "Document Controller",
  "QA Reviewer",
  "Valuation Analyst",
] as const;

export interface StaffMember {
  id: string;
  name: string;
  email: string;
  mobile: string;
  role: string; // job designation (display only)
  access: StaffAccess; // permission role
  status: StaffStatus;
}

// Seed team for the Staff Management page (mock only).
export const staffSeed: StaffMember[] = [
  { id: "s1", name: "Amit Patil", email: "amit.patil@kdsoft.in", mobile: "+91 98220 44551", role: "Survey Engineer", access: "Admin", status: "Active" },
  { id: "s2", name: "Pravin Shinde", email: "pravin.shinde@kdsoft.in", mobile: "+91 91300 77820", role: "Site Engineer", access: "Staff", status: "Active" },
  { id: "s3", name: "Sneha Kulkarni", email: "sneha.kulkarni@kdsoft.in", mobile: "+91 90110 33218", role: "Document Controller", access: "Staff", status: "Active" },
  { id: "s4", name: "Akash More", email: "akash.more@kdsoft.in", mobile: "+91 93250 66104", role: "Survey Engineer", access: "Staff", status: "Inactive" },
  { id: "s5", name: "Pooja Patil", email: "pooja.patil@kdsoft.in", mobile: "+91 94040 22309", role: "QA Reviewer", access: "Staff", status: "Active" },
];

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
    id: "STE-4821", reference: "STE-4821", name: "Mumbai Port Warehouse", type: "Industrial", status: "Approved",
    address: "Indira Dock, Mumbai Port Trust", city: "Mumbai", region: "Mumbai", lat: 18.949, lng: 72.848,
    area: 210000, plotSize: "5.2 acres", yearBuilt: 2015, condition: "Excellent", surveyor: surveyors[0],
    surveyDate: "2026-06-18", lastUpdated: "2026-07-02", valuation: 720000000, confidence: 93, progress: 100,
    coverSeed: "mumbaiport",
    summary: "Bonded transit warehouse within the Mumbai Port estate with rail siding access and 11m clear height. Prime last-mile logistics location serving the JNPT and city distribution corridors.",
  },
  {
    id: "STE-4796", reference: "STE-4796", name: "Kolhapur MIDC Engineering Unit", type: "Industrial", status: "In Review",
    address: "Shiroli MIDC, Plot E-42", city: "Kolhapur", region: "Kolhapur", lat: 16.705, lng: 74.2433,
    area: 128000, plotSize: "3.1 acres", yearBuilt: 2011, condition: "Good", surveyor: surveyors[1],
    surveyDate: "2026-06-25", lastUpdated: "2026-07-05", valuation: 356000000, confidence: 87, progress: 72,
    coverSeed: "kolhapurmidc",
    summary: "Multi-bay engineering and foundry unit in Shiroli MIDC with EOT crane gantries and dedicated power feeder. Roof sheeting refurbishment recommended within the next maintenance cycle.",
  },
  {
    id: "STE-4772", reference: "STE-4772", name: "Pune Ring Road Commercial Plot", type: "Commercial", status: "Approved",
    address: "Mundhwa, Pune Ring Road", city: "Pune", region: "Pune", lat: 18.533, lng: 73.933,
    area: 96000, plotSize: "2.2 acres", yearBuilt: 2019, condition: "Excellent", surveyor: surveyors[0],
    surveyDate: "2026-06-10", lastUpdated: "2026-06-30", valuation: 512000000, confidence: 91, progress: 100,
    coverSeed: "puneringroad",
    summary: "Frontage commercial plot on the Pune Ring Road alignment with high visibility and approved access. Strong appreciation outlook driven by the ring-road infrastructure programme.",
  },
  {
    id: "STE-4755", reference: "STE-4755", name: "Sangli Industrial Plot", type: "Industrial", status: "Draft",
    address: "Kupwad MIDC, Plot C-18", city: "Sangli", region: "Sangli", lat: 16.8524, lng: 74.5815,
    area: 84000, plotSize: "1.9 acres", yearBuilt: 2022, condition: "Excellent", surveyor: surveyors[3],
    surveyDate: "2026-07-01", lastUpdated: "2026-07-06", valuation: 288000000, confidence: 79, progress: 34,
    coverSeed: "sangliplot",
    summary: "Recently developed industrial plot in Kupwad MIDC, Sangli with new shed structure. Survey in progress; boundary demarcation and services connection verification pending.",
  },
  {
    id: "STE-4731", reference: "STE-4731", name: "Satara Highway Commercial Site", type: "Commercial", status: "In Review",
    address: "NH-48, Powai Naka, Satara", city: "Satara", region: "Satara", lat: 17.6805, lng: 74.0183,
    area: 72000, plotSize: "1.6 acres", yearBuilt: 2018, condition: "Fair", surveyor: surveyors[1],
    surveyDate: "2026-06-22", lastUpdated: "2026-07-04", valuation: 246000000, confidence: 82, progress: 66,
    coverSeed: "satarahighway",
    summary: "Roadside commercial site on the Mumbai–Bengaluru (NH-48) corridor at Satara with fuel-retail and hospitality potential. Localised pavement and drainage remediation noted.",
  },
  {
    id: "STE-4708", reference: "STE-4708", name: "Nashik Ambad Industrial Estate", type: "Industrial", status: "Approved",
    address: "Ambad MIDC, Plot B-73", city: "Nashik", region: "Nashik", lat: 19.9975, lng: 73.7898,
    area: 154000, plotSize: "3.6 acres", yearBuilt: 2016, condition: "Good", surveyor: surveyors[3],
    surveyDate: "2026-05-28", lastUpdated: "2026-06-18", valuation: 398000000, confidence: 88, progress: 100,
    coverSeed: "nashikambad",
    summary: "Established manufacturing unit in Ambad MIDC, Nashik with office block and utilities. Well-maintained asset with good compliance record and steady tenant covenant.",
  },
  {
    id: "STE-4690", reference: "STE-4690", name: "Nagpur MIHAN Logistics Park", type: "Industrial", status: "In Review",
    address: "MIHAN SEZ, Khapri, Nagpur", city: "Nagpur", region: "Nagpur", lat: 21.1, lng: 79.05,
    area: 265000, plotSize: "8.4 acres", yearBuilt: 2020, condition: "Excellent", surveyor: surveyors[2],
    surveyDate: "2026-06-30", lastUpdated: "2026-07-06", valuation: 610000000, confidence: 90, progress: 58,
    coverSeed: "nagpurmihan",
    summary: "Grade-A logistics park within the MIHAN SEZ, Nagpur with multi-modal connectivity to air and rail cargo. High-specification build and strong central-India distribution demand.",
  },
  {
    id: "STE-4663", reference: "STE-4663", name: "Chh. Sambhajinagar Land Parcel", type: "Land", status: "Archived",
    address: "Waluj, Chh. Sambhajinagar", city: "Chh. Sambhajinagar", region: "Chh. Sambhajinagar", lat: 19.83, lng: 75.24,
    area: 320000, plotSize: "7.3 acres", yearBuilt: 0, condition: "Good", surveyor: surveyors[1],
    surveyDate: "2026-04-14", lastUpdated: "2026-05-02", valuation: 132000000, confidence: 74, progress: 100,
    coverSeed: "sambhajinagarland",
    summary: "Non-agricultural land parcel adjoining the Waluj industrial belt, Chhatrapati Sambhajinagar. Suitable for warehousing subject to zone conversion; clear title and road frontage confirmed.",
  },
];

function breakdownFor(seed: SiteSeed) {
  const land = Math.round(seed.valuation * 0.34);
  const structure = Math.round(seed.valuation * 0.41);
  const services = Math.round(seed.valuation * 0.12);
  const external = Math.round(seed.valuation * 0.08);
  const contingency = seed.valuation - land - structure - services - external;
  return [
    { key: "land", amount: land },
    { key: "structure", amount: structure },
    { key: "services", amount: services },
    { key: "external", amount: external },
    { key: "contingency", amount: contingency },
  ];
}

function inspectionFor(seed: SiteSeed): Site["inspection"] {
  const base = seed.condition;
  return [
    { key: "structure", condition: base },
    { key: "roof", condition: seed.condition === "Excellent" ? "Good" : seed.condition },
    { key: "envelope", condition: base },
    { key: "mep", condition: seed.condition === "Poor" ? "Fair" : "Good" },
    { key: "site", condition: "Good" },
    { key: "records", condition: seed.status === "Archived" ? "Poor" : "Good" },
  ];
}

// Cadastral / land-record particulars per site (Gat/Survey no. + village)
const landExtra: Record<string, { surveyNo: string; village: string }> = {
  "STE-4821": { surveyNo: "CTS No. 1123/A", village: "Indira Dock, Mumbai" },
  "STE-4796": { surveyNo: "Plot No. E-42, MIDC", village: "Shiroli, Kolhapur" },
  "STE-4772": { surveyNo: "Gat No. 214/2", village: "Mundhwa, Pune" },
  "STE-4755": { surveyNo: "Plot No. C-18, MIDC", village: "Kupwad, Sangli" },
  "STE-4731": { surveyNo: "Gat No. 88/1", village: "Powai Naka, Satara" },
  "STE-4708": { surveyNo: "Plot No. B-73, MIDC", village: "Ambad, Nashik" },
  "STE-4690": { surveyNo: "MIHAN Plot No. 12", village: "Khapri, Nagpur" },
  "STE-4663": { surveyNo: "Gat No. 405/7", village: "Waluj, Chh. Sambhajinagar" },
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
  { id: "a1", actor: "Snehal Patil", action: { en: "updated the valuation —", mr: "ने मूल्यांकन अद्यतनित केले —" }, target: "Kolhapur MIDC Engineering Unit", time: { en: "2 hours ago", mr: "२ तासांपूर्वी" }, type: "updated" },
  { id: "a2", actor: "Aarti Deshmukh", action: { en: "approved —", mr: "ने मंजूर केले —" }, target: "Mumbai Port Warehouse", time: { en: "5 hours ago", mr: "५ तासांपूर्वी" }, type: "approved" },
  { id: "a3", actor: "Ganesh Pawar", action: { en: "uploaded 8 photos —", mr: "ने ८ फोटो अपलोड केले —" }, target: "Sangli Industrial Plot", time: { en: "Yesterday", mr: "काल" }, type: "upload" },
  { id: "a4", actor: "Rohan Kulkarni", action: { en: "logged a structural defect —", mr: "ने संरचनात्मक दोष नोंदवला —" }, target: "Satara Highway Commercial Site", time: { en: "Yesterday", mr: "काल" }, type: "comment" },
  { id: "a5", actor: "Snehal Patil", action: { en: "created a new survey —", mr: "ने नवीन सर्वेक्षण तयार केले —" }, target: "Nagpur MIHAN Logistics Park", time: { en: "2 days ago", mr: "२ दिवसांपूर्वी" }, type: "created" },
  { id: "a6", actor: "Aarti Deshmukh", action: { en: "requested a review —", mr: "ने पुनरावलोकनाची विनंती केली —" }, target: "Nagpur MIHAN Logistics Park", time: { en: "3 days ago", mr: "३ दिवसांपूर्वी" }, type: "comment" },
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
