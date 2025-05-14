import AsyncSelect from "./AsyncSelect";
import useGetActors from "../../../../hooks/referencedData/useGetActors";

interface ActorSelectProps {
  value: string;
  onChange: (value: string) => any;
}
export default function ActorSelect(props: ActorSelectProps) {
  const req = useGetActors();

  return (
    <AsyncSelect
      value={props.value}
      label="Acteur"
      req={req}
      onChange={(id) => props.onChange(id)}
    />
  );
}
