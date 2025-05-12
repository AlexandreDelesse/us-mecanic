import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import type { IAnalyse } from "./IAnalyse";
import PropertyDisplay from "../Utils/PropertyDisplay";
import AcionsTableDisplay from "./AcionsTableDisplay";

interface AnalyseDisplayProps {
  analyse: IAnalyse;
}

export default function AnalyseDisplay(props: AnalyseDisplayProps) {
  const { analyse } = props;

  return (
    <Box>
      <Box
        sx={{
          marginTop: 2,
          padding: 2,
          borderRadius: 2,
          backgroundColor: "whitesmoke",
        }}
      >
        <Typography marginY={1} variant="h6">
          Analyse
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <FormControlLabel
            control={<Checkbox checked={analyse.ImmobilizeVehicle} disabled />}
            label="Immobilisation du véhicule nécessaire"
          />
          <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
            <PropertyDisplay
              title="Concerne"
              content={analyse.Concerning?.Value || "Erreur Concerning"}
            />
            <PropertyDisplay
              title="Nature"
              content={analyse.Nature?.Value || "Erreur Nature"}
            />
          </Box>
          <PropertyDisplay title="Analyse" content={analyse.Analyze} />
        </Box>
      </Box>
      <Box
        sx={{
          marginY: 2,
          padding: 2,
          borderRadius: 2,
          backgroundColor: "whitesmoke",
        }}
      >
        <Typography marginY={1} variant="h6">
          Actions
        </Typography>
        <AcionsTableDisplay actions={analyse.Actions} />
      </Box>
    </Box>
  );
}
