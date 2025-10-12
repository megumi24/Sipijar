import AppLayout from '@/layouts/app-layout';
import { index } from '@/routes/chat/fact';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
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
            <Column field="message.type" header="Chat Type"></Column>
            <Column field="message.content" header="Message"></Column>
          </ChatFactDataTable>
        </div>
      </div>
    </AppLayout>
  );
};
export default ChatFactIndex;
