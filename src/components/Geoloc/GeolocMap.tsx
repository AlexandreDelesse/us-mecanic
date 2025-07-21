import { Box, MenuItem, MenuList } from "@mui/material";
import MapLibre, { NavigationControl, Popup } from "react-map-gl/maplibre";
import type { DrivePoint, Point, StopPoint, Trip } from "./Geoloc.model";

import { useState } from "react";
import StopPointComponent from "./StopPointComponent";
import PointComponent from "./PointComponent";
import DrivePointComponent from "./DrivePointComponent";
import { blue } from "@mui/material/colors";
import { time } from "../Utils/DateTime.service";
import GeolocTimeline from "./GeolocTimeline";

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
      "StartDatetime" in p ? time(p.StartDatetime) : time(p.LocalTime);
    if (limit[0] < pointTime && limit[1] > pointTime) return true;
    return false;
  };
  const isPointValid = (p: Point) => !(p.Latitude == 0 || p.Longitude == 0);

  const initialViewState =
    isPointValid(props.geoloc.Departure) && isPointValid(props.geoloc.Arrival)
      ? {
          latitude:
            (props.geoloc.Arrival.Latitude + props.geoloc.Departure.Latitude) /
            2,
          longitude:
            (props.geoloc.Arrival.Longitude +
              props.geoloc.Departure.Longitude) /
            2,
          zoom: 13,
        }
      : {
          latitude: props.geoloc.DrivePoints[0].Latitude,
          longitude: props.geoloc.DrivePoints[0].Longitude,
          zoom: 13,
        };

  return (
    <Box display={"flex"} flexDirection={"column"} height={"100%"}>
      <GeolocTimeline
        value={limit}
        onChange={setLimit}
        min={props.minMax[0]}
        max={props.minMax[1]}
        pointsOfInterest={props.geoloc.StopPoints}
      />

      <MapLibre
        initialViewState={initialViewState}
        style={{ height: "100%" }}
        mapStyle="http://192.168.1.51:8080/styles/basic-preview/style.json"
        // mapStyle="https://api.maptiler.com/maps/streets/style.json?key=VLw5L9PNBFsF8dEplzvu"
      >
        <NavigationControl position="top-right" />
        {props.geoloc.DrivePoints.filter((p) => isInLimit(p)).map((p) => (
          <DrivePointComponent key={p.LocalTime} drivepoint={p} />
        ))}
        {props.geoloc.StopPoints.filter((p) => isInLimit(p)).map((p) => (
          <StopPointComponent
            isArrive={props.arrivee === p}
            isDepart={props.depart === p}
            key={p.StartDatetime}
            stopPoint={p}
            onClick={props.onClick}
          />
        ))}
        {isPointValid(props.geoloc.Departure) && (
          <PointComponent
            color={blue[500]}
            point={props.geoloc.Departure}
            label="1"
          />
        )}
        {isPointValid(props.geoloc.Arrival) && (
          <PointComponent
            color={blue[500]}
            point={props.geoloc.Arrival}
            label="2"
          />
        )}

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
      </MapLibre>
    </Box>
  );
}
