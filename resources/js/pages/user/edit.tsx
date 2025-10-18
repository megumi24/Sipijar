import { update } from '@/routes/api/user';
import { index } from '@/routes/user';
import {
  ServerUser,
  transformUser,
  UserForm,
  userQueries,
} from '@/services/user';
import { useAppStore } from '@/stores/app';
import { SharedData } from '@/types';
import { router, useForm, usePage } from '@inertiajs/react';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from 'primereact/button';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';
import { Tooltip } from 'primereact/tooltip';
import { FormEvent, useEffect, useMemo } from 'react';

interface UserEditProps {
  data: ServerUser;
}

const UserEdit = ({ data }: UserEditProps) => {
  const { status } = usePage<SharedData>().props;
  const toastRef = useAppStore((state) => state.toastRef);
  const queryClient = useQueryClient();

  const transformedData = useMemo(() => transformUser(data), [data]);
  const form = useForm<UserForm>({
    ...Object.fromEntries(
      Object.entries(transformedData).map(([key, value]) => [key, value ?? '']),
    ),
  });

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.transform((data) => ({
      ...data,
    }));
    form.put(update(data.id).url);
  };

  useEffect(() => {
    if (status === 'success') {
      router.visit(index());
      toastRef?.current?.show({
        severity: 'success',
        summary: 'Berhasil',
        detail: 'Berhasil menyimpan data.',
      });
      queryClient.invalidateQueries({
        queryKey: userQueries.userIndex.queryKeyWithoutParams,
      });
    }
  }, [queryClient, status, toastRef]);

  return (
    <form
      onSubmit={submit}
      className="flex max-h-[75vh] flex-col gap-4 md:min-w-[600px]"
    >
      <div className="flex flex-col gap-8 overflow-auto">
        <div className="mt-6">
          <FloatLabel
            id="username_wrapper"
            data-pr-tooltip={form.data.username}
          >
            <label htmlFor="username" className="font-bold">
              Username
            </label>
            <InputText
              id="username"
              value={form.data.username}
              className="w-full"
              invalid={!!form.errors.username}
              disabled
            />
          </FloatLabel>
          <Tooltip target="#username_wrapper" />
          {form.errors.username && (
            <div className="flex flex-col">
              <small id={`username-help`} className="text-red-700">
                {form.errors.username}
              </small>
            </div>
          )}
        </div>
        <div>
          <FloatLabel>
            <label htmlFor="first_name" className="font-bold">
              Nama Depan
            </label>
            <InputText
              id="first_name"
              value={form.data.first_name}
              onChange={(e) => form.setData('first_name', e.target.value)}
              className="w-full"
              invalid={!!form.errors.first_name}
            />
          </FloatLabel>
          {form.errors.first_name && (
            <div className="flex flex-col">
              <small id={`first_name-help`} className="text-red-700">
                {form.errors.first_name}
              </small>
            </div>
          )}
        </div>
        <div>
          <FloatLabel>
            <label htmlFor="last_name" className="font-bold">
              Nama Belakang
            </label>
            <InputText
              id="last_name"
              value={form.data.last_name}
              onChange={(e) => form.setData('last_name', e.target.value)}
              className="w-full"
              invalid={!!form.errors.last_name}
            />
          </FloatLabel>
          {form.errors.last_name && (
            <div className="flex flex-col">
              <small id={`last_name-help`} className="text-red-700">
                {form.errors.last_name}
              </small>
            </div>
          )}
        </div>
        <div>
          <div className="flex items-center gap-4 p-2">
            <label className="font-bold">Status:</label>
            <div className="flex items-center">
              <RadioButton
                checked={form.data.is_verified === true}
                inputId="is_verified"
                value={true}
                onChange={(e) => form.setData('is_verified', e.value)}
              />
              <label htmlFor="is_verified" className="ml-2">
                Verified
              </label>
            </div>
            <div className="flex items-center">
              <RadioButton
                checked={form.data.is_verified !== true}
                inputId="is_unverified"
                value={false}
                onChange={(e) => form.setData('is_verified', e.value)}
              />
              <label htmlFor="is_unverified" className="ml-2">
                Unverified
              </label>
            </div>
          </div>
          {form.errors.is_verified && (
            <div className="flex flex-col">
              <small id={`is_verified-help`} className="text-red-700">
                {form.errors.is_verified}
              </small>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-end">
        <Button label="Simpan" type="submit" loading={form.processing}></Button>
      </div>
    </form>
  );
};
export default UserEdit;
