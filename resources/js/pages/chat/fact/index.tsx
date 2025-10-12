import AppLayout from '@/layouts/app-layout';
import { index } from '@/routes/chat/fact';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import moment from 'moment';
import { Column } from 'primereact/column';
import ChatFactDataTable from './data-table';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Chat Log',
    href: index().url,
  },
];

const ChatFactIndex = () => {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Chat Log" />

      <div className="flex flex-col items-start gap-4 p-4">
        <div className="flex h-full w-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl bg-[var(--surface-card)] p-4">
          <ChatFactDataTable>
            <Column field="id" header="ID"></Column>
            <Column field="username" header="Username"></Column>
            <Column
              field="message_date"
              header="Message Time"
              body={(rowData) =>
                moment(rowData.message_date as Date).format('LLL')
              }
            ></Column>
            <Column field="metadata.topic" header="Topic"></Column>
            <Column field="message_text" header="Message Text"></Column>
          </ChatFactDataTable>
        </div>
      </div>
    </AppLayout>
  );
};
export default ChatFactIndex;
