import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import type { IActionForm } from "../IActionForm";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ActionSelect from "./Select/ActionSelect";
import ActorSelect from "./Select/ActorSelect";
import ConstraintSelect from "./Select/ConstraintSelect";
import CustomDatePicker from "../../Utils/CustomDatePicker";

interface ActionFormProps {
  actions: IActionForm[];
  addAction: () => void;
  deleteAction: (id: string) => void;
  updateAction: (id: string, field: string, value: any) => void;
}

export default function ActionForm(props: ActionFormProps) {
  return (
    <Box
      sx={{
        marginTop: 2,
        padding: 2,
        borderRadius: 2,
        backgroundColor: "whitesmoke",
      }}
    >
      <Typography marginY={1} variant="h6">
        Actions
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {props.actions.map((action) => (
          <Box
            key={action.Id}
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
              width: "100%",
            }}
          >
            <ActionSelect
              onChange={(id) =>
                props.updateAction(action.Id, "ActionType", { Id: id })
              }
              value={action.ActionType.Id}
            />

            <ActorSelect
              onChange={(id) =>
                props.updateAction(action.Id, "Actor", { Id: id })
              }
              value={action.Actor.Id}
            />

            <ConstraintSelect
              onChange={(el) => props.updateAction(action.Id, "Constraint", el)}
              value={action.Constraint.Id}
            />
            {action.Constraint.RequiresDate && (
              <CustomDatePicker
                onChange={(date) =>
                  props.updateAction(action.Id, "DueDate", date?.toISOString())
                }
                value={new Date(action.DueDate)}
              />
            )}

            <TextField
              label="Commentaire"
              size="small"
              value={action.comment}
              onChange={(e) =>
                props.updateAction(action.Id, "comment", e.target.value)
              }
            />

            <IconButton
              onClick={() => props.deleteAction(action.Id)}
              color="error"
              size="small"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
      </Box>

      <Button
        sx={{ marginTop: 2 }}
        startIcon={<AddIcon />}
        onClick={props.addAction}
      >
        Ajouter une action
      </Button>
    </Box>
  );
}
