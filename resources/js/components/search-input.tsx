import { useSearch } from '@/hooks/use-search';
import { Search } from 'lucide-react';
import { FloatLabel } from 'primereact/floatlabel';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText, InputTextProps } from 'primereact/inputtext';
import { ChangeEvent } from 'react';

const SearchInput = (
  props: InputTextProps & { label?: string; id: string },
) => {
  const { raw, onChange } = useSearch(props.id);

  return (
    <FloatLabel>
      <IconField>
        <InputIcon>
          <Search size={16} />
        </InputIcon>
        <InputText
          value={raw.trim()}
          onInput={(event: ChangeEvent<HTMLInputElement>) => {
            onChange(event.target.value);
          }}
          {...props}
          className="w-full"
        ></InputText>
      </IconField>
      <label htmlFor={props.id} className="font-bold">
        {props.label ?? 'Cari'}
      </label>
    </FloatLabel>
  );
};
export default SearchInput;
