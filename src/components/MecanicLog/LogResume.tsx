import { type ReactNode } from "react";
import { Box, Typography } from "@mui/material";
import DateDisplayer from "../Utils/DateDisplayer";
import type { IMecanicLog } from "./IMecanicLog";

interface LogResumeProps {
  log: IMecanicLog;
}
export default function LogResume(props: LogResumeProps) {
  const { log } = props;

  return (
    <Box sx={{ padding: 2, borderRadius: 2, backgroundColor: "whitesmoke" }}>
      <Typography marginY={1} variant="h6">
        Résumé de la déclaration
      </Typography>
      {DataPresenter("Véhicule", log.Immatriculation)}
      {DataPresenter("Date", <DateDisplayer value={log.LogDate} />)}
      {DataPresenter("Ambulancier", "Not implemented - No Crew Model")}
      {DataPresenter("Description", log.Constat)}
    </Box>
  );
}

const DataPresenter = (label: string, value: string | number | ReactNode) => {
  return (
    <Box display="flex" gap={1}>
      <Typography fontWeight={600}>{label}</Typography>
      <Typography variant="body1">: {value}</Typography>
    </Box>
  );
};
