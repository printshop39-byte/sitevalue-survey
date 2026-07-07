import { Settings } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { ComingSoon } from "@/components/coming-soon";
import { t } from "@/lib/i18n";

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-[1400px] space-y-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        title={t.nav.settings}
        description="आपले कार्यक्षेत्र, टीम व मूल्यांकन प्राधान्ये व्यवस्थापित करा"
        crumbs={[{ label: t.brand.workspace, href: "/dashboard" }, { label: t.nav.settings }]}
      />
      <ComingSoon
        icon={Settings}
        title="कार्यक्षेत्र सेटिंग्ज"
        description="टीम व्यवस्थापन, मूल्यांकन मॉडेल कॉन्फिगरेशन, ब्रँडिंग व एकत्रीकरण येथे असतील. हा भाग प्रोटोटाइपमध्ये stub केलेला आहे."
      />
    </div>
  );
}
