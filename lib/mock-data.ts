import type {
  ActivityEvent,
  Photo,
  Site,
  SiteDocument,
  Surveyor,
  TimelineStep,
  WorkflowStage,
} from "./types";

// The end-client this workspace is branded for. Swap for the real client.
export const clientBrand = {
  name: "Sahyadri Land Survey Co.",
  tagline: "Survey · Valuation · Compliance",
  district: "Pune District",
};

export const surveyors: Surveyor[] = [
  { id: "u1", name: "Elena Marsh", role: "Senior Surveyor", email: "elena.marsh@sitevalue.io", avatarColor: "217 91% 42%" },
  { id: "u2", name: "David Okonkwo", role: "Structural Engineer", email: "david.o@sitevalue.io", avatarColor: "152 62% 36%" },
  { id: "u3", name: "Priya Nair", role: "Valuation Analyst", email: "priya.nair@sitevalue.io", avatarColor: "271 60% 50%" },
  { id: "u4", name: "Marcus Feld", role: "Field Surveyor", email: "marcus.feld@sitevalue.io", avatarColor: "38 92% 45%" },
];

export const currentUser = {
  name: "Elena Marsh",
  role: "Senior Surveyor",
  email: "elena.marsh@sitevalue.io",
  org: "Meridian Engineering & Valuation",
};

const img = (seed: string, w = 1200, h = 800) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

