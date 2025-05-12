import { useState } from "react";

import AsyncSelect from "./AsyncSelect";
import { Box } from "@mui/material";
import useGetConcerning from "../../../../hooks/referencedData/useGetConcerning";

export default function ConstraintSelect() {
  const req = useGetConcerning();
  const [id, setId] = useState("");

  // useEffect(() => console.log(selectedConstraint), [selectedConstraint]);

  const handleActionChanges = (id: string) => setId(id);

  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      <AsyncSelect
        value={id}
        label="Echéance"
        req={req}
        onChange={handleActionChanges}
      />
    </Box>
  );
}
