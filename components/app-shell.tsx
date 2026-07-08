"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Bell,
  Building2,
  ChevronsUpDown,
  FileText,
  LayoutDashboard,
  LogOut,
  Map,
  Menu,
  Search,
  Settings,
  Upload,
  UserCircle,
} from "lucide-react";
import { cn, initials } from "@/lib/utils";
import { currentUser } from "@/lib/mock-data";
import { useI18n } from "@/components/i18n-provider";
import { ClientLogo } from "@/components/client-logo";
import { LanguageToggle } from "@/components/language-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function SidebarBody({ pathname }: { pathname: string }) {
  const { t } = useI18n();
  const nav = [
    { href: "/dashboard", label: t.nav.dashboard, icon: LayoutDashboard },
    { href: "/sites", label: t.nav.sites, icon: Building2 },
    { href: "/map", label: t.nav.map, icon: Map },
    { href: "/upload", label: t.nav.upload, icon: Upload },
    { href: "/reports", label: t.nav.reports, icon: FileText },
  ];
  const secondaryNav = [
    { href: "/settings", label: t.nav.settings, icon: Settings },
  ];
  const isActive = (href: string) =>
    href === "/dashboard" ? pathname === href : pathname.startsWith(href);

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center gap-2.5 border-b border-sidebar-border px-5">
        <ClientLogo className="h-8 w-8" />
        <div className="leading-tight">
          <p className="text-sm font-semibold text-sidebar-foreground">SiteValue</p>
          <p className="text-[11px] text-sidebar-foreground/60">{t.brand.subtitle}</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-sidebar-foreground/40">
          {t.brand.workspace}
        </p>
        {nav.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-sidebar-accent text-white shadow-sm"
                  : "text-sidebar-foreground/70 hover:bg-white/5 hover:text-sidebar-foreground"
              )}
            >
              <Icon className="h-[18px] w-[18px]" />
              {item.label}
            </Link>
          );
        })}

        <p className="px-3 pb-2 pt-5 text-[11px] font-semibold uppercase tracking-wider text-sidebar-foreground/40">
          {t.brand.system}
        </p>
        {secondaryNav.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-sidebar-accent text-white"
                  : "text-sidebar-foreground/70 hover:bg-white/5 hover:text-sidebar-foreground"
              )}
            >
              <Icon className="h-[18px] w-[18px]" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-3 border-t border-sidebar-border p-3">
        <div className="sm:hidden">
          <LanguageToggle variant="ghost" className="w-full justify-center" />
        </div>
        <div className="flex items-center gap-3 rounded-lg px-2 py-2">
          <Avatar className="h-9 w-9 border border-white/10">
            <AvatarFallback className="bg-sidebar-accent text-white">
              {initials(currentUser.name)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1 leading-tight">
            <p className="truncate text-sm font-medium text-sidebar-foreground">
              {currentUser.name}
            </p>
            <p className="truncate text-[11px] text-sidebar-foreground/60">
              {currentUser.role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 bg-sidebar lg:block">
        <SidebarBody pathname={pathname} />
      </aside>

      <div className="lg:pl-64">
        {/* Topbar */}
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b bg-background/80 px-4 backdrop-blur-md sm:px-6">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <SidebarBody pathname={pathname} />
            </SheetContent>
          </Sheet>

          <div className="relative hidden max-w-md flex-1 sm:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={t.common.search}
              className="h-9 border-transparent bg-muted/60 pl-9"
            />
          </div>

          <div className="ml-auto flex items-center gap-1.5">
            <LanguageToggle className="hidden sm:inline-flex" />
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive ring-2 ring-background" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-lg py-1 pl-1 pr-2 hover:bg-accent">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                      {initials(currentUser.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden text-left leading-tight md:block">
                    <p className="text-sm font-medium">{currentUser.name}</p>
                    <p className="text-[11px] text-muted-foreground">{currentUser.org}</p>
                  </div>
                  <ChevronsUpDown className="hidden h-4 w-4 text-muted-foreground md:block" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>{currentUser.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <UserCircle className="h-4 w-4" /> {t.user.profile}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="h-4 w-4" /> {t.user.preferences}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/login">
                    <LogOut className="h-4 w-4" /> {t.user.signout}
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="min-h-[calc(100vh-4rem)]">{children}</main>
      </div>
    </div>
  );
}
