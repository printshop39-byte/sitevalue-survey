"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/native-select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useI18n } from "@/components/i18n-provider";
import { staffDesignations, type StaffAccess, type StaffMember } from "@/lib/mock-data";

let idSeq = 100;

export function AddStaffDialog({
  onAdd,
}: {
  onAdd: (member: StaffMember) => void;
}) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<"form" | "saving" | "done">("form");
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirm: "",
    role: staffDesignations[0] as string,
    access: "Staff" as StaffAccess,
  });

  const set = (k: keyof typeof form) => (v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  function reset() {
    setForm({
      name: "",
      email: "",
      mobile: "",
      password: "",
      confirm: "",
      role: staffDesignations[0],
      access: "Staff",
    });
    setError(null);
    setPhase("form");
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.mobile.trim() || !form.password) {
      setError(t.addStaff.errRequired);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError(t.addStaff.errEmail);
      return;
    }
    if (form.password !== form.confirm) {
      setError(t.addStaff.errMismatch);
      return;
    }
    setError(null);
    setPhase("saving");
    // Simulated creation — mock state only.
    window.setTimeout(() => {
      onAdd({
        id: `s${++idSeq}`,
        name: form.name.trim(),
        email: form.email.trim(),
        mobile: form.mobile.trim(),
        role: form.role,
        access: form.access,
        status: "Active",
      });
      setPhase("done");
    }, 1000);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) reset();
      }}
    >
      <DialogTrigger asChild>
        <Button>
          <UserPlus className="h-4 w-4" /> {t.staff.add}
        </Button>
      </DialogTrigger>
      <DialogContent>
        {phase === "done" ? (
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-success/15 text-success">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-semibold">{t.addStaff.successTitle}</h3>
              <p className="text-sm text-muted-foreground">
                {t.addStaff.successBody.replace("{name}", form.name.trim())}
              </p>
            </div>
            <Button onClick={() => setOpen(false)}>{t.upload.done}</Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>{t.addStaff.title}</DialogTitle>
              <DialogDescription>{t.addStaff.subtitle}</DialogDescription>
            </DialogHeader>
            <form onSubmit={submit} className="space-y-4">
              <div className="space-y-1.5">
                <Label>{t.addStaff.fullName} *</Label>
                <Input
                  value={form.name}
                  onChange={(e) => set("name")(e.target.value)}
                  placeholder={t.addStaff.fullNamePh}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label>{t.addStaff.email} *</Label>
                  <Input
                    type="email"
                    value={form.email}
                    onChange={(e) => set("email")(e.target.value)}
                    placeholder={t.addStaff.emailPh}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>{t.addStaff.mobile} *</Label>
                  <Input
                    value={form.mobile}
                    onChange={(e) => set("mobile")(e.target.value)}
                    placeholder={t.addStaff.mobilePh}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>{t.addStaff.password} *</Label>
                  <Input
                    type="password"
                    value={form.password}
                    onChange={(e) => set("password")(e.target.value)}
                    placeholder="••••••••"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>{t.addStaff.confirm} *</Label>
                  <Input
                    type="password"
                    value={form.confirm}
                    onChange={(e) => set("confirm")(e.target.value)}
                    placeholder="••••••••"
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label>{t.addStaff.role}</Label>
                  <NativeSelect
                    value={form.role}
                    onChange={(e) => set("role")(e.target.value)}
                  >
                    {staffDesignations.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </NativeSelect>
                </div>
                <div className="space-y-1.5">
                  <Label>{t.addStaff.access}</Label>
                  <NativeSelect
                    value={form.access}
                    onChange={(e) => set("access")(e.target.value)}
                  >
                    <option value="Staff">{t.staff.accessStaff}</option>
                    <option value="Admin">{t.staff.accessAdmin}</option>
                  </NativeSelect>
                </div>
              </div>

              {error && (
                <p className="rounded-md bg-destructive/10 px-3 py-2 text-xs font-medium text-destructive">
                  {error}
                </p>
              )}

              <div className="flex justify-end gap-2 pt-1">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
                  {t.common.cancel}
                </Button>
                <Button type="submit" disabled={phase === "saving"}>
                  {phase === "saving" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> {t.addStaff.creating}
                    </>
                  ) : (
                    t.addStaff.create
                  )}
                </Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
