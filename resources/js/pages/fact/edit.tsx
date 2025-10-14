import { update } from '@/routes/api/fact';
import { index } from '@/routes/fact';
import {
  FactForm,
  factQueries,
  ServerFact,
  transformFact,
} from '@/services/fact';
import { masterPembangkitQueries } from '@/services/master-pembangkit';
import { wilayahOptionsQueries } from '@/services/wilayah';
import { useAppStore } from '@/stores/app';
import { SharedData } from '@/types';
import { router, useForm, usePage } from '@inertiajs/react';
import { useQueryClient } from '@tanstack/react-query';
import moment from 'moment';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { Tooltip } from 'primereact/tooltip';
import { FormEvent, useEffect, useMemo } from 'react';

interface FactEditProps {
  data: ServerFact;
}

const athgOptions: { value: string; label: string }[] = [
  {
    value: 'BLAC',
    label: 'Blackout',
  },
  {
    value: 'PSNK',
    label: 'Gangguan PSN Kelistrikan (Masalah Sosial Masyarakat)',
  },
  {
    value: 'DIST',
    label: 'Masalah Distribusi Energi Primer',
  },
  {
    value: 'MANG',
    label: 'Pembangkit Mangkrak',
  },
  {
    value: 'PNCR',
    label: 'Pencurian Listrik',
  },
];

