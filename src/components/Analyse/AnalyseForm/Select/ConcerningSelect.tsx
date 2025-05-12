import useGetConcerning from "../../../../hooks/referencedData/useGetConcerning";
import AsyncSelect from "./AsyncSelect";

interface ConcerningSelectProps {
  value: string;
  onChange?: (value: string) => any;
  readonly?: boolean;
}
export default function ConcerningSelect(props: ConcerningSelectProps) {
  const req = useGetConcerning()

  const handleActionChanges = (id: string) => {
    props.onChange && props.onChange(id);
  };

  return (
    <AsyncSelect
      readOnly={props.readonly}
      value={props.value}
      label="Concerne"
      req={req}
      onChange={handleActionChanges}
    />
  );
}
