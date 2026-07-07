import { Settings } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { ComingSoon } from "@/components/coming-soon";

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-[1400px] space-y-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        title="Settings"
        description="Manage your workspace, team and valuation preferences"
        crumbs={[{ label: "Workspace", href: "/dashboard" }, { label: "Settings" }]}
      />
      <ComingSoon
        icon={Settings}
        title="Workspace Settings"
        description="Team management, valuation model configuration, branding and integrations will live here. This area is stubbed in the prototype."
      />
    </div>
  );
}
