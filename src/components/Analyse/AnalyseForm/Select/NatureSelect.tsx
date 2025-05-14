import useGetNature from "../../../../hooks/referencedData/useGetNature";
import AsyncSelect from "./AsyncSelect";

interface NatureSelectProps {
  value: string;
  onChange?: (value: string) => any;
  readonly?: boolean;
}
export default function NatureSelect(props: NatureSelectProps) {
  const req = useGetNature();

  const handleIdChanges = (id: string) => {
    props.onChange && props.onChange(id);
  };

  return (
    <AsyncSelect
      readOnly={props.readonly}
      value={props.value}
      label="Nature"
      req={req}
      onChange={handleIdChanges}
    />
  );
}
