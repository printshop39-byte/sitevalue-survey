"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Images, LayoutPanelTop } from "lucide-react";
import { cn } from "@/lib/utils";
import { t } from "@/lib/i18n";

export function SiteNav({ id }: { id: string }) {
  const pathname = usePathname();
  const base = `/sites/${id}`;
  const tabs = [
    { href: base, label: t.siteNav.overview, icon: LayoutPanelTop },
    { href: `${base}/photos`, label: t.siteNav.photos, icon: Images },
    { href: `${base}/documents`, label: t.siteNav.documents, icon: FileText },
  ];

  return (
    <div className="flex gap-1 overflow-x-auto border-b">
      {tabs.map((t) => {
        const Icon = t.icon;
        const active = pathname === t.href;
        return (
          <Link
            key={t.href}
            href={t.href}
            className={cn(
              "flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-2.5 text-sm font-medium transition-colors",
              active
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon className="h-4 w-4" />
            {t.label}
          </Link>
        );
      })}
    </div>
  );
}
