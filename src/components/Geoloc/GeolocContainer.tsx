import { useState } from "react";
import GeolocMap from "./GeolocMap";
import useGeolocService from "./useGeolocService";
import type { Point, Trip } from "./Geoloc.model";
import { Box, Button, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useParams } from "react-router";

export default function GeolocContainer() {
  const { immat, tripId } = useParams();
  const { data } = useGeolocService(immat!, tripId!);

  const [selectedPoint, setSelectedPoint] = useState<Point>();
  const [depart, setDepart] = useState<Point>();
  const [arrive, setArrive] = useState<Point>();

  const onClick = (p: Point) => setSelectedPoint(p);
  const handleSetDepart = (p: Point) => {
    setDepart(p);
    setSelectedPoint(undefined);
  };

  const handleSetArrive = (p: Point) => {
    setArrive(p);
    setSelectedPoint(undefined);
  };
  if (!data) return <>Waiting for data</>;
  console.log(data);

  const enhancedData: Trip = {
    ...data,
    // trace: data.trace.slice(limit[0], limit[1]),
    Departure: depart || data.Departure,
    Arrival: arrive || data.Arrival,
  };

  return (
    <>
      <GeolocMap
        setDepart={(p) => handleSetDepart(p)}
        setArrive={(p) => handleSetArrive(p)}
        onReset={() => setSelectedPoint(undefined)}
        geoloc={enhancedData}
        onClick={onClick}
        selectedPoint={selectedPoint}
      />
      <Box marginY={2}>
        <Typography>
          Départ : {depart?.Latitude}-{depart?.Longitude}
        </Typography>
        <Typography>
          Départ : {arrive?.Latitude}-{arrive?.Longitude}
        </Typography>
      </Box>
      <Button variant="contained" startIcon={<SendIcon />}>
        Envoyer
      </Button>
    </>
  );
}
