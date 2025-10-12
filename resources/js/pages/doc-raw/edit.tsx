import { update } from '@/routes/api/doc-raw';
import { index } from '@/routes/doc-raw';
import {
  DocRawForm,
  docRawQueries,
  ServerDocRaw,
  transformDocRaw,
} from '@/services/doc-raw';
import { useAppStore } from '@/stores/app';
import { SharedData } from '@/types';
import { router, useForm, usePage } from '@inertiajs/react';
import { useQueryClient } from '@tanstack/react-query';
import moment from 'moment';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { Tooltip } from 'primereact/tooltip';
import { FormEvent, useEffect, useMemo } from 'react';

interface DocRawEditProps {
  data: ServerDocRaw;
}

const DocRawEdit = ({ data }: DocRawEditProps) => {
  const { status } = usePage<SharedData>().props;
  const toastRef = useAppStore((state) => state.toastRef);
  const queryClient = useQueryClient();

  const transformedData = useMemo(() => transformDocRaw(data), [data]);
  const form = useForm<DocRawForm>({
    ...Object.fromEntries(
      Object.entries(transformedData).map(([key, value]) => [key, value ?? '']),
    ),
  });

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.transform((data) => ({
      ...data,
      created_date: data.created_date
        ? moment(data.created_date).startOf('day').add(10, 'hours').toDate()
        : undefined,
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
        queryKey: docRawQueries.docRawIndex.queryKeyWithoutParams,
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
            id="source_filename_wrapper"
            data-pr-tooltip={form.data.source_filename}
          >
            <label htmlFor="source_filename" className="font-bold">
              Source Filename
            </label>
            <InputText
              id="source_filename"
              value={form.data.source_filename}
              className="w-full"
              invalid={!!form.errors.source_filename}
              disabled
            />
          </FloatLabel>
          <Tooltip target="#source_filename_wrapper" />
          {form.errors.source_filename && (
            <div className="flex flex-col">
              <small id={`source_filename-help`} className="text-red-700">
                {form.errors.source_filename}
              </small>
            </div>
          )}
        </div>
        <div>
          <FloatLabel>
            <label htmlFor="title" className="font-bold">
              Title
            </label>
            <InputText
              id="title"
              value={form.data.title}
              onChange={(e) => form.setData('title', e.target.value)}
              className="w-full"
              invalid={!!form.errors.title}
            />
          </FloatLabel>
          {form.errors.title && (
            <div className="flex flex-col">
              <small id={`title-help`} className="text-red-700">
                {form.errors.title}
              </small>
            </div>
          )}
        </div>
        <div>
          <FloatLabel>
            <label htmlFor="author" className="font-bold">
              Author
            </label>
            <InputText
              id="author"
              value={form.data.author}
              onChange={(e) => form.setData('author', e.target.value)}
              className="w-full"
              invalid={!!form.errors.author}
            />
          </FloatLabel>
          {form.errors.author && (
            <div className="flex flex-col">
              <small id={`author-help`} className="text-red-700">
                {form.errors.author}
              </small>
            </div>
          )}
        </div>
        <div>
          <FloatLabel>
            <label htmlFor="doc_type" className="font-bold">
              Document Type
            </label>
            <InputText
              id="doc_type"
              value={form.data.doc_type}
              onChange={(e) => form.setData('doc_type', e.target.value)}
              className="w-full"
              invalid={!!form.errors.doc_type}
            />
          </FloatLabel>
          {form.errors.doc_type && (
            <div className="flex flex-col">
              <small id={`doc_type-help`} className="text-red-700">
                {form.errors.doc_type}
              </small>
            </div>
          )}
        </div>
        <div>
          <FloatLabel>
            <label htmlFor="doc_category" className="font-bold">
              Document Category
            </label>
            <InputText
              id="doc_category"
              value={form.data.doc_category}
              onChange={(e) => form.setData('doc_category', e.target.value)}
              className="w-full"
              invalid={!!form.errors.doc_category}
            />
          </FloatLabel>
          {form.errors.doc_category && (
            <div className="flex flex-col">
              <small id={`doc_category-help`} className="text-red-700">
                {form.errors.doc_category}
              </small>
            </div>
          )}
        </div>
        <div>
          <FloatLabel>
            <label htmlFor="knowledge_code" className="font-bold">
              Knowledge Code
            </label>
            <InputText
              id="knowledge_code"
              value={form.data.knowledge_code}
              onChange={(e) => form.setData('knowledge_code', e.target.value)}
              className="w-full"
              invalid={!!form.errors.knowledge_code}
            />
          </FloatLabel>
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
            <label htmlFor="upload_status" className="font-bold">
              Upload Status
            </label>
            <InputText
              id="upload_status"
              value={form.data.upload_status}
              onChange={(e) => form.setData('upload_status', e.target.value)}
              className="w-full"
              invalid={!!form.errors.upload_status}
            />
          </FloatLabel>
          {form.errors.upload_status && (
            <div className="flex flex-col">
              <small id={`upload_status-help`} className="text-red-700">
                {form.errors.upload_status}
              </small>
            </div>
          )}
        </div>
        <div>
          <FloatLabel>
            <label htmlFor="full_text" className="font-bold">
              Full Text
            </label>
            <InputTextarea
              id="full_text"
              value={form.data.full_text}
              onChange={(e) => form.setData('full_text', e.target.value)}
              className="w-full"
              invalid={!!form.errors.full_text}
            />
          </FloatLabel>
          {form.errors.full_text && (
            <div className="flex flex-col">
              <small id={`full_text-help`} className="text-red-700">
                {form.errors.full_text}
              </small>
            </div>
          )}
        </div>
        <div>
          <FloatLabel>
            <label htmlFor="full_text_markdown" className="font-bold">
              Full Text Markdown
            </label>
            <InputTextarea
              id="full_text_markdown"
              value={form.data.full_text_markdown}
              onChange={(e) =>
                form.setData('full_text_markdown', e.target.value)
              }
              className="w-full"
              invalid={!!form.errors.full_text_markdown}
            />
          </FloatLabel>
          {form.errors.full_text_markdown && (
            <div className="flex flex-col">
              <small id={`full_text_markdown-help`} className="text-red-700">
                {form.errors.full_text_markdown}
              </small>
            </div>
          )}
        </div>
        <div>
          <FloatLabel>
            <label htmlFor="created_date" className="font-bold">
              Created Date
            </label>
            <Calendar
              id="created_date"
              value={form.data.created_date}
              onChange={(e) =>
                form.setData('created_date', e.value ?? undefined)
              }
              className="w-full"
              invalid={!!form.errors.created_date}
              dateFormat="dd MM yy"
            />
          </FloatLabel>
          {form.errors.created_date && (
            <div className="flex flex-col">
              <small id={`created_date-help`} className="text-red-700">
                {form.errors.created_date}
              </small>
            </div>
          )}
        </div>
        <div>
          <FloatLabel>
            <label htmlFor="source_url" className="font-bold">
              Source URL
            </label>
            <InputText
              id="source_url"
              value={form.data.source_url}
              onChange={(e) => form.setData('source_url', e.target.value)}
              className="w-full"
              invalid={!!form.errors.source_url}
            />
          </FloatLabel>
          {form.errors.source_url && (
            <div className="flex flex-col">
              <small id={`source_url-help`} className="text-red-700">
                {form.errors.source_url}
              </small>
            </div>
          )}
        </div>
        <div>
          <FloatLabel>
            <label htmlFor="language" className="font-bold">
              Language
            </label>
            <InputText
              id="language"
              value={form.data.language}
              onChange={(e) => form.setData('language', e.target.value)}
              className="w-full"
              invalid={!!form.errors.language}
            />
          </FloatLabel>
          {form.errors.language && (
            <div className="flex flex-col">
              <small id={`language-help`} className="text-red-700">
                {form.errors.language}
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
export default DocRawEdit;
