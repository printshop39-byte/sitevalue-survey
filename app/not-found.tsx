import Link from "next/link";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Compass className="h-8 w-8" />
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">पृष्ठ सापडले नाही</h1>
        <p className="max-w-md text-muted-foreground">
          आपण शोधत असलेली साइट किंवा पृष्ठ अस्तित्वात नाही किंवा संग्रहित केले
          असावे.
        </p>
      </div>
      <div className="flex gap-3">
        <Button asChild>
          <Link href="/dashboard">डॅशबोर्डवर परत</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/sites">साइट्स पहा</Link>
        </Button>
      </div>
    </div>
  );
}
