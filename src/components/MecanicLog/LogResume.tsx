import { Box } from "@mui/material";
import DateDisplayer from "../Utils/DateDisplayer";
import type { IMecanicLog } from "./IMecanicLog";
import SimpleCard from "../Utils/Cards/SimpleCard";
import PropertyDisplay from "../Utils/PropertyDisplay";

interface LogResumeProps {
  log: IMecanicLog;
}
export default function LogResume(props: LogResumeProps) {
  const { log } = props;

  return (
    <SimpleCard title="Résumé de la déclaration">
      <Box sx={{ display: "flex", gap: 3 }}>
        <Box>
          <PropertyDisplay title="Véhicule" content={log.Immatriculation} />
          <PropertyDisplay
            title="Date"
            content={<DateDisplayer value={log.LogDate} />}
          />
        </Box>
        <Box>
          <PropertyDisplay title="Ambulancier" content={"Coming soon !"} />
          <PropertyDisplay title="Description" content={log.Report} />
        </Box>
      </Box>
    </SimpleCard>
  );
  //   return (
  //     <Box
  //       sx={{
  //         backgroundColor: "white",
  //         border: "1px solid #ccd0d4",

  //         boxShadow: "0 1px 1px rgba(0, 0, 0, 0.04)",
  //         padding: 2,
  //         minWidth: 275,
  //       }}
  //     >
  //       <Typography marginY={1} variant="h6">
  //         Résumé de la déclaration
  //       </Typography>
  //       <Divider />
  //       <Box>

  //       </Box>
  //       {DataPresenter("Véhicule", log.Immatriculation)}
  //       {DataPresenter("Date", <DateDisplayer value={log.LogDate} />)}
  //       {DataPresenter("Ambulancier", "Not implemented - No Crew Model")}
  //       {DataPresenter("Description", log.Report)}
  //     </Box>
  //   );
}

// const DataPresenter = (label: string, value: string | number | ReactNode) => {
//   return (
//     <Box display="flex" gap={1}>
//       <Typography fontWeight={600}>{label}</Typography>
//       <Typography variant="body1">: {value}</Typography>
//     </Box>
//   );
// };
