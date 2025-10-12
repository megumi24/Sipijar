import { get, PaginatedJSONResponse } from '@/lib/api';
import { queriesFactory } from '@/lib/factories/services';
import { index } from '@/routes/api/chat/fact';

export interface ServerChatFact {
  id: number;
  session_id: string;
  message: {
    type: string;
    content: string;
  };
}

export interface ChatFact {
  id: number;
  session_id: string;
  message: {
    type: string;
    content: string;
  };
}

export interface ChatFactQueryParams {
  page?: number;
  perPage?: number;
}

export const chatFactQueries = queriesFactory({
  chatFactIndex: {
    queryKey: (params?: ChatFactQueryParams) => [
      'chat-fact',
      ...(params ? [params] : []),
    ],
    queryFn: async ({ params, signal }) => {
      const { data, ...pagination } = (await get(index().url, {
        params,
        signal,
      })) as PaginatedJSONResponse<ServerChatFact[]>;
      return {
        data: data as ChatFact[],
        ...pagination,
      };
    },
  },
});
