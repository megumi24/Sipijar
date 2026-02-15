import {
  InputNumber,
  InputNumberValueChangeEvent,
} from 'primereact/inputnumber';

interface GeodeticInputProps {
  label?: string;
  latValue?: number;
  longValue?: number;
  onLatChange?: (e: InputNumberValueChangeEvent) => void;
  onLongChange?: (e: InputNumberValueChangeEvent) => void;
  latInvalid?: boolean;
  longInvalid?: boolean;
}

const GeodeticInput = (props: GeodeticInputProps) => {
  return (
    <div>
      <label htmlFor="latitude" className="font-bold">
        {props.label ?? 'Latitude'}
      </label>
      <div id="latitude" className="p-inputgroup">
        <span className="p-inputgroup-addon">Latitude</span>
        <InputNumber
          id="latitude"
          className="w-full"
          maxFractionDigits={20}
          value={props.latValue}
          onValueChange={props.onLatChange}
          invalid={props.latInvalid}
        />
        <InputNumber
          id="longitude"
          className="w-full"
          maxFractionDigits={20}
          value={props.longValue}
          onValueChange={props.onLongChange}
          invalid={props.longInvalid}
        />
        <span className="p-inputgroup-addon">Longitude</span>
      </div>
    </div>
  );
};
export default GeodeticInput;
