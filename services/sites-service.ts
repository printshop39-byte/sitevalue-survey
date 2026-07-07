/**
 * Data-access boundary (service layer).
 *
 * The whole app talks to data through these functions. Today they return
 * mock data synchronously wrapped in Promises. When the backend is approved,
 * swap the bodies for Supabase queries — the calling components won't change.
 *
 *   Example future implementation:
 *   const { data } = await supabase.from("sites").select("*");
 *   return data ?? [];
 */
import { sites, getSite } from "@/lib/mock-data";
import type { Site } from "@/lib/types";

export async function listSites(): Promise<Site[]> {
  return sites;
}

export async function fetchSite(id: string): Promise<Site | null> {
  return getSite(id) ?? null;
}

export async function searchSites(query: string): Promise<Site[]> {
  const q = query.trim().toLowerCase();
  if (!q) return sites;
  return sites.filter((s) =>
    [s.name, s.reference, s.surveyNo, s.village, s.city]
      .join(" ")
      .toLowerCase()
      .includes(q)
  );
}
