import SearchInput from '@/components/search-input';
import { useSearch } from '@/hooks/use-search';
import AppLayout from '@/layouts/app-layout';
import { edit, index } from '@/routes/fact';
import { BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Check, Pencil, X } from 'lucide-react';
import moment from 'moment';
import { Button } from 'primereact/button';
import { ButtonGroup } from 'primereact/buttongroup';
import { Chip } from 'primereact/chip';
import { Column } from 'primereact/column';
import { Tooltip } from 'primereact/tooltip';
import FactDataTable from './data-table';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Fact Operational',
    href: index().url,
  },
];

const FactIndex = () => {
  const { search } = useSearch('fact-search');

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Fact Operational" />

      <div className="flex flex-col items-start gap-4 p-4">
        <div className="flex h-full w-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl bg-[var(--surface-card)] p-4">
          <div className="mt-6 flex flex-col gap-8 md:w-1/3">
            <SearchInput id="fact-search" label="Cari fact..." />
          </div>
          <FactDataTable params={{ search }}>
            <Column field="id" header="ID"></Column>
            <Column field="knowledge_code" header="Knowledge Code"></Column>
            <Column
              field="event_date"
              header="Event Date"
              body={(rowData) =>
                moment(rowData.event_date as Date).format('LL')
              }
            ></Column>
            <Column
              field="location_detail"
              header="Location Detail"
              body={(rowData) => (
                <>
                  <Tooltip
                    target={`#source-filename-${rowData.id}`}
                    content={rowData.location_detail}
                  />
                  <div
                    id={`source-filename-${rowData.id}`}
                    className="max-w-[20rem] overflow-hidden text-ellipsis whitespace-nowrap"
                  >
                    {rowData.location_detail}
                  </div>
                </>
              )}
            ></Column>
            <Column field="ahtg_code" header="ATHG Code"></Column>
            <Column field="athg_type" header="ATHG Type"></Column>
            <Column
              field="infrastructure_code"
              header="Infrastructure Code"
            ></Column>
            <Column
              field="infrastructure_name"
              header="Infrastructure Name"
            ></Column>
            <Column
              field="infrastructure_type"
              header="Infrastructure Type"
            ></Column>
            <Column field="power_system" header="Power System"></Column>
            <Column field="province" header="Province"></Column>
            <Column field="source_section" header="Source Section"></Column>
            <Column
              field="verified"
              header="Verified"
              frozen
              alignFrozen="right"
              body={(rowData) => (
                <Chip
                  label={rowData.verified ? 'Verified' : 'Unverified'}
                  className={
                    rowData.verified ? '!bg-green-500' : '!bg-gray-500'
                  }
                  icon={
                    rowData.verified ? (
                      <Check
                        key={`verified-${rowData.id}-true`}
                        size={16}
                        className="mr-2"
                      />
                    ) : (
                      <X
                        key={`verified-${rowData.id}-false`}
                        size={16}
                        className="mr-2"
                      />
                    )
                  }
                />
              )}
            ></Column>
            <Column
              header="Actions"
              frozen
              alignFrozen="right"
              body={(rowData) => (
                <ButtonGroup>
                  <Button
                    aria-label="Edit"
                    rounded
                    outlined
                    icon={<Pencil size={16} />}
                    onClick={() => router.visit(edit(rowData.id))}
                  ></Button>
                </ButtonGroup>
              )}
            ></Column>
          </FactDataTable>
        </div>
      </div>
    </AppLayout>
  );
};
export default FactIndex;
