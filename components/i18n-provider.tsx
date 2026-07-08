"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  breakdownMap,
  conditionMap,
  dictionaries,
  docTypeMap,
  fill,
  inspectionCatMap,
  inspectionNoteMap,
  photoCatMap,
  stageMap,
  statusMap,
  typeMap,
  type Locale,
} from "@/lib/i18n";

const STORAGE_KEY = "sitevalue-lang";

interface I18nContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  toggleLocale: () => void;
  t: (typeof dictionaries)["en"];
  tStatus: Record<string, string>;
  tStage: Record<string, string>;
  tCondition: Record<string, string>;
  tType: Record<string, string>;
  tPhotoCat: Record<string, string>;
  tDocType: Record<string, string>;
  tBreakdown: Record<string, string>;
  tInspectionCat: Record<string, string>;
  tInspectionNote: Record<string, string>;
  /** Interpolate {placeholders} — convenience re-export. */
  fill: typeof fill;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  // Default to English on the server and first paint to avoid hydration
  // mismatch; hydrate the saved preference after mount.
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "mr") setLocaleState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* storage unavailable — language still works for the session */
    }
  }, []);

  const toggleLocale = useCallback(
    () => setLocale(locale === "en" ? "mr" : "en"),
    [locale, setLocale]
  );

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      setLocale,
      toggleLocale,
      t: dictionaries[locale],
      tStatus: statusMap[locale],
      tStage: stageMap[locale],
      tCondition: conditionMap[locale],
      tType: typeMap[locale],
      tPhotoCat: photoCatMap[locale],
      tDocType: docTypeMap[locale],
      tBreakdown: breakdownMap[locale],
      tInspectionCat: inspectionCatMap[locale],
      tInspectionNote: inspectionNoteMap[locale],
      fill,
    }),
    [locale, setLocale, toggleLocale]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return ctx;
}
