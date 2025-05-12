import {
  Box,
  FormControlLabel,
  FormGroup,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import ConcerningSelect from "./Select/ConcerningSelect";

export default function AnalyseForm() {
  const defaultAnalyse = {
    Immatriculation: "",
    Crew: "",
    Analyze: "",
    AnalyzeBy: "",
    Concerning: {
      Id: "",
    },
    LogId: 0,
    Nature: {
      Id: "",
    },
    ImmobilizeVehicle: false,
    Actions: [],
  };

  // const defaultAction = {
  //   Id: 0,
  //   Actor: {
  //     Id: "",
  //     Value: "",
  //   },
  //   ActionType: {
  //     Id: "",
  //     Value: "",
  //   },
  //   Constraint: {
  //     Id: "",
  //     Value: "",
  //   },
  //   Rappel: "",
  //   DueDate: "",
  //   Creation: "",
  //   comment: "",
  //   Closed: "",
  //   CallBack: "",
  //   AnalyzeId: 0,
  // };

  const [formData, setFormData] = useState(defaultAnalyse);

  const updateFormData = (name: string, value: any) => {
    setFormData((old) => ({ ...old, [name]: value }));
  };

  return (
    <Box sx={{ padding: 2, borderRadius: 2, backgroundColor: "whitesmoke" }}>
      <Typography marginY={1} variant="h6">
        Analyse
      </Typography>
      <FormGroup sx={{ gap: 2 }}>
        <FormControlLabel
          control={
            <Switch
              checked={formData.ImmobilizeVehicle}
              onChange={() =>
                updateFormData("ImmobilizeVehicle", !formData.ImmobilizeVehicle)
              }
            />
          }
          label="Immobilisation du véhicule nécessaire"
        />
        <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
          <ConcerningSelect
            value={formData.Concerning.toString()}
            onChange={(id: string) => updateFormData("Concerning", id)}
          />
          {/* <NatureSelect
            value={analyse.Nature.toString()}
            onChange={(id: string) => changeFormData("Nature", id)}
          /> */}
        </Box>

        <TextField
          multiline
          rows={4}
          label="Analyse"
          value={formData.Analyze}
          onChange={(e) => updateFormData("Analyze", e.target.value)}
        />
      </FormGroup>
    </Box>
  );
}
