import { get, PaginatedJSONResponse } from '@/lib/api';
import { queriesFactory } from '@/lib/factories/services';
import { graphData, index } from '@/routes/api/fact';
import moment from 'moment';

export interface ServerFact {
  id: number;
  doc_raw_id: number;
  knowledge_code?: string;
  event_date?: string;
  location_detail?: string;
  athg_type?: string;
  infrastructure_name?: string;
  infrastructure_type?: string;
  power_system?: string;
  province?: string;
  modus_operandi?: string;
  impact_summary?: string;
  chronology_summary?: string;
  actors_involved?: string;
  companies_involved?: string;
  original_excerpt?: string;
  source_section?: string;
  verified?: boolean;
  infrastructure_code?: string;
  ahtg_code?: string;
}

export interface Fact {
  id: number;
  doc_raw_id: number;
  knowledge_code?: string;
  event_date?: Date;
  location_detail?: string;
  athg_type?: string;
  infrastructure_name?: string;
  infrastructure_type?: string;
  power_system?: string;
  province?: string;
  modus_operandi?: string;
  impact_summary?: string;
  chronology_summary?: string;
  actors_involved?: string;
  companies_involved?: string;
  original_excerpt?: string;
  source_section?: string;
  verified?: boolean;
  infrastructure_code?: string;
  ahtg_code?: string;
}

export type FactForm = Partial<Fact>;

export interface FactQueryParams {
  search?: string;
  page?: number;
  perPage?: number;
}

export const transformFact = ({
  event_date,
  verified,
  ...item
}: ServerFact): Fact => ({
  ...item,
  event_date: event_date
    ? moment(event_date, 'YYYY-MM-DD').toDate()
    : undefined,
  verified: !!verified,
});

export const factQueries = queriesFactory({
  factIndex: {
    queryKey: (params?: FactQueryParams) => [
      'fact',
      ...(params ? [params] : []),
    ],
    queryFn: async ({ params, signal }) => {
      const { data, ...pagination } = (await get(index().url, {
        params,
        signal,
      })) as PaginatedJSONResponse<ServerFact[]>;
      return {
        data: data.map(transformFact) as Fact[],
        ...pagination,
      };
    },
  },
  graphData: {
    queryKey: ['fact-graph-data'],
    queryFn: async ({ signal }) => {
      const { data } = await get(graphData().url, { signal });
      return data;
    },
  },
});
