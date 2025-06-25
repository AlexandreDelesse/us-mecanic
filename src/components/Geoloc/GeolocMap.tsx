import { Box, MenuItem, MenuList, Slider } from "@mui/material";
import MapLibre, { NavigationControl, Popup } from "react-map-gl/maplibre";
import type { DrivePoint, StopPoint, Trip } from "./Geoloc.model";

import { useState } from "react";
import StopPointComponent from "./StopPointComponent";
import PointComponent from "./PointComponent";
import DrivePointComponent from "./DrivePointComponent";
import { blue } from "@mui/material/colors";

interface GeolocMapProps {
  depart?: StopPoint;
  arrivee?: StopPoint;
  minMax: [number, number];
  geoloc: Trip;
  onClick: (p: StopPoint) => void;
  onReset: () => void;
  selectedPoint?: StopPoint;
  setDepart: (p: StopPoint) => void;
  setArrive: (p: StopPoint) => void;
}
export default function GeolocMap(props: GeolocMapProps) {
  const [limit, setLimit] = useState<number[]>(props.minMax);

  const isInLimit = (p: StopPoint | DrivePoint) => {
    const pointTime =
      "StartDatetime" in p
        ? new Date(p.StartDatetime).getTime()
        : new Date(p.LocalTime).getTime();
    if (
      new Date(limit[0]).getTime() < pointTime &&
      new Date(limit[1]).getTime() > pointTime
    )
      return true;
    return false;
  };

  const initialViewState = {
    latitude:
      (props.geoloc.Arrival.Latitude + props.geoloc.Departure.Latitude) / 2,
    longitude:
      (props.geoloc.Arrival.Longitude + props.geoloc.Departure.Longitude) / 2,
    zoom: 13,
  };

  const valueLabelFormat = (value: number) => {
    return new Date(value).toLocaleTimeString();
  };

  return (
    <Box>
      <Slider
        valueLabelDisplay="auto"
        value={limit}
        onChange={(_e, value) => setLimit(value)}
        min={props.minMax[0]}
        max={props.minMax[1]}
        valueLabelFormat={valueLabelFormat}
        step={10}
      />
      <MapLibre
        initialViewState={initialViewState}
        style={{ width: "100%", height: 600 }}
        mapStyle="http://localhost:8080/styles/basic-preview/style.json"
      >
        <NavigationControl position="top-right" />
        {props.geoloc.DrivePoints.filter((p) => isInLimit(p)).map((p, i) => (
          <DrivePointComponent key={i} drivepoint={p} />
        ))}
        {props.geoloc.StopPoints.filter((p) => isInLimit(p)).map((p, i) => (
          <StopPointComponent
            isArrive={props.arrivee === p}
            isDepart={props.depart === p}
            key={i}
            stopPoint={p}
            onClick={props.onClick}
          />
        ))}
        <PointComponent
          color={blue[500]}
          point={props.geoloc.Departure}
          label="1"
        />
        <PointComponent
          color={blue[500]}
          point={props.geoloc.Arrival}
          label="2"
        />
        (
        {props.selectedPoint && (
          <Popup
            onClose={props.onReset}
            closeOnClick={false}
            latitude={props.selectedPoint.Latitude}
            longitude={props.selectedPoint.Longitude}
            style={{ padding: 0 }}
          >
            <MenuList sx={{ padding: 0 }}>
              <MenuItem
                onClick={() =>
                  props.selectedPoint && props.setDepart(props.selectedPoint)
                }
              >
                Depart
              </MenuItem>
              <MenuItem
                onClick={() =>
                  props.selectedPoint && props.setArrive(props.selectedPoint)
                }
              >
                Arrivé
              </MenuItem>
            </MenuList>
          </Popup>
        )}
        )
      </MapLibre>
    </Box>
  );
}