const FactEdit = ({ data }: FactEditProps) => {
  const { data: provinsiOptions } =
    wilayahOptionsQueries.provinsiOptions.useQuery(undefined, {
      staleTime: Infinity,
    });
  const { data: masterPembangkitOptions } =
    masterPembangkitQueries.index.useQuery(undefined, { staleTime: Infinity });

  const { status } = usePage<SharedData>().props;
  const toastRef = useAppStore((state) => state.toastRef);
  const queryClient = useQueryClient();

  const transformedData = useMemo(() => transformFact(data), [data]);
  const form = useForm<FactForm>({
    ...Object.fromEntries(
      Object.entries(transformedData).map(([key, value]) => [key, value ?? '']),
    ),
  });

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const athg = athgOptions.find((o) => o.value === form.data.ahtg_code);
    const pembangkit = masterPembangkitOptions?.find(
      (o) => o.kode === form.data.infrastructure_code,
    );
    form.transform((data) => ({
      ...data,
      event_date: data.event_date
        ? moment(data.event_date).startOf('day').add(10, 'hours').toDate()
        : undefined,
      athg_type: athg?.label,
      infrastructure_name: pembangkit ? pembangkit.nama : undefined,
      infrastructure_type: pembangkit ? pembangkit.tipe : undefined,
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
        queryKey: factQueries.factIndex.queryKeyWithoutParams,
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
            id="knowledge_code_wrapper"
            data-pr-tooltip={form.data.knowledge_code}
          >
            <label htmlFor="knowledge_code" className="font-bold">
              Knowledge Code
            </label>
            <InputText
              id="knowledge_code"
              value={form.data.knowledge_code}
              className="w-full"
              invalid={!!form.errors.knowledge_code}
              disabled
            />
          </FloatLabel>
          <Tooltip target="#knowledge_code_wrapper" />
          {form.errors.knowledge_code && (
            <div className="flex flex-col">
              <small id={`knowledge_code-help`} className="text-red-700">
                {form.errors.knowledge_code}
              </small>
            </div>
          )}
        </div>
        <div>
          <FloatLabel>
            <label htmlFor="event_date" className="font-bold">
              Event Date
            </label>
            <Calendar
              id="event_date"
              value={form.data.event_date}
              onChange={(e) => form.setData('event_date', e.value ?? undefined)}
              className="w-full"
              invalid={!!form.errors.event_date}
              dateFormat="dd MM yy"
            />
          </FloatLabel>
          {form.errors.event_date && (
            <div className="flex flex-col">
              <small id={`event_date-help`} className="text-red-700">
                {form.errors.event_date}
              </small>
            </div>
          )}
        </div>
        <div>
          <FloatLabel>
            <label htmlFor="location_detail" className="font-bold">
              Location Detail
            </label>
            <InputText
              id="location_detail"
              value={form.data.location_detail}
              onChange={(e) => form.setData('location_detail', e.target.value)}
              className="w-full"
              invalid={!!form.errors.location_detail}
            />
          </FloatLabel>
          {form.errors.location_detail && (
            <div className="flex flex-col">
              <small id={`location_detail-help`} className="text-red-700">
                {form.errors.location_detail}
              </small>
            </div>
          )}
        </div>
        <div>
          <FloatLabel>
            <label htmlFor="ahtg_code" className="font-bold">
              Jenis ATHG
            </label>
            <Dropdown
              id="ahtg_code"
              value={form.data.ahtg_code}
              onChange={(e) => form.setData('ahtg_code', e.value)}
              className="w-full"
              options={athgOptions}
              invalid={!!form.errors.ahtg_code}
            />
          </FloatLabel>
          {form.errors.ahtg_code && (
            <div className="flex flex-col">
              <small id={`ahtg_code-help`} className="text-red-700">
                {form.errors.ahtg_code}
              </small>
            </div>
          )}
        </div>
        <div>
          <FloatLabel>
            <label htmlFor="infrastructure_code" className="font-bold">
              Pembangkit
            </label>
            <Dropdown
              id="infrastructure_code"
              value={form.data.infrastructure_code}
              onChange={(e) => form.setData('infrastructure_code', e.value)}
              className="w-full"
              options={masterPembangkitOptions}
              optionValue="kode"
              optionLabel="optionLabel"
              filter
              invalid={!!form.errors.infrastructure_code}
            />
          </FloatLabel>
          {form.errors.infrastructure_code && (
            <div className="flex flex-col">
              <small id={`infrastructure_code-help`} className="text-red-700">
                {form.errors.infrastructure_code}
              </small>
            </div>
          )}
        </div>
        <div>
          <FloatLabel>
            <label htmlFor="power_system" className="font-bold">
              Power System
            </label>
            <InputText
              id="power_system"
              value={form.data.power_system}
              onChange={(e) => form.setData('power_system', e.target.value)}
              className="w-full"
              invalid={!!form.errors.power_system}
            />
          </FloatLabel>
          {form.errors.power_system && (
            <div className="flex flex-col">
              <small id={`power_system-help`} className="text-red-700">
                {form.errors.power_system}
              </small>
            </div>
          )}
        </div>
        <div>
          <FloatLabel>
            <label htmlFor="province" className="font-bold">
              Province
            </label>
            <Dropdown
              id="province"
              value={form.data.province}
              onChange={(e) => form.setData('province', e.value)}
              className="w-full"
              editable
              options={provinsiOptions}
              invalid={!!form.errors.province}
            />
          </FloatLabel>
          {form.errors.province && (
            <div className="flex flex-col">
              <small id={`province-help`} className="text-red-700">
                {form.errors.province}
              </small>
            </div>
          )}
        </div>
        <div>
          <FloatLabel>
            <label htmlFor="modus_operandi" className="font-bold">
              Modus Operandi
            </label>
            <InputTextarea
              id="modus_operandi"
              value={form.data.modus_operandi}
              onChange={(e) => form.setData('modus_operandi', e.target.value)}
              className="w-full"
              invalid={!!form.errors.modus_operandi}
            />
          </FloatLabel>
          {form.errors.modus_operandi && (
            <div className="flex flex-col">
              <small id={`modus_operandi-help`} className="text-red-700">
                {form.errors.modus_operandi}
              </small>
            </div>
          )}
        </div>
        <div>
          <FloatLabel>
            <label htmlFor="impact_summary" className="font-bold">
              Impact Summary
            </label>
            <InputTextarea
              id="impact_summary"
              value={form.data.impact_summary}
              onChange={(e) => form.setData('impact_summary', e.target.value)}
              className="w-full"
              invalid={!!form.errors.impact_summary}
            />
          </FloatLabel>
          {form.errors.impact_summary && (
            <div className="flex flex-col">
              <small id={`impact_summary-help`} className="text-red-700">
                {form.errors.impact_summary}
              </small>
            </div>
          )}
        </div>
        <div>
          <FloatLabel>
            <label htmlFor="chronology_summary" className="font-bold">
              Chronology Summary
            </label>
            <InputTextarea
              id="chronology_summary"
              value={form.data.chronology_summary}
              onChange={(e) =>
                form.setData('chronology_summary', e.target.value)
              }
              className="w-full"
              invalid={!!form.errors.chronology_summary}
            />
          </FloatLabel>
          {form.errors.chronology_summary && (
            <div className="flex flex-col">
              <small id={`chronology_summary-help`} className="text-red-700">
                {form.errors.chronology_summary}
              </small>
            </div>
          )}
        </div>
        <div>
          <FloatLabel>
            <label htmlFor="original_excerpt" className="font-bold">
              Original Excerpt
            </label>
            <InputTextarea
              id="original_excerpt"
              value={form.data.original_excerpt}
              onChange={(e) => form.setData('original_excerpt', e.target.value)}
              className="w-full"
              invalid={!!form.errors.original_excerpt}
            />
          </FloatLabel>
          {form.errors.original_excerpt && (
            <div className="flex flex-col">
              <small id={`original_excerpt-help`} className="text-red-700">
                {form.errors.original_excerpt}
              </small>
            </div>
          )}
        </div>
        <div>
          <FloatLabel>
            <label htmlFor="source_section" className="font-bold">
              Source Section
            </label>
            <InputText
              id="source_section"
              value={form.data.source_section}
              onChange={(e) => form.setData('source_section', e.target.value)}
              className="w-full"
              invalid={!!form.errors.source_section}
            />
          </FloatLabel>
          {form.errors.source_section && (
            <div className="flex flex-col">
              <small id={`source_section-help`} className="text-red-700">
                {form.errors.source_section}
              </small>
            </div>
          )}
        </div>
        <div>
          <div className="flex items-center gap-4 p-2">
            <label className="font-bold">Status:</label>
            <div className="flex items-center">
              <RadioButton
                checked={form.data.verified === true}
                inputId="verified"
                value={true}
                onChange={(e) => form.setData('verified', e.value)}
              />
              <label htmlFor="verified" className="ml-2">
                Verified
              </label>
            </div>
            <div className="flex items-center">
              <RadioButton
                checked={form.data.verified !== true}
                inputId="unverified"
                value={false}
                onChange={(e) => form.setData('verified', e.value)}
              />
              <label htmlFor="unverified" className="ml-2">
                Unverified
              </label>
            </div>
          </div>
          {form.errors.verified && (
            <div className="flex flex-col">
              <small id={`verified-help`} className="text-red-700">
                {form.errors.verified}
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
export default FactEdit;
