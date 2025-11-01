import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard, map, sna } from '@/routes';
import { index as docRawIndex } from '@/routes/doc-raw';
import { index as factIndex } from '@/routes/fact';
import { index as pembangkitIndex } from '@/routes/pembangkit';
import { index as userIndex } from '@/routes/user';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
  ChartNetwork,
  FileStack,
  LayoutGrid,
  MapPinned,
  SearchCheck,
  Users,
  UtilityPole,
} from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: dashboard(),
    icon: LayoutGrid,
  },
  {
    title: 'Peta Situasi',
    href: map(),
    icon: MapPinned,
  },
  {
    title: 'Network Mapping',
    href: sna(),
    icon: ChartNetwork,
  },
  {
    title: 'Pengguna',
    href: userIndex(),
    icon: Users,
  },
  {
    title: 'Master Pembangkit',
    href: pembangkitIndex(),
    icon: UtilityPole,
  },
  {
    title: 'Document Raws',
    href: docRawIndex(),
    icon: FileStack,
  },
  {
    title: 'Fact Operational',
    href: factIndex(),
    icon: SearchCheck,
  },
];

const footerNavItems: NavItem[] = [];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href={dashboard()} prefetch>
                <AppLogo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={mainNavItems} />
      </SidebarContent>

      <SidebarFooter>
        <NavFooter items={footerNavItems} className="mt-auto" />
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
