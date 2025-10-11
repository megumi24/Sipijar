import AppLayout from '@/layouts/app-layout';
import { docRaw } from '@/routes';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Column } from 'primereact/column';
import { Tooltip } from 'primereact/tooltip';
import DocRawDataTable from './doc-raw-data-table';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Document Raws',
    href: docRaw().url,
  },
];

const DocRawIndex = () => {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Document Raws" />
      <div className="m-4 flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl bg-[var(--surface-card)] p-4">
        <DocRawDataTable>
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
          <Column field="doc_type" header="Document Type"></Column>
          <Column field="doc_category" header="Document Category"></Column>
          <Column field="knowledge_code" header="Knowledge Code"></Column>
          <Column field="upload_status" header="Upload Status"></Column>
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
          <Column field="created_date" header="Created Date"></Column>
          <Column field="verified" header="Verified"></Column>
        </DocRawDataTable>
      </div>
    </AppLayout>
  );
};
export default DocRawIndex;
