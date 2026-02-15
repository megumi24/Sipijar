import GeodeticInput from '@/components/geodetic-input';
import { update } from '@/routes/api/master-transmisi';
import {
  MasterTransmisiForm,
  ServerMasterTransmisi,
  transformMasterTransmisi,
} from '@/services/master-transmisi';
import { useForm } from '@inertiajs/react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from 'primereact/button';
import { FloatLabel } from 'primereact/floatlabel';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { FormEvent, useMemo } from 'react';

interface MasterTransmisiEditProps {
  data: ServerMasterTransmisi;
}

const TransmisiEdit = ({ data }: MasterTransmisiEditProps) => {
  const transformedData = useMemo(() => transformMasterTransmisi(data), [data]);
  const form = useForm<MasterTransmisiForm>({
    ...Object.fromEntries(
      Object.entries(transformedData).map(([key, value]) => [key, value ?? '']),
    ),
    koordinat: transformedData.koordinat ?? [],
  });

  const addCoordinate = () => {
    const newCoordinates = [...(form.data.koordinat ?? [])];
    newCoordinates.push([undefined, undefined]);
    form.setData('koordinat', newCoordinates);
  };

  const updateCoordinate = (
    index: number,
    axis: 0 | 1,
    value: number | null | undefined,
  ) => {
    const safeValue = value ?? undefined;
    console.log('updateCoordinate', index, axis, value);
    form.setData(
      'koordinat',
      form.data.koordinat?.map((pair, i) =>
        i === index
          ? axis === 0
            ? [safeValue, pair[1]]
            : [pair[0], safeValue]
          : pair,
      ),
    );
  };

  const removeCoordinate = (indexToRemove: number) => {
    form.setData(
      'koordinat',
      (form.data.koordinat ?? []).filter((_, index) => index !== indexToRemove),
    );
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.transform((data) => ({
      ...data,
      koordinat: (data.koordinat ?? []).filter((pair) => {
        if (pair[0] === undefined || pair[1] === undefined) return false;
        return true;
      }),
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
            <label htmlFor="panjang_transmisi" className="font-bold">
              Panjang Transmisi
            </label>
            <InputNumber
              id="panjang_transmisi"
              value={form.data.panjang_transmisi}
              onValueChange={(e) =>
                form.setData('panjang_transmisi', e.value ?? undefined)
              }
              className="w-full"
              invalid={!!form.errors.panjang_transmisi}
            />
          </FloatLabel>
          {form.errors.panjang_transmisi && (
            <div className="flex flex-col">
              <small id={`panjang_transmisi-help`} className="text-red-700">
                {form.errors.panjang_transmisi}
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
            <label htmlFor="sistem" className="font-bold">
              Sistem
            </label>
            <InputText
              id="sistem"
              value={form.data.sistem}
              onChange={(e) => form.setData('sistem', e.target.value)}
              className="w-full"
              invalid={!!form.errors.sistem}
            />
          </FloatLabel>
          {form.errors.sistem && (
            <div className="flex flex-col">
              <small id={`sistem-help`} className="text-red-700">
                {form.errors.sistem}
              </small>
            </div>
          )}
        </div>
        <div className="-mt-4">
          <label htmlFor="coordinates" className="font-bold">
            Koordinat Transmisi
          </label>
          <div id="coordinates" className="mt-4 flex flex-col gap-2">
            {form.data.koordinat!.map(([lat, long], index) => {
              return (
                <div key={index} className="flex gap-2">
                  <GeodeticInput
                    label=""
                    latValue={lat}
                    longValue={long}
                    onLatChange={(e) => updateCoordinate(index, 0, e.value)}
                    onLongChange={(e) => updateCoordinate(index, 1, e.value)}
                  />
                  <Button
                    icon={<Trash2 />}
                    severity="secondary"
                    text
                    onClick={(e) => {
                      e.preventDefault();
                      removeCoordinate(index);
                    }}
                  />
                </div>
              );
            })}
            <div className="flex w-full justify-center">
              <Button
                icon={<Plus />}
                severity="secondary"
                outlined
                onClick={(e) => {
                  e.preventDefault();
                  addCoordinate();
                }}
              />
            </div>
          </div>
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
      </div>
      <div className="flex justify-end">
        <Button label="Simpan" type="submit" loading={form.processing}></Button>
      </div>
    </form>
  );
};
export default TransmisiEdit;
