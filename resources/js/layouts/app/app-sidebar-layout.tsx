import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { type BreadcrumbItem } from '@/types';
import { MessageSquare } from 'lucide-react';
import { Button } from 'primereact/button';
import { type PropsWithChildren } from 'react';

export default function AppSidebarLayout({
  children,
  breadcrumbs = [],
}: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
  return (
    <AppShell variant="sidebar">
      <AppSidebar />
      <AppContent variant="sidebar" className="relative overflow-x-hidden">
        <Button
          tooltip="Tanya AI"
          tooltipOptions={{ position: 'left' }}
          aria-label="Chat"
          rounded
          raised
          icon={() => <MessageSquare />}
          className="fixed! right-4 bottom-4 z-10"
          onClick={() => window.open('https://t.me/sipijar01_bot', '_blank')}
        />
        <AppSidebarHeader breadcrumbs={breadcrumbs} />
        {children}
      </AppContent>
    </AppShell>
  );
}
