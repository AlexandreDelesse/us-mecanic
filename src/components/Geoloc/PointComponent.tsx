import { Marker } from "react-map-gl/maplibre";
import type { Point } from "./Geoloc.model";
import { Box } from "@mui/material";

interface PointComponentProps {
  point: Point;
  color?: string;
  label?: string;
}
export default function PointComponent(props: PointComponentProps) {
  return (
    <Marker latitude={props.point.Latitude} longitude={props.point.Longitude}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "12px",
          height: "12px",
          color: "white",
          padding: "4px",
          backgroundColor: props.color,
          borderRadius: "50%",
          border: "1px solid white",
          boxShadow: "0 0 3px black",
          fontWeight: "600",
        }}
      >
        {props.label || ""}
      </Box>
    </Marker>
  );
}
