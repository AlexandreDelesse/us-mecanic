import { useState } from "react";

import AsyncSelect from "./AsyncSelect";
import useGetConcerning from "../../../../hooks/referencedData/useGetConcerning";

export default function ActionSelect() {
  const req = useGetConcerning()
  const [actionId, setActionId] = useState("");

  const handleActionChanges = (id: string) => setActionId(id);

  return (
    <AsyncSelect
      value={actionId}
      label="Action"
      req={req}
      onChange={handleActionChanges}
    />
  );
}
