import useGetConstraints from "../../../../hooks/referencedData/useGetConstraints";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
} from "@mui/material";
import type { IDisplayValue } from "../../IAnalyse";
import ErrorHandler from "../../../Utils/Error/ErrorHandler";

interface ConstraintSelectProps {
  value: string;
  onChange: (el: IDisplayValue) => any;
  readonly?: boolean;
}
export default function ConstraintSelect(props: ConstraintSelectProps) {
  const req = useGetConstraints();

  if (req.isLoading) return <Skeleton />;
  if (req.isError) return <ErrorHandler error={req.error} />;

  return (
    // <AsyncSelect
    //   value={props.value}
    //   label="Echéance"
    //   req={req}
    //   onChange={(id) => props.onChange(id.toString())}
    // />
    <FormControl sx={{ minWidth: 150 }} size="small">
      <InputLabel id="action-select-label">Echéance</InputLabel>
      <Select
        sx={{ flex: 1 }}
        labelId="action-select-label"
        label="Echéance"
        value={props.value}
        onChange={(e) =>
          props.onChange(
            req.data.find(
              (el: IDisplayValue) => el.Id === parseInt(e.target.value)
            )
          )
        }
      >
        {req.data.map((el: IDisplayValue) => (
          <MenuItem key={`${el.Id}-${el.Value}`} value={el.Id}>
            {el.Label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
