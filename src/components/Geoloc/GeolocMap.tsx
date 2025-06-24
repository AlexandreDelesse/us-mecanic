import { Box, MenuItem, MenuList, Slider, Typography } from "@mui/material";
import MapLibre, {
  Marker,
  NavigationControl,
  Popup,
} from "react-map-gl/maplibre";
import type { Point, Trip } from "./Geoloc.model";
import { green, orange } from "@mui/material/colors";
import { useEffect, useState } from "react";

interface GeolocMapProps {
  geoloc: Trip;
  onClick: (p: Point) => void;
  onReset: () => void;
  selectedPoint?: Point;
  setDepart: (p: Point) => void;
  setArrive: (p: Point) => void;
}
export default function GeolocMap(props: GeolocMapProps) {
  useEffect(() => console.log(props.selectedPoint), [props.selectedPoint]);

  const min = new Date(props.geoloc.DrivePoints[0].LocalTime).getTime();
  const max = new Date(
    props.geoloc.DrivePoints[props.geoloc.DrivePoints.length - 1].LocalTime
  ).getTime();

  const [limit, setLimit] = useState<number[]>([min, max]);

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
      <Typography>
        Limite : {valueLabelFormat(limit[0])} à {valueLabelFormat(limit[1])}
      </Typography>
      <Slider
        valueLabelDisplay="auto"
        value={limit}
        onChange={(_e, value) => setLimit(value)}
        min={min}
        max={max}
        valueLabelFormat={valueLabelFormat}
      />
      <MapLibre
        initialViewState={initialViewState}
        style={{ width: "100%", height: 400 }}
        mapStyle="http://localhost:8080/styles/basic-preview/style.json"
      >
        <NavigationControl position="top-right" />
        {props.geoloc.DrivePoints.filter(
          (t) =>
            new Date(t.LocalTime).getTime() >= limit[0] &&
            new Date(t.LocalTime).getTime() <= limit[1]
        ).map((p, i) => (
          <Marker
            key={i}
            latitude={p.Latitude}
            longitude={p.Longitude}
            onClick={() => props.onClick(p)}
          >
            <div
              style={{
                width: "5px",
                height: "5px",
                backgroundColor: "red",
                borderRadius: "50%",
                //   border: "1px solid white",
                //   boxShadow: "0 0 3px black",
              }}
            />
          </Marker>
        ))}
        <Marker
          onClick={() => props.onClick(props.geoloc.Departure)}
          latitude={props.geoloc.Departure.Latitude}
          longitude={props.geoloc.Departure.Longitude}
          color={green[500]}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "12px",
              height: "12px",
              color: "white",
              padding: "4px",
              backgroundColor: "green",
              borderRadius: "50%",
              border: "1px solid white",
              boxShadow: "0 0 3px black",
              fontWeight: "600",
            }}
          >
            1
          </Box>
        </Marker>
        <Marker
          onClick={() => props.onClick(props.geoloc.Arrival)}
          latitude={props.geoloc.Arrival.Latitude}
          longitude={props.geoloc.Arrival.Longitude}
          color={orange[500]}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "12px",
              height: "12px",
              color: "white",
              padding: "4px",
              backgroundColor: orange[500],
              borderRadius: "50%",
              border: "1px solid white",
              boxShadow: "0 0 3px black",
              fontWeight: "600",
            }}
          >
            2
          </Box>
        </Marker>
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
        {/* <Marker latitude={marker.latitude} longitude={marker.longitude} /> */}
      </MapLibre>
    </Box>
  );
}
