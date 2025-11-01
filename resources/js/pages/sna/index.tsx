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
      </div>
    </AppLayout>
  );
};
export default SnaIndex;