function makePhotos(prefix: string): Photo[] {
  const defs: Array<[Photo["category"], string, string?]> = [
    ["Exterior", "North elevation — primary frontage"],
    ["Exterior", "South elevation and loading bay", "Access"],
    ["Structural", "Steel frame connection detail", "Defect"],
    ["Interior", "Ground floor open-plan area"],
    ["Interior", "Mezzanine office fit-out"],
    ["Structural", "Roof truss and cladding condition"],
    ["Site", "Site boundary and hardstanding"],
    ["Defect", "Damp ingress at east wall base", "Priority"],
    ["Site", "Aerial context and access road"],
    ["Exterior", "Curtain wall glazing system"],
    ["Interior", "Plant room and services"],
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

function makeDocs(prefix: string): SiteDocument[] {
  return [
    { id: `${prefix}-d1`, name: "Full Survey Report.pdf", type: "Report", size: "4.2 MB", version: "v3.1", uploadedBy: "Elena Marsh", uploadedAt: "2026-06-28" },
    { id: `${prefix}-d2`, name: "Valuation Summary.pdf", type: "Report", size: "1.1 MB", version: "v2.0", uploadedBy: "Priya Nair", uploadedAt: "2026-06-29" },
    { id: `${prefix}-d3`, name: "Structural Drawings.dwg", type: "Drawing", size: "8.7 MB", version: "v1.4", uploadedBy: "David Okonkwo", uploadedAt: "2026-06-20" },
    { id: `${prefix}-d4`, name: "Site Boundary Plan.pdf", type: "Drawing", size: "2.3 MB", version: "v1.0", uploadedBy: "Marcus Feld", uploadedAt: "2026-06-15" },
    { id: `${prefix}-d5`, name: "EPC Certificate.pdf", type: "Certificate", size: "640 KB", version: "v1.0", uploadedBy: "Elena Marsh", uploadedAt: "2026-06-12" },
    { id: `${prefix}-d6`, name: "Title Deed & Register.pdf", type: "Legal", size: "1.9 MB", version: "v1.0", uploadedBy: "Priya Nair", uploadedAt: "2026-06-10" },
    { id: `${prefix}-d7`, name: "Cost Analysis.xlsx", type: "Spreadsheet", size: "820 KB", version: "v2.2", uploadedBy: "Priya Nair", uploadedAt: "2026-06-30" },
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
    id: "STE-4821", reference: "STE-4821", name: "Northgate Logistics Hub", type: "Industrial", status: "Approved",
    address: "12 Northgate Way", city: "Manchester", region: "North West", lat: 53.4808, lng: -2.2426,
    area: 184000, plotSize: "6.4 acres", yearBuilt: 2016, condition: "Excellent", surveyor: surveyors[0],
    surveyDate: "2026-06-18", lastUpdated: "2026-07-02", valuation: 28400000, confidence: 94, progress: 100,
    coverSeed: "northgate",
    summary: "Modern steel-portal distribution warehouse with 12 dock-level doors, 15m clear internal height and Grade-A office fit-out. Prime logistics corridor with excellent motorway access.",
  },
  {
    id: "STE-4796", reference: "STE-4796", name: "Riverside Commercial Plaza", type: "Commercial", status: "In Review",
    address: "88 Riverside Drive", city: "Leeds", region: "Yorkshire", lat: 53.7997, lng: -1.5492,
    area: 96500, plotSize: "1.8 acres", yearBuilt: 2009, condition: "Good", surveyor: surveyors[2],
    surveyDate: "2026-06-25", lastUpdated: "2026-07-05", valuation: 19750000, confidence: 88, progress: 72,
    coverSeed: "riverside",
    summary: "Multi-let office plaza over six storeys with retail at ground level. Strong tenant covenant profile; minor lift modernisation and cladding remediation recommended.",
  },
  {
    id: "STE-4772", reference: "STE-4772", name: "Elm Court Residential Block", type: "Residential", status: "Approved",
    address: "5 Elm Court", city: "Birmingham", region: "West Midlands", lat: 52.4862, lng: -1.8904,
    area: 62000, plotSize: "0.9 acres", yearBuilt: 2019, condition: "Excellent", surveyor: surveyors[0],
    surveyDate: "2026-06-10", lastUpdated: "2026-06-30", valuation: 14200000, confidence: 91, progress: 100,
    coverSeed: "elmcourt",
    summary: "48-unit residential development with communal amenity space and undercroft parking. High EPC ratings throughout and low deferred maintenance liability.",
  },
  {
    id: "STE-4755", reference: "STE-4755", name: "Dockside Mixed-Use Scheme", type: "Mixed Use", status: "Draft",
    address: "1 Harbour Point", city: "Liverpool", region: "North West", lat: 53.4084, lng: -2.9916,
    area: 128000, plotSize: "2.6 acres", yearBuilt: 2022, condition: "Excellent", surveyor: surveyors[3],
    surveyDate: "2026-07-01", lastUpdated: "2026-07-06", valuation: 24100000, confidence: 79, progress: 34,
    coverSeed: "dockside",
    summary: "Waterfront regeneration combining ground-floor leisure, mid-rise offices and residential apartments. Survey in progress; structural review of podium deck pending.",
  },
  {
    id: "STE-4731", reference: "STE-4731", name: "Fenwick Industrial Estate", type: "Industrial", status: "In Review",
    address: "Unit A, Fenwick Rd", city: "Sheffield", region: "Yorkshire", lat: 53.3811, lng: -1.4701,
    area: 210500, plotSize: "8.1 acres", yearBuilt: 2004, condition: "Fair", surveyor: surveyors[1],
    surveyDate: "2026-06-22", lastUpdated: "2026-07-04", valuation: 16850000, confidence: 82, progress: 66,
    coverSeed: "fenwick",
    summary: "Established multi-unit trade estate. Aging roof coverings and localised concrete spalling noted; capital expenditure allowance applied to valuation.",
  },
  {
    id: "STE-4708", reference: "STE-4708", name: "Greenfield Development Land", type: "Land", status: "Approved",
    address: "Off Greenfield Lane", city: "Chester", region: "North West", lat: 53.1934, lng: -2.8931,
    area: 435600, plotSize: "10.0 acres", yearBuilt: 0, condition: "Good", surveyor: surveyors[3],
    surveyDate: "2026-05-28", lastUpdated: "2026-06-18", valuation: 9600000, confidence: 76, progress: 100,
    coverSeed: "greenfield",
    summary: "Strategic development land with outline consent for employment use. Ground investigation confirms low contamination risk; serviced access to be provided.",
  },
  {
    id: "STE-4690", reference: "STE-4690", name: "Cambridge Tech Campus", type: "Commercial", status: "In Review",
    address: "3 Innovation Park", city: "Cambridge", region: "East", lat: 52.2053, lng: 0.1218,
    area: 74200, plotSize: "1.4 acres", yearBuilt: 2018, condition: "Excellent", surveyor: surveyors[2],
    surveyDate: "2026-06-30", lastUpdated: "2026-07-06", valuation: 22300000, confidence: 90, progress: 58,
    coverSeed: "cambridge",
    summary: "Purpose-built R&D and laboratory campus let to a single institutional tenant. High specification MEP services and BREEAM Excellent certification.",
  },
  {
    id: "STE-4663", reference: "STE-4663", name: "Old Mill Heritage Site", type: "Mixed Use", status: "Archived",
    address: "Mill Lane", city: "Bristol", region: "South West", lat: 51.4545, lng: -2.5879,
    area: 51800, plotSize: "1.1 acres", yearBuilt: 1898, condition: "Poor", surveyor: surveyors[1],
    surveyDate: "2026-04-14", lastUpdated: "2026-05-02", valuation: 6400000, confidence: 68, progress: 100,
    coverSeed: "oldmill",
    summary: "Grade II listed former mill with significant refurbishment liability. Valuation reflects conversion potential subject to heritage and structural constraints.",
  },
];

function breakdownFor(seed: SiteSeed) {
  const land = Math.round(seed.valuation * 0.34);
  const structure = Math.round(seed.valuation * 0.41);
  const services = Math.round(seed.valuation * 0.12);
  const external = Math.round(seed.valuation * 0.08);
  const contingency = seed.valuation - land - structure - services - external;
  return [
    { label: "Land Value", amount: land },
    { label: "Structure & Envelope", amount: structure },
    { label: "Building Services (MEP)", amount: services },
    { label: "External Works", amount: external },
    { label: "Contingency & Fees", amount: contingency },
  ];
}

function inspectionFor(seed: SiteSeed) {
  const base = seed.condition;
  const step = (c: string): Site["condition"] =>
    (c as Site["condition"]);
  return [
    { category: "Structure & Frame", condition: step(base), notes: "Primary structure sound; no significant movement recorded." },
    { category: "Roof & Waterproofing", condition: seed.condition === "Excellent" ? "Good" : seed.condition, notes: "Localised repairs recommended within 24 months." },
    { category: "External Envelope", condition: step(base), notes: "Cladding and glazing in serviceable condition." },
    { category: "Mechanical & Electrical", condition: seed.condition === "Poor" ? "Fair" : "Good", notes: "Plant operational; routine servicing up to date." },
    { category: "Site & Externals", condition: "Good", notes: "Hardstanding and drainage functioning adequately." },
    { category: "Compliance & Safety", condition: seed.status === "Archived" ? "Poor" : "Good", notes: "Fire strategy and access reviewed against current standards." },
  ] as Site["inspection"];
}

// Cadastral / land-record particulars per site (survey no. + village/locality)
const landExtra: Record<string, { surveyNo: string; village: string }> = {
  "STE-4821": { surveyNo: "SY-142/2B", village: "Trafford Park, Manchester" },
  "STE-4796": { surveyNo: "SY-087/1A", village: "Holbeck, Leeds" },
  "STE-4772": { surveyNo: "SY-263/4", village: "Digbeth, Birmingham" },
  "STE-4755": { surveyNo: "SY-019/3C", village: "Brunswick Dock, Liverpool" },
  "STE-4731": { surveyNo: "SY-311/2", village: "Attercliffe, Sheffield" },
  "STE-4708": { surveyNo: "SY-405/7A", village: "Saltney, Chester" },
  "STE-4690": { surveyNo: "SY-058/1B", village: "Cherry Hinton, Cambridge" },
  "STE-4663": { surveyNo: "SY-224/6", village: "Bedminster, Bristol" },
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
  surveyNo: landExtra[s.id]?.surveyNo ?? "SY-000/0",
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
  documents: makeDocs(s.id),
}));

