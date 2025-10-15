import { queriesFactory } from '@/lib/factories/services';
import moment from 'moment';

export interface ServerChatFact {
  id: number;
  chat_id: number;
  user_id: number;
  username: string;
  message_text: string;
  message_date?: string;
  is_selected: boolean;
  metadata: {
    topic: string;
  };
}

export interface ChatFact {
  id: number;
  chat_id: number;
  user_id: number;
  username: string;
  message_text: string;
  message_date?: Date;
  is_selected: boolean;
  metadata: {
    topic: string;
  };
}

export interface ChatFactQueryParams {
  page?: number;
  perPage?: number;
}

export const transformChatFact = ({
  message_date,
  is_selected,
  ...item
}: ServerChatFact): ChatFact => ({
  ...item,
  message_date: message_date
    ? moment(message_date).subtract(7, 'hours').toDate()
    : undefined,
  is_selected: !!is_selected,
});

export const chatFactQueries = queriesFactory({
  //   chatFactIndex: {
  //     queryKey: (params) => ['chat-fact', ...(params ? [params] : [])],
  //     queryFn: async ({ params, signal }) => {
  //       const { data, ...pagination } = (await get(index().url, {
  //         params,
  //         signal,
  //       })) as PaginatedJSONResponse<ServerChatFact[]>;
  //       return {
  //         data: data.map(transformChatFact) as ChatFact[],
  //         ...pagination,
  //       };
  //     },
  //   },
});
