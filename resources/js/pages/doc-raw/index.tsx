import SearchInput from '@/components/search-input';
import { useSearch } from '@/hooks/use-search';
import AppLayout from '@/layouts/app-layout';
import { edit, index } from '@/routes/doc-raw';
import { BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Check, Pencil, X } from 'lucide-react';
import moment from 'moment';
import { Button } from 'primereact/button';
import { ButtonGroup } from 'primereact/buttongroup';
import { Chip } from 'primereact/chip';
import { Column } from 'primereact/column';
import { Tooltip } from 'primereact/tooltip';
import DocRawDataTable from './doc-raw-data-table';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Document Raws',
    href: index().url,
  },
];

const DocRawIndex = () => {
  const { search } = useSearch('doc-raw-search');

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Document Raws" />

      <div className="flex flex-col items-start gap-4 p-4">
        <div className="flex h-full w-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl bg-[var(--surface-card)] p-4">
          <div className="mt-6 flex flex-col gap-8 md:w-1/3">
            <SearchInput id="doc-raw-search" label="Cari document..." />
          </div>
          <DocRawDataTable params={{ search }}>
            <Column field="id" header="ID"></Column>
            <Column
              field="source_filename"
              header="Source Filename"
              body={(rowData) => (
                <>
                  <Tooltip
                    target={`#source-filename-${rowData.id}`}
                    content={rowData.source_filename}
                  />
                  <div
                    id={`source-filename-${rowData.id}`}
                    className="max-w-[20rem] overflow-hidden text-ellipsis whitespace-nowrap"
                  >
                    {rowData.source_filename}
                  </div>
                </>
              )}
            ></Column>
            <Column
              field="title"
              header="Title"
              body={(rowData) => (
                <>
                  <Tooltip
                    target={`#title-${rowData.id}`}
                    content={rowData.title}
                  />
                  <div
                    id={`title-${rowData.id}`}
                    className="max-w-[20rem] overflow-hidden text-ellipsis whitespace-nowrap"
                  >
                    {rowData.title}
                  </div>
                </>
              )}
            ></Column>
            <Column field="doc_type" header="Document Type"></Column>
            <Column field="doc_category" header="Document Category"></Column>
            <Column field="knowledge_code" header="Knowledge Code"></Column>
            <Column field="upload_status" header="Upload Status"></Column>
            <Column
              field="created_date"
              header="Created Date"
              body={(rowData) =>
                moment(rowData.created_date as Date).format('LL')
              }
            ></Column>
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
          </DocRawDataTable>
        </div>
      </div>
    </AppLayout>
  );
};
export default DocRawIndex;
