import AppLayout from '@/layouts/app-layout';
import Leaflet from '@/pages/map/leaflet';
import { map } from '@/routes';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Peta Situasi',
    href: map().url,
  },
];

const MapIndex = () => {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Peta Situasi" />
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <Leaflet />
      </div>
    </AppLayout>
  );
};
export default MapIndex;
