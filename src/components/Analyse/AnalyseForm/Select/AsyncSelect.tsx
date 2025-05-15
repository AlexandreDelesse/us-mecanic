import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
} from "@mui/material";
import ErrorHandler from "../../../Utils/Error/ErrorHandler";
import type { UseQueryResult } from "@tanstack/react-query";
import type { IDisplayValue } from "../../IAnalyse";

interface AsyncSelectProps {
  req: UseQueryResult<any, Error>;
  onChange: (id: string, requiresDate?: boolean) => any;
  value: string;
  label: string;
  readOnly?: boolean;
}
export default function AsyncSelect(props: AsyncSelectProps) {
  const { req } = props;

  if (req.isLoading) return <Skeleton width={150} height={70} />;
  if (req.isError) return <ErrorHandler error={req.error} />;

  if (props.readOnly) return <>{req.data[props.value]?.Value || "Erreur"}</>;

  return (
    <FormControl sx={{ minWidth: 150, flex: 1 }} size="small">
      <InputLabel id="action-select-label">{props.label}</InputLabel>
      <Select
        labelId="action-select-label"
        label={props.label}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      >
        {req.data.map((el: IDisplayValue) => (
          <MenuItem key={`${el.Id}-${el.Value}`} value={el.Id}>
            {el.Value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
