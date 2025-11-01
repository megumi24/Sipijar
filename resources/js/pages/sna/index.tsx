import AppLayout from '@/layouts/app-layout';
import { sna } from '@/routes';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import NetworkGraph from './graph';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Network Mapping',
    href: sna().url,
  },
];

const SnaIndex = () => {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Network Mapping" />
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <NetworkGraph />
        <iframe
          title="Dashboard Metabase"
          src="http://metabase.sipijar.my.id/public/dashboard/64e123da-62e4-49c2-adc7-7bcbd6aa2b49"
          className="h-[85vh] w-full border-0"
          allowTransparency
        ></iframe>
      </div>
    </AppLayout>
  );
};
export default SnaIndex;
