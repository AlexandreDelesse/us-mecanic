import AsyncSelect from "./AsyncSelect";
import useGetAction from "../../../../hooks/referencedData/useGetAction";

interface ActionSelectProps {
  value: string;
  onChange: (value: string) => any;
  readonly?: boolean;
}
export default function ActionSelect(props: ActionSelectProps) {
  const req = useGetAction();

  return (
    <AsyncSelect
      value={props.value}
      label="Action"
      req={req}
      onChange={(id) => props.onChange(id.toString())}
    />
  );
}
