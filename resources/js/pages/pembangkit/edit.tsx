import GeodeticInput from '@/components/geodetic-input';
import { update } from '@/routes/api/master-pembangkit';
import {
  MasterPembangkitForm,
  ServerMasterPembangkit,
  transformMasterPembangkit,
} from '@/services/master-pembangkit';
import { useForm } from '@inertiajs/react';
import { Button } from 'primereact/button';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { FormEvent, useMemo } from 'react';

interface MasterPembangkitEditProps {
  data: ServerMasterPembangkit;
}

const PembangkitEdit = ({ data }: MasterPembangkitEditProps) => {
  const transformedData = useMemo(
    () => transformMasterPembangkit(data),
    [data],
  );
  const form = useForm<MasterPembangkitForm>({
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

  return (
    <form
      onSubmit={submit}
      className="flex max-h-[75vh] flex-col gap-4 md:min-w-[600px]"
    >
      <div className="flex flex-col gap-8 overflow-auto">
        <div className="mt-6">
          <FloatLabel>
            <label htmlFor="kode" className="font-bold">
              Kode
            </label>
            <InputText
              id="kode"
              value={form.data.kode}
              onChange={(e) => form.setData('kode', e.target.value)}
              className="w-full"
              invalid={!!form.errors.kode}
            />
          </FloatLabel>
          {form.errors.kode && (
            <div className="flex flex-col">
              <small id={`kode-help`} className="text-red-700">
                {form.errors.kode}
              </small>
            </div>
          )}
        </div>
        <div>
          <FloatLabel>
            <label htmlFor="nama" className="font-bold">
              Nama
            </label>
            <InputText
              id="nama"
              value={form.data.nama}
              onChange={(e) => form.setData('nama', e.target.value)}
              className="w-full"
              invalid={!!form.errors.nama}
            />
          </FloatLabel>
          {form.errors.nama && (
            <div className="flex flex-col">
              <small id={`nama-help`} className="text-red-700">
                {form.errors.nama}
              </small>
            </div>
          )}
        </div>
        <div>
          <FloatLabel>
            <label htmlFor="tipe" className="font-bold">
              Tipe
            </label>
            <InputText
              id="tipe"
              value={form.data.tipe}
              onChange={(e) => form.setData('tipe', e.target.value)}
              className="w-full"
              invalid={!!form.errors.tipe}
            />
          </FloatLabel>
          {form.errors.tipe && (
            <div className="flex flex-col">
              <small id={`tipe-help`} className="text-red-700">
                {form.errors.tipe}
              </small>
            </div>
          )}
        </div>
        <div>
          <FloatLabel>
            <label htmlFor="kapasitas" className="font-bold">
              Kapasitas
            </label>
            <InputText
              id="kapasitas"
              value={form.data.kapasitas}
              onChange={(e) => form.setData('kapasitas', e.target.value)}
              className="w-full"
              invalid={!!form.errors.kapasitas}
            />
          </FloatLabel>
          {form.errors.kapasitas && (
            <div className="flex flex-col">
              <small id={`kapasitas-help`} className="text-red-700">
                {form.errors.kapasitas}
              </small>
            </div>
          )}
        </div>
        <div>
          <FloatLabel>
            <label htmlFor="pengelola" className="font-bold">
              Pengelola
            </label>
            <InputText
              id="pengelola"
              value={form.data.pengelola}
              onChange={(e) => form.setData('pengelola', e.target.value)}
              className="w-full"
              invalid={!!form.errors.pengelola}
            />
          </FloatLabel>
          {form.errors.pengelola && (
            <div className="flex flex-col">
              <small id={`pengelola-help`} className="text-red-700">
                {form.errors.pengelola}
              </small>
            </div>
          )}
        </div>
        <div className="-mt-4">
          <GeodeticInput
            label="Koordinat Pembangkit"
            latValue={form.data.latitude}
            longValue={form.data.longitude}
            onLatChange={(e) => form.setData('latitude', e.value ?? undefined)}
            onLongChange={(e) =>
              form.setData('longitude', e.value ?? undefined)
            }
            latInvalid={!!form.errors.latitude}
            longInvalid={!!form.errors.longitude}
          />
          {form.errors.latitude && (
            <div className="flex flex-col">
              <small id={`latitude-help`} className="text-red-700">
                {form.errors.latitude}
              </small>
            </div>
          )}
          {form.errors.longitude && (
            <div className="flex flex-col">
              <small id={`longitude-help`} className="text-red-700">
                {form.errors.longitude}
              </small>
            </div>
          )}
        </div>
        <div>
          <FloatLabel>
            <label htmlFor="provinsi" className="font-bold">
              Provinsi
            </label>
            <InputText
              id="provinsi"
              value={form.data.provinsi}
              onChange={(e) => form.setData('provinsi', e.target.value)}
              className="w-full"
              invalid={!!form.errors.provinsi}
            />
          </FloatLabel>
          {form.errors.provinsi && (
            <div className="flex flex-col">
              <small id={`provinsi-help`} className="text-red-700">
                {form.errors.provinsi}
              </small>
            </div>
          )}
        </div>
        <div>
          <FloatLabel>
            <label htmlFor="lokasi" className="font-bold">
              Lokasi
            </label>
            <InputText
              id="lokasi"
              value={form.data.lokasi}
              onChange={(e) => form.setData('lokasi', e.target.value)}
              className="w-full"
              invalid={!!form.errors.lokasi}
            />
          </FloatLabel>
          {form.errors.lokasi && (
            <div className="flex flex-col">
              <small id={`lokasi-help`} className="text-red-700">
                {form.errors.lokasi}
              </small>
            </div>
          )}
        </div>
        <div>
          <FloatLabel>
            <label htmlFor="deskripsi" className="font-bold">
              Deskripsi
            </label>
            <InputTextarea
              id="deskripsi"
              value={form.data.deskripsi}
              onChange={(e) => form.setData('deskripsi', e.target.value)}
              className="w-full"
              invalid={!!form.errors.deskripsi}
            />
          </FloatLabel>
          {form.errors.deskripsi && (
            <div className="flex flex-col">
              <small id={`deskripsi-help`} className="text-red-700">
                {form.errors.deskripsi}
              </small>
            </div>
          )}
        </div>
        <div>
          <FloatLabel>
            <label htmlFor="sistem_kelistrikan" className="font-bold">
              Sistem Kelistrikan
            </label>
            <InputText
              id="sistem_kelistrikan"
              value={form.data.sistem_kelistrikan}
              onChange={(e) =>
                form.setData('sistem_kelistrikan', e.target.value)
              }
              className="w-full"
              invalid={!!form.errors.sistem_kelistrikan}
            />
          </FloatLabel>
          {form.errors.sistem_kelistrikan && (
            <div className="flex flex-col">
              <small id={`sistem_kelistrikan-help`} className="text-red-700">
                {form.errors.sistem_kelistrikan}
              </small>
            </div>
          )}
        </div>
        <div>
          <FloatLabel>
            <label htmlFor="status" className="font-bold">
              Status
            </label>
            <InputText
              id="status"
              value={form.data.status}
              onChange={(e) => form.setData('status', e.target.value)}
              className="w-full"
              invalid={!!form.errors.status}
            />
          </FloatLabel>
          {form.errors.status && (
            <div className="flex flex-col">
              <small id={`status-help`} className="text-red-700">
                {form.errors.status}
              </small>
            </div>
          )}
        </div>
        <div>
          <FloatLabel>
            <label htmlFor="alias" className="font-bold">
              Alias
            </label>
            <InputText
              id="alias"
              value={form.data.alias}
              onChange={(e) => form.setData('alias', e.target.value)}
              className="w-full"
              invalid={!!form.errors.alias}
            />
          </FloatLabel>
          {form.errors.alias && (
            <div className="flex flex-col">
              <small id={`alias-help`} className="text-red-700">
                {form.errors.alias}
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
export default PembangkitEdit;
