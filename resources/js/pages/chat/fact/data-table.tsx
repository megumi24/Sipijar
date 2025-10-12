import { dataTableFactory } from '@/lib/factories/data-table';
import { chatFactQueries } from '@/services/chat-fact';

const ChatFactDataTable = dataTableFactory({
  query: chatFactQueries.chatFactIndex.useQuery,
  queryOptions: {
    staleTime: 5 * 60 * 1000,
  },
});
export default ChatFactDataTable;
