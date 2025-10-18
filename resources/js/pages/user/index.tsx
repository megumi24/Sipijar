import SearchInput from '@/components/search-input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import { useSearch } from '@/hooks/use-search';
import AppLayout from '@/layouts/app-layout';
import { edit, index } from '@/routes/user';
import { BreadcrumbItem, User } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Check, Pencil, X } from 'lucide-react';
import { Button } from 'primereact/button';
import { ButtonGroup } from 'primereact/buttongroup';
import { Chip } from 'primereact/chip';
import { Column } from 'primereact/column';
import UserDataTable from './data-table';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Users',
    href: index().url,
  },
];

const UserIndex = () => {
  const { search } = useSearch('user-search');
  const getInitials = useInitials();

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Users" />

      <div className="flex flex-col items-start gap-4 p-4">
        <div className="flex h-full w-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl bg-[var(--surface-card)] p-4">
          <div className="mt-6 flex flex-col gap-8 md:w-1/3">
            <SearchInput id="user-search" label="Cari user..." />
          </div>
          <UserDataTable params={{ search }}>
            <Column field="username" header="Username"></Column>
            <Column
              header="Foto"
              body={(user: User) => (
                <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                  <AvatarImage src={user.photo_url} alt={user.first_name} />
                  <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                    {getInitials(
                      `${user.first_name ?? ''} ${user.last_name ?? ''}`.trim(),
                    )}
                  </AvatarFallback>
                </Avatar>
              )}
            ></Column>
            <Column
              header="Nama"
              body={(rowData: User) =>
                `${rowData.first_name ?? ''} ${rowData.last_name ?? ''}`.trim()
              }
            ></Column>
            <Column
              field="is_verified"
              header="Verified"
              frozen
              alignFrozen="right"
              body={(user: User) => (
                <Chip
                  label={user.is_verified ? 'Verified' : 'Unverified'}
                  className={
                    user.is_verified ? '!bg-green-500' : '!bg-gray-500'
                  }
                  icon={
                    user.is_verified ? (
                      <Check
                        key={`is-verified-${user.id}-true`}
                        size={16}
                        className="mr-2"
                      />
                    ) : (
                      <X
                        key={`is-verified-${user.id}-false`}
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
              body={(user: User) => (
                <ButtonGroup>
                  <Button
                    aria-label="Edit"
                    rounded
                    outlined
                    icon={<Pencil size={16} />}
                    onClick={() => router.visit(edit(user.id))}
                  ></Button>
                </ButtonGroup>
              )}
            ></Column>
          </UserDataTable>
        </div>
      </div>
    </AppLayout>
  );
};
export default UserIndex;
