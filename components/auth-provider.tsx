"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";

export type Role = "admin" | "staff";

export interface DemoUser {
  email: string;
  name: string;
  role: Role;
  roleLabel: string;
  mobile: string;
  org: string;
}

interface Account extends DemoUser {
  password: string;
}

/** The two demo accounts. Mock only — no backend, no hashing. */
export const ACCOUNTS: Account[] = [
  {
    email: "admin@kdsoft.in",
    password: "Admin@123",
    name: "Kedar Dingankar",
    role: "admin",
    roleLabel: "Super Admin",
    mobile: "+91 98220 11223",
    org: "K D SOFT",
  },
  {
    email: "staff1@kdsoft.in",
    password: "Staff@123",
    name: "Sanjay Patil",
    role: "staff",
    roleLabel: "Staff",
    mobile: "+91 91300 55447",
    org: "K D SOFT",
  },
];

const STORAGE_KEY = "sitevalue-auth";

interface AuthContextValue {
  user: DemoUser | null;
  ready: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function strip(a: Account): DemoUser {
  const { password: _pw, ...rest } = a;
  return rest;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(null);
  const [ready, setReady] = useState(false);

  // Hydrate persisted session after mount (SSR-safe).
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as DemoUser;
        // Re-validate against the known accounts so stale data can't grant access.
        const match = ACCOUNTS.find((a) => a.email === parsed.email);
        if (match) setUser(strip(match));
      }
    } catch {
      /* ignore corrupt storage */
    }
    setReady(true);
  }, []);

  const login = useCallback((email: string, password: string) => {
    const match = ACCOUNTS.find(
      (a) => a.email.toLowerCase() === email.trim().toLowerCase() && a.password === password
    );
    if (!match) return false;
    const u = strip(match);
    setUser(u);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    } catch {
      /* storage unavailable — session still works in memory */
    }
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ user, ready, login, logout }),
    [user, ready, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}

/**
 * Guard for pages inside the app shell. Redirects to /login when not signed
 * in, and to /dashboard when the signed-in role is not allowed. Returns the
 * current user plus an `allowed` flag so callers can gate rendering.
 */
export function useRequireAuth(required?: Role) {
  const { user, ready } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!ready) return;
    if (!user) {
      router.replace("/login");
    } else if (required && user.role !== required) {
      router.replace("/dashboard");
    }
  }, [ready, user, required, router, pathname]);

  const allowed = !!user && (!required || user.role === required);
  return { user, ready, allowed };
}
