import SearchInput from '@/components/search-input';
import { useSearch } from '@/hooks/use-search';
import AppLayout from '@/layouts/app-layout';
import { edit, index } from '@/routes/pembangkit';
import { MasterPembangkit } from '@/services/master-pembangkit';
import { BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Pencil } from 'lucide-react';
import { Button } from 'primereact/button';
import { ButtonGroup } from 'primereact/buttongroup';
import { Column } from 'primereact/column';
import PembangkitDataTable from './data-table';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Master Pembangkit',
    href: index().url,
  },
];

const PembangkitIndex = () => {
  const { search } = useSearch('pembangkit-search');

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Master Pembangkit" />

      <div className="flex flex-col items-start gap-4 p-4">
        <div className="flex h-full w-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl bg-[var(--surface-card)] p-4">
          <div className="mt-6 flex flex-col gap-8 md:w-1/3">
            <SearchInput id="pembangkit-search" label="Cari pembangkit..." />
          </div>
          <PembangkitDataTable params={{ search }}>
            <Column field="kode" header="Kode"></Column>
            <Column field="nama" header="Nama"></Column>
            <Column field="tipe" header="Tipe"></Column>
            <Column field="kapasitas" header="Kapasitas"></Column>
            <Column
              header="Actions"
              frozen
              alignFrozen="right"
              body={(pembangkit: MasterPembangkit) => (
                <ButtonGroup>
                  <Button
                    aria-label="Edit"
                    rounded
                    outlined
                    icon={<Pencil size={16} />}
                    onClick={() => router.visit(edit(pembangkit.id))}
                  ></Button>
                </ButtonGroup>
              )}
            ></Column>
          </PembangkitDataTable>
        </div>
      </div>
    </AppLayout>
  );
};
export default PembangkitIndex;
