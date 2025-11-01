import SearchInput from '@/components/search-input';
import { useSearch } from '@/hooks/use-search';
import AppLayout from '@/layouts/app-layout';
import { edit, index } from '@/routes/transmisi';
import { MasterTransmisi } from '@/services/master-transmisi';
import { BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Pencil } from 'lucide-react';
import { Button } from 'primereact/button';
import { ButtonGroup } from 'primereact/buttongroup';
import { Column } from 'primereact/column';
import TransmisiDataTable from './data-table';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Master Transmisi',
    href: index().url,
  },
];

const TransmisiIndex = () => {
  const { search } = useSearch('transmisi-search');

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Master Transmisi" />

      <div className="flex flex-col items-start gap-4 p-4">
        <div className="flex h-full w-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl bg-[var(--surface-card)] p-4">
          <div className="mt-6 flex flex-col gap-8 md:w-1/3">
            <SearchInput id="transmisi-search" label="Cari Transmisi..." />
          </div>
          <TransmisiDataTable params={{ search }}>
            <Column field="id" header="ID"></Column>
            <Column field="nama" header="Nama"></Column>
            <Column
              field="panjang_transmisi"
              header="Panjang Transmisi"
            ></Column>
            <Column field="sistem" header="Sistem"></Column>
            <Column field="status" header="Status"></Column>
            <Column
              header="Actions"
              frozen
              alignFrozen="right"
              body={(transmisi: MasterTransmisi) => (
                <ButtonGroup>
                  <Button
                    aria-label="Edit"
                    rounded
                    outlined
                    icon={<Pencil size={16} />}
                    onClick={() => router.visit(edit(transmisi.id))}
                  ></Button>
                </ButtonGroup>
              )}
            ></Column>
          </TransmisiDataTable>
        </div>
      </div>
    </AppLayout>
  );
};
export default TransmisiIndex;
