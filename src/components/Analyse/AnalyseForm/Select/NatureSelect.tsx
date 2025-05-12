import useGetConcerning from "../../../../hooks/referencedData/useGetConcerning";
import AsyncSelect from "./AsyncSelect";

interface NatureSelectProps {
  value: string;
  onChange?: (value: string) => any;
  readonly?: boolean;
}
export default function NatureSelect(props: NatureSelectProps) {
  const req = useGetConcerning();

  const handleIdChanges = (id: string) => {
    props.onChange && props.onChange(id);
  };

  return (
    <AsyncSelect
      readOnly
      value={props.value}
      label="Nature"
      req={req}
      onChange={handleIdChanges}
    />
  );
}
