import {
  QueryFunctionContext,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';

type QueryDefinition<D = unknown, P = unknown> = {
  queryKey: string[] | ((params?: P) => (string | P)[]);
  queryFn: (args: { params?: P; signal?: AbortSignal }) => Promise<D>;
};
type ServiceFactoryOptions = Record<string, QueryDefinition<unknown, unknown>>;

export type UseQueryOptionsExternal<D> = Omit<
  UseQueryOptions<D, unknown, D>,
  'queryKey' | 'queryFn'
>;

export const queriesFactory = <T extends ServiceFactoryOptions>(options: T) => {
  type DataFor<K extends keyof T> = Awaited<ReturnType<T[K]['queryFn']>>;
  type ParamsFor<K extends keyof T> = Parameters<T[K]['queryFn']>[0] extends {
    params?: infer P;
  }
    ? P
    : undefined;
  type Result = {
    [K in keyof T]: {
      queryKey: T[K]['queryKey'];
      queryFn: T[K]['queryFn'];
      useQuery: (
        params?: Parameters<T[K]['queryFn']>[0]['params'],
        queryOptions?: UseQueryOptionsExternal<
          Awaited<ReturnType<T[K]['queryFn']>>
        >,
      ) => UseQueryResult<Awaited<ReturnType<T[K]['queryFn']>>, unknown>;
      queryKeyWithoutParams: ReturnType<
        Extract<T[K]['queryKey'], (...args: unknown[]) => unknown>
      > extends (infer R)[]
        ? R[]
        : T[K]['queryKey'];
    };
  };
  const result = {} as Result;
  const makeEntry = <K extends keyof T>(key: K, def: T[K]) => {
    const entry = {
      queryKey: def.queryKey,
      queryFn: def.queryFn,
      useQuery: (
        params?: ParamsFor<K>,
        queryOptions?: UseQueryOptionsExternal<DataFor<K>>,
      ) =>
        useQuery<DataFor<K>, unknown, DataFor<K>, readonly unknown[]>({
          queryKey:
            typeof def.queryKey === 'function'
              ? (
                  def.queryKey as (
                    p?: ParamsFor<K>,
                  ) => (string | ParamsFor<K>)[]
                )(params)
              : def.queryKey,
          queryFn: ({ signal }: QueryFunctionContext) =>
            def.queryFn({ params: params as ParamsFor<K>, signal }) as Promise<
              DataFor<K>
            >,
          ...queryOptions,
        }),
      queryKeyWithoutParams:
        typeof def.queryKey === 'function'
          ? (def.queryKey as () => (string | ParamsFor<K>)[])()
          : def.queryKey,
    };

    return entry;
  };
  for (const key of Object.keys(options) as Array<keyof T>) {
    result[key] = makeEntry(key, options[key]) as Result[typeof key];
  }
  return result;
};
