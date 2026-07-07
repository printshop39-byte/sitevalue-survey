export type SiteStatus = "Draft" | "In Review" | "Approved" | "Archived";
export type SiteType = "Commercial" | "Industrial" | "Residential" | "Land" | "Mixed Use";
export type WorkflowStage =
  | "Draft"
  | "Survey Pending"
  | "Documents Pending"
  | "Ready for Print"
  | "Completed";

export interface TimelineStep {
  key: string;
  label: string;
  date: string | null;
  done: boolean;
}
export type ConditionRating = "Excellent" | "Good" | "Fair" | "Poor";
export type DocumentType = "Report" | "Drawing" | "Certificate" | "Legal" | "Spreadsheet";

export interface Surveyor {
  id: string;
  name: string;
  role: string;
  email: string;
  avatarColor: string;
}

export interface Photo {
  id: string;
  url: string;
  thumb: string;
  caption: string;
  category: "Exterior" | "Interior" | "Structural" | "Site" | "Defect";
  takenAt: string;
  tag?: string;
}

export interface SiteDocument {
  id: string;
  name: string;
  type: DocumentType;
  size: string;
  version: string;
  uploadedBy: string;
  uploadedAt: string;
}

export interface ValuationLine {
  label: string;
  amount: number;
}

export interface InspectionItem {
  category: string;
  condition: ConditionRating;
  notes: string;
}

export interface Site {
  id: string;
  reference: string;
  surveyNo: string;
  village: string;
  name: string;
  type: SiteType;
  status: SiteStatus;
  workflowStage: WorkflowStage;
  timeline: TimelineStep[];
  address: string;
  city: string;
  region: string;
  coordinates: { lat: number; lng: number };
  areaSqFt: number;
  plotSize: string;
  yearBuilt: number;
  condition: ConditionRating;
  surveyor: Surveyor;
  surveyDate: string;
  lastUpdated: string;
  valuation: number;
  valuationPerSqFt: number;
  confidence: number;
  progress: number;
  coverImage: string;
  summary: string;
  valuationBreakdown: ValuationLine[];
  inspection: InspectionItem[];
  photos: Photo[];
  documents: SiteDocument[];
}

export interface ActivityEvent {
  id: string;
  actor: string;
  action: string;
  target: string;
  time: string;
  type: "created" | "updated" | "approved" | "comment" | "upload";
}
