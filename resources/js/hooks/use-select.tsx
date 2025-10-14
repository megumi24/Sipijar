import {
  selectComponentFactory,
  SelectComponentFactoryOptions,
  SelectItem,
} from '@/lib/factories/select';
import { useSelectStore } from '@/stores/select';
import { useCallback, useEffect, useMemo } from 'react';

export interface UseSelectProps {
  options?: SelectItem<string>[];
  isOptionsReady?: boolean;
  componentOptions?: Omit<SelectComponentFactoryOptions, 'options' | 'model'>;
  defaultValue?: string | null;
}

const useSelectModel = (
  selectId: string,
  storeEntry: Record<string, { value?: string }>,
  setValue: (id: string, value?: string) => void,
) => {
  const model = useMemo(
    () => storeEntry[selectId].value,
    [selectId, storeEntry],
  );
  const setModel = useCallback(
    (value?: string) => {
      setValue(selectId, value);
    },
    [selectId, setValue],
  );

  return [model, setModel] as const;
};

export const useSelect = (props?: UseSelectProps) => {
  props = {
    isOptionsReady: true,
    ...props,
  };
  props.componentOptions = {
    label: 'Select',
    selectId: 'select',
    ...props.componentOptions,
  };

  const { selectId } = props.componentOptions;
  const init = useSelectStore((state) => state.init);
  const selects = useSelectStore((state) => state.selects);
  const setValue = useSelectStore((state) => state.setValue);
  init(selectId);
  const [model, setModel] = useSelectModel(selectId, selects, setValue);

  useEffect(() => {
    const defaultValue = props.defaultValue;
    if (defaultValue === null) return;
    if (!model && props.options && props.options.length > 0) {
      setModel(defaultValue ?? props.options[0].value);
    }
  }, [model, props.defaultValue, props.options, setModel]);

  const SelectComponent = selectComponentFactory<string>({
    ...props.componentOptions,
    options: props.options,
    model,
  });

  return {
    options: props.options,
    model,
    SelectComponent,
    setModel,
  };
};
