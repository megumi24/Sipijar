import { UseQueryResult } from '@tanstack/react-query';
import {
  DataTable,
  DataTablePageEvent,
  DataTableProps,
  DataTableValueArray,
} from 'primereact/datatable';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { PaginatedJSONResponse } from '../api';
import { UseQueryOptionsExternal } from './services';

type PaginatedDataTableProps<
  T extends DataTableValueArray,
  P extends { page?: number },
> = {
  children?: ReactNode;
  dtProps?: DataTableProps<T>;
  params?: P;
};

interface DataTableFactoryOptions<
  T extends DataTableValueArray,
  P extends { page?: number },
> {
  query: (
    params?: P,
    queryOptions?: UseQueryOptionsExternal<PaginatedJSONResponse<T>>,
  ) => UseQueryResult<PaginatedJSONResponse<T>, unknown>;
  queryOptions?: UseQueryOptionsExternal<PaginatedJSONResponse<T>>;
  labels?: {
    currentPageReportTemplate?: string;
    emptyMessage?: string;
    errorMessage?: string;
  };

  setup?: (
    base: { page: number; setPage: Dispatch<SetStateAction<number>> },
    props: PaginatedDataTableProps<T, P>,
  ) => void;
}

export const dataTableFactory = <
  T extends DataTableValueArray,
  P extends { page?: number },
>({
  query,
  queryOptions,
  labels,
  setup,
}: DataTableFactoryOptions<T, P>) =>
  function PaginatedDataTable(props: PaginatedDataTableProps<T, P>) {
    const [page, setPage] = useState<number>(1);
    const {
      data: dataBundle,
      isLoading,
      error,
    } = query({ ...(props.params || {}), page } as P, queryOptions);
    const data = dataBundle?.data;
    const pagination = dataBundle?.meta;
    const first = (pagination?.from || 1) - 1;

    const onPageChanged = (event: DataTablePageEvent) => {
      setPage((event.page || 0) + 1);
    };

    useEffect(() => {
      setPage(1);
    }, [setPage, props.params]);

    if (setup) setup({ page, setPage }, props);

    return (
      <DataTable
        value={data}
        first={first}
        dataKey="id"
        paginator
        rows={pagination?.per_page || 10}
        totalRecords={pagination?.total || 0}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
        currentPageReportTemplate={
          labels?.currentPageReportTemplate ||
          'Menampilkan {first}-{last} dari {totalRecords} items.'
        }
        lazy
        scrollable
        loading={isLoading}
        onPage={onPageChanged}
        emptyMessage={
          error
            ? labels?.errorMessage ||
              'Terdapat kesalahan saat pengambilan data.'
            : labels?.emptyMessage || 'Tidak ada data.'
        }
        {...props.dtProps}
      >
        {props.children}
      </DataTable>
    );
  };