export function getSite(id: string): Site | undefined {
  return sites.find((s) => s.id === id);
}

export const activity: ActivityEvent[] = [
  { id: "a1", actor: "Priya Nair", action: "updated the valuation for", target: "Riverside Commercial Plaza", time: "2h ago", type: "updated" },
  { id: "a2", actor: "Elena Marsh", action: "approved", target: "Northgate Logistics Hub", time: "5h ago", type: "approved" },
  { id: "a3", actor: "Marcus Feld", action: "uploaded 8 photos to", target: "Dockside Mixed-Use Scheme", time: "Yesterday", type: "upload" },
  { id: "a4", actor: "David Okonkwo", action: "flagged a structural defect on", target: "Fenwick Industrial Estate", time: "Yesterday", type: "comment" },
  { id: "a5", actor: "Priya Nair", action: "created a new survey for", target: "Cambridge Tech Campus", time: "2 days ago", type: "created" },
  { id: "a6", actor: "Elena Marsh", action: "requested review on", target: "Cambridge Tech Campus", time: "3 days ago", type: "comment" },
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

// Monthly logged valuation (mock trend, in millions)
export const valuationTrend = [
  { month: "Jan", value: 74 },
  { month: "Feb", value: 82 },
  { month: "Mar", value: 91 },
  { month: "Apr", value: 88 },
  { month: "May", value: 103 },
  { month: "Jun", value: 118 },
  { month: "Jul", value: 141 },
];
