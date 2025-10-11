import { debounce } from '@/lib/utils';
import { useSearchStore } from '@/stores/search';
import { useEffect, useMemo } from 'react';

export const useSearch = (searchId: string) => {
  const init = useSearchStore((state) => state.init);
  const searches = useSearchStore((state) => state.searches);
  const setDebounced = useSearchStore((state) => state.setDebounced);
  const setRaw = useSearchStore((state) => state.setRaw);

  init(searchId);
  const searchEntry = searches[searchId] || { raw: '', debounced: '' };
  const debounceSearch = useMemo(
    () => debounce((value: string) => setDebounced(searchId, value)),
    [searchId, setDebounced],
  );

  useEffect(() => {
    debounceSearch(searchEntry.raw);
  }, [searchEntry.raw, debounceSearch]);

  const onChange = (value: string) => setRaw(searchId, value);

  return { search: searchEntry.debounced, raw: searchEntry.raw, onChange };
};
