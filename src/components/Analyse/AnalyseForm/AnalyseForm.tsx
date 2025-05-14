import {
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import ConcerningSelect from "./Select/ConcerningSelect";
import NatureSelect from "./Select/NatureSelect";
import ActionForm from "./ActionForm";
import { v4 as uuidv4 } from "uuid";
import type { IActionForm } from "../IActionForm";
import type { IAnalyseForm } from "../IAnalyseForm";
import usePostAnalyze from "../../../hooks/analyse/usePostAnalyze";
import { useParams } from "react-router";
import ErrorHandler from "../../Utils/Error/ErrorHandler";

interface AnalyzeFormProps {
  onCancel?: () => any;
  analyze?: IAnalyseForm;
  mutationFn?: (analyse: IAnalyseForm) => Promise<void>;
}
export default function AnalyseForm(props: AnalyzeFormProps) {
  const params = useParams();

  const logId = params.logId ? parseInt(params.logId) : -1;

  const defaultAnalyse: IAnalyseForm = {
    Immatriculation: "",
    Crew: "",
    Analyze: "",
    AnalyzeBy: "",
    LogId: logId,
    Concerning: {
      Id: "",
    },
    Nature: {
      Id: "",
    },
    ImmobilizeVehicle: false,
    Actions: [],
  };

  const defaultAction: IActionForm = {
    ActionType: { Id: "" },
    Actor: { Id: "" },
    comment: "",
    Constraint: { Id: "", RequiresDate: false },
    Id: uuidv4(),
    DueDate: "",
  };

  const [formData, setFormData] = useState(props.analyze || defaultAnalyse);

  const mutation = usePostAnalyze(props.mutationFn);

  const updateFormData = (name: string, value: any) => {
    setFormData((old) => ({ ...old, [name]: value }));
  };

  const addAction = () =>
    updateFormData("Actions", [...formData.Actions, defaultAction]);

  const deleteAction = (id: string) =>
    updateFormData(
      "Actions",
      formData.Actions.filter((action) => action.Id !== id)
    );

  const updateAction = (id: string, field: string, value: any) => {
    const newActions = formData.Actions.map((action) =>
      action.Id === id ? { ...action, [field]: value } : action
    );
    updateFormData("Actions", newActions);
  };

  const submitForm = () => {
    mutation.mutate(formData);
  };

  return (
    <>
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
        <FormGroup sx={{ gap: 2 }}>
          <FormControlLabel
            control={
              <Switch
                checked={formData.ImmobilizeVehicle}
                onChange={() =>
                  updateFormData(
                    "ImmobilizeVehicle",
                    !formData.ImmobilizeVehicle
                  )
                }
              />
            }
            label="Immobilisation du véhicule nécessaire"
          />
          <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
            <ConcerningSelect
              value={formData.Concerning.Id}
              onChange={(id: string) =>
                updateFormData("Concerning", { Id: id })
              }
            />
            <NatureSelect
              value={formData.Nature.Id}
              onChange={(id: string) => updateFormData("Nature", { Id: id })}
            />
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
      <ActionForm
        deleteAction={deleteAction}
        updateAction={updateAction}
        addAction={addAction}
        actions={formData.Actions}
      />
      <Box sx={{ display: "flex", gap: 2, alignItems: "center", marginTop: 2 }}>
        <Button
          disabled={mutation.isPending}
          onClick={submitForm}
          variant="contained"
        >
          Sauvegarder
        </Button>
        {props.onCancel && (
          <Button onClick={props.onCancel} variant="outlined" color="error">
            Annuler
          </Button>
        )}
      </Box>
      {mutation.error && <ErrorHandler error={mutation.error} />}
    </>
  );
}
