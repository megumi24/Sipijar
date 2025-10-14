import {
  Dropdown,
  DropdownChangeEvent,
  DropdownProps,
} from 'primereact/dropdown';
import { FloatLabel } from 'primereact/floatlabel';
import { ReactNode } from 'react';

export interface SelectItem<T = string> {
  value: T;
  label?: string;
}

export interface SelectComponentFactoryOptions<T = string> {
  label: string;
  selectId: string;
  options?: SelectItem<T>[];
  model?: T;
}

export const selectComponentFactory = <T = string,>({
  label,
  selectId,
  options,
  model,
}: SelectComponentFactoryOptions<T>) => {
  return function SelectComponent(
    props: DropdownProps & {
      value?: T;
      onChange?: (event: DropdownChangeEvent) => void;
      label?: string;
      children?: ReactNode;
    },
  ) {
    return (
      <FloatLabel>
        <Dropdown
          id={selectId}
          className="w-full"
          optionLabel="label"
          virtualScrollerOptions={{ itemSize: 30 }}
          filter
          {...props}
          options={options}
          value={model}
          onChange={(event) => {
            if (props.onChange) return props.onChange(event);
          }}
        >
          {props.children}
        </Dropdown>
        <label htmlFor={selectId} className="font-bold">
          {props.label ?? label}
        </label>
      </FloatLabel>
    );
  };
};
