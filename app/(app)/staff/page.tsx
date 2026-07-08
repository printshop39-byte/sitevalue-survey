"use client";

import { useState } from "react";
import { MoreVertical, Power, Trash2, Users } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { EmptyState } from "@/components/empty-state";
import { AddStaffDialog } from "@/components/add-staff-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { staffSeed, type StaffMember } from "@/lib/mock-data";
import { initials } from "@/lib/utils";
import { useI18n } from "@/components/i18n-provider";
import { useRequireAuth } from "@/components/auth-provider";

export default function StaffPage() {
  const { t, fill } = useI18n();
  const { allowed } = useRequireAuth("admin");
  const [members, setMembers] = useState<StaffMember[]>(() => [...staffSeed]);

  if (!allowed) return null;

  const toggleStatus = (id: string) =>
    setMembers((m) =>
      m.map((s) =>
        s.id === id
          ? { ...s, status: s.status === "Active" ? "Inactive" : "Active" }
          : s
      )
    );

  const remove = (id: string) =>
    setMembers((m) => m.filter((s) => s.id !== id));

  return (
    <div className="mx-auto max-w-[1400px] space-y-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        title={t.staff.title}
        description={t.staff.subtitle}
        crumbs={[
          { label: t.nav.administration, href: "/dashboard" },
          { label: t.staff.title },
        ]}
        actions={<AddStaffDialog onAdd={(m) => setMembers((prev) => [m, ...prev])} />}
      />

      <p className="text-sm text-muted-foreground">
        {fill(t.staff.total, { n: members.length })}
      </p>

      {members.length === 0 ? (
        <EmptyState icon={Users} title={t.staff.empty} />
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t.staff.colName}</TableHead>
                  <TableHead>{t.staff.colEmail}</TableHead>
                  <TableHead>{t.staff.colMobile}</TableHead>
                  <TableHead>{t.staff.colRole}</TableHead>
                  <TableHead>{t.staff.colAccess}</TableHead>
                  <TableHead>{t.staff.colStatus}</TableHead>
                  <TableHead className="text-right">{t.staff.colAction}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-secondary text-[10px]">
                            {initials(s.name)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{s.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {s.email}
                    </TableCell>
                    <TableCell className="whitespace-nowrap font-mono text-xs text-muted-foreground">
                      {s.mobile}
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-sm">
                      {s.role}
                    </TableCell>
                    <TableCell>
                      <Badge variant={s.access === "Admin" ? "default" : "muted"}>
                        {s.access === "Admin" ? t.staff.accessAdmin : t.staff.accessStaff}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={s.status === "Active" ? "success" : "muted"}
                        className="gap-1.5 pl-2"
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            s.status === "Active" ? "bg-success" : "bg-muted-foreground"
                          }`}
                        />
                        {s.status === "Active" ? t.staff.active : t.staff.inactive}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => toggleStatus(s.id)}>
                            <Power className="h-4 w-4" />
                            {s.status === "Active" ? t.staff.deactivate : t.staff.activate}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => remove(s.id)}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" /> {t.staff.remove}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      )}
    </div>
  );
}
