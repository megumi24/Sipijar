import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { dashboard } from '@/routes';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Button } from 'primereact/button';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: dashboard().url,
  },
];

export default function Dashboard() {
  const { props } = usePage<SharedData>();
  const canManage = props.auth.can.manage;
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        {canManage && (
          <div className="flex justify-end">
            <Button
              label="Manage Dashboard"
              size="small"
              onClick={() =>
                window.open('https://metabase.sipijar.my.id/', '_blank')
              }
            />
          </div>
        )}
        <iframe
          title="Dashboard Metabase"
          src="https://metabase.sipijar.my.id/public/dashboard/da963482-4070-40e9-927c-9c827107e2ed"
          className={cn('w-full border-0', canManage ? 'h-[80vh]' : 'h-[85vh]')}
          allowTransparency
        ></iframe>
      </div>
    </AppLayout>
  );
}
