import { useEffect, useState } from "react";

import AsyncSelect from "./AsyncSelect";
import useGetConcerning from "../../../../hooks/referencedData/useGetConcerning";

interface ActorSelectProps {
  onChange: (index: number, field: string, value: string) => any;
  index: number;
}
export default function ActorSelect(props: ActorSelectProps) {
  const req = useGetConcerning();
  const [id, setId] = useState("");

  const handleActionChanges = (id: string) => setId(id);

  useEffect(() => props.onChange(props.index, "ActorId", id.toString()), [id]);

  return (
    <AsyncSelect
      value={id}
      label="Acteur"
      req={req}
      onChange={handleActionChanges}
    />
  );
}
