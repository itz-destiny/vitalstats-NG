"use client"
import * as React from "react"
import Link from "next/link"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"
import { Sheet, SheetContent } from "@/components/ui/sheet"

const sidebar = cva(
  "group flex flex-col h-full w-full bg-sidebar text-sidebar-foreground data-[collapsed=true]:w-14 data-[collapsed=true]:[--sidebar-nav-header-display:none] data-[collapsed=true]:[--sidebar-body-padding:theme(spacing.2)]"
)

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed, isOpen, setIsOpen, isMobile }}>
      <div className="flex min-h-screen">
        {!isMobile && (
          <div className="relative w-auto border-r">
            <div data-collapsed={isCollapsed} className={cn(sidebar(), "transition-all duration-300 ease-in-out")}>
              {children}
            </div>
          </div>
        )}
        {isMobile && (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetContent side="left" className="p-0 w-72">
                  <div data-collapsed={false} className={sidebar()}>
                    {children}
                  </div>
                </SheetContent>
            </Sheet>
        )}
      </div>
    </SidebarContext.Provider>
  );
};

export const useSidebarContext = () => {
  const context = React.useContext(SidebarContext);
  if (!context) throw new Error("useSidebarContext must be used within a SidebarProvider");
  return context;
};

const SidebarContext = React.createContext<{ isCollapsed: boolean; setIsCollapsed: (v: boolean) => void; isOpen: boolean; setIsOpen: (v: boolean) => void; isMobile: boolean } | undefined>(undefined);

export const Sidebar = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
  const { isCollapsed } = useSidebarContext();
  return <div ref={ref} data-collapsed={isCollapsed} className={cn(sidebar({ className }))} {...props} />;
});
Sidebar.displayName = "Sidebar";

export const SidebarHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("flex items-center border-b p-4", className)} {...props} />;
});
SidebarHeader.displayName = "SidebarHeader";

export const SidebarMain = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("flex-1", className)} {...props} />;
});
SidebarMain.displayName = "SidebarMain";

export const SidebarBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("flex-1 overflow-y-auto overflow-x-hidden p-[var(--sidebar-body-padding,theme(spacing.4))]", className)} {...props} />;
});
SidebarBody.displayName = "SidebarBody";

export const SidebarNav = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(({ className, ...props }, ref) => {
  return <nav ref={ref} className={cn("flex flex-col gap-1", className)} {...props} />;
});
SidebarNav.displayName = "SidebarNav";

export const SidebarNavHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("px-2 pb-1 text-xs font-medium text-muted-foreground [display:var(--sidebar-nav-header-display,revert)]", className)} {...props} />;
});
SidebarNavHeader.displayName = "SidebarNavHeader";

export const SidebarNavHeaderTitle = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(({ className, ...props }, ref) => {
  return <span ref={ref} className={cn("flex-1", className)} {...props} />;
});
SidebarNavHeaderTitle.displayName = "SidebarNavHeaderTitle";

export const SidebarNavLink = React.forwardRef<HTMLAnchorElement, { href: string; active?: boolean } & React.AnchorHTMLAttributes<HTMLAnchorElement>>(({ className, children, active, ...props }, ref) => {
  const { isCollapsed } = useSidebarContext();
  return (
    <Link ref={ref} className={cn("flex items-center gap-2 rounded-md px-2 py-2 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground", active && "bg-sidebar-accent text-sidebar-accent-foreground", isCollapsed && "justify-center", className)} {...props}>
      {children}
       <span className={cn("flex-1", isCollapsed && "hidden")}>{ (children as any)[1] || ''}</span>
    </Link>
  );
});
SidebarNavLink.displayName = "SidebarNavLink";

export const SidebarFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("mt-auto border-t p-4", className)} {...props} />;
});
SidebarFooter.displayName = "SidebarFooter";

export const SidebarInset = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
    return <main ref={ref} className={cn("flex-1 p-4 sm:p-6 lg:p-8", className)} {...props} />;
});
SidebarInset.displayName = "SidebarInset";
