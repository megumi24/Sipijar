import { useQuery, UseQueryOptions } from '@tanstack/react-query';

type ServiceFactoryOptions<D = unknown, P = unknown> = Record<
  string,
  {
    queryKey: string[] | ((params?: P) => (string | P)[]);
    queryFn: (args: { params?: P; signal?: AbortSignal }) => Promise<D>;
  }
>;
export type UseQueryType<D, P> = (
  params?: P,
  queryOptions?: Omit<UseQueryOptions<D, unknown, D>, 'queryKey' | 'queryFn'>,
) => UseQueryReturnType<D>;
export type UseQueryOptionsExternal<D> = Omit<
  UseQueryOptions<D, unknown, D>,
  'queryKey' | 'queryFn'
>;
export type UseQueryReturnType<D> = ReturnType<typeof useQuery<D, unknown, D>>;

export const queriesFactory = <D, P = unknown>(
  options: ServiceFactoryOptions<D, P>,
) => {
  const queries: Record<
    string,
    {
      queryKey: string[] | ((params?: P) => (string | P)[]);
      queryFn: (args: { params?: P; signal?: AbortSignal }) => Promise<D>;
      useQuery: UseQueryType<D, P>;
      queryKeyWithoutParams: (string | P)[];
    }
  > = {};
  for (const [key, value] of Object.entries(options)) {
    queries[key] = {
      queryKey: value.queryKey,
      queryFn: value.queryFn,
      useQuery: (params?: P, queryOptions?: UseQueryOptionsExternal<D>) =>
        useQuery({
          queryKey:
            typeof value.queryKey === 'function'
              ? value.queryKey(params)
              : value.queryKey,
          queryFn: ({ signal }) => value.queryFn({ params, signal }),
          ...queryOptions,
        }),
      queryKeyWithoutParams:
        typeof value.queryKey === 'function'
          ? value.queryKey()
          : value.queryKey,
    };
  }
  return queries;
};
