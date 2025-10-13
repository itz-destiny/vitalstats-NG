
"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarBody,
  SidebarNav,
  SidebarNavHeader,
  SidebarNavHeaderTitle,
  SidebarNavLink,
  SidebarFooter,
  SidebarInset,
} from "@/components/ui/sidebar-new";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/icons";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { LayoutGrid, FilePlus2, ChevronDown, LogOut, Settings, FileText } from "lucide-react";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const userAvatar = PlaceHolderImages.find(image => image.id === 'user-avatar');

  return (
    <SidebarProvider>
      <div id="sidebar-container" className="print:hidden">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2">
              <Logo className="text-primary" />
              <h1 className="text-xl font-semibold font-headline">VitalStats NG</h1>
            </div>
          </SidebarHeader>
          <SidebarBody>
            <SidebarNav>
              <SidebarNavHeader>
                <SidebarNavHeaderTitle>Navigation</SidebarNavHeaderTitle>
              </SidebarNavHeader>
              <SidebarNavLink
                href="/"
                active={pathname === "/"}
              >
                <LayoutGrid size={16} />
                Dashboard
              </SidebarNavLink>
              <SidebarNavLink
                href="/data-entry"
                active={pathname === "/data-entry"}
              >
                <FilePlus2 size={16} />
                Data Entry
              </SidebarNavLink>
              <SidebarNavLink
                href="/reports"
                active={pathname === "/reports"}
              >
                <FileText size={16} />
                Reports
              </SidebarNavLink>
            </SidebarNav>
          </SidebarBody>
          <SidebarFooter>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start px-2">
                  <div className="flex justify-between items-center w-full">
                    <div className="flex gap-2 items-center truncate">
                      <Avatar className="h-8 w-8">
                        {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt="User Avatar" />}
                        <AvatarFallback>AU</AvatarFallback>
                      </Avatar>
                      <div className="truncate text-left">
                        <p className="font-semibold truncate">Admin User</p>
                      </div>
                    </div>
                    <ChevronDown size={16} className="text-muted-foreground" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 mb-2" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Admin User</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      admin@vitalstats.ng
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
        </Sidebar>
      </div>
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
