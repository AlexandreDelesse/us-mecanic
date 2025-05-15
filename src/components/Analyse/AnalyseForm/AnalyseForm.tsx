import {
  Alert,
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  Switch,
  TextField,
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
import SimpleCard from "../../Utils/Cards/SimpleCard";

interface AnalyzeFormProps {
  onCancel?: () => any;
  analyze?: IAnalyseForm;
  mutationFn?: (analyse: IAnalyseForm) => Promise<void>;
}
export default function AnalyseForm(props: AnalyzeFormProps) {
  const params = useParams();

  const [hasFormError, setHasFormError] = useState(false);

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

  const isActionValid = (action: IActionForm) => {
    if (!action.ActionType.Id) return false;
    if (!action.Actor.Id) return false;
    if (!action.Constraint.Id) return false;
    if (action.Constraint.RequiresDate && !action.DueDate) return false;
    return true;
  };

  const isFormValid = (form: IAnalyseForm) => {
    if (
      hasInvalidAction ||
      !form.Concerning.Id ||
      !form.Nature.Id ||
      !form.Analyze
    )
      return false;
    else return true;
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
    if (!isFormValid(formData)) return setHasFormError(true);
    mutation.mutate(formData);
  };

  const hasInvalidAction = formData.Actions.some(
    (action) => !isActionValid(action)
  );

  return (
    <>
      <SimpleCard
        title="Analyse"
        action={
          hasFormError && (
            <Alert
              sx={{ paddingY: 0 }}
              severity="warning"
              onClose={() => setHasFormError(false)}
            >
              Remplissez tous les champs
            </Alert>
          )
        }
      >
        <Box>
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
      </SimpleCard>

      <Box>
        <SimpleCard title="Actions">
          <ActionForm
            deleteAction={deleteAction}
            updateAction={updateAction}
            addAction={addAction}
            actions={formData.Actions}
            hasInvalidAction={hasInvalidAction}
          />
        </SimpleCard>
        <Box
          sx={{ display: "flex", gap: 2, alignItems: "center", marginTop: 2 }}
        >
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
        {/* {hasFormError && (
          <Alert
            severity="warning"
            sx={{ marginY: 2 }}
            onClose={() => setHasFormError(false)}
          >
            Remplissez tous les champs
          </Alert>
        )} */}
        {mutation.error && <ErrorHandler  error={mutation.error} />}
      </Box>
    </>
  );
}
