import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import NetworkGraph from './graph';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: dashboard().url,
  },
];

export default function Dashboard() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <iframe
          title="Dashboard Metabase"
          src="https://metabase.sipijar.my.id/public/dashboard/da963482-4070-40e9-927c-9c827107e2ed"
          className="h-[80vh] w-full border-0"
          allowTransparency
        ></iframe>
        <NetworkGraph />
      </div>
    </AppLayout>
  );
}
