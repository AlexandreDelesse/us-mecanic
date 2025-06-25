import { useState } from "react";
import GeolocMap from "./GeolocMap";
import useGeolocService from "./useGeolocService";
import type { StopPoint } from "./Geoloc.model";
import { Box, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useParams } from "react-router";
import LogoLoader from "../Utils/LogoLoader";
import ErrorHandler from "../Utils/Error/ErrorHandler";

export default function GeolocContainer() {
  const { immat, tripId } = useParams();
  const { data, getMinMax, isLoading, isError, error } = useGeolocService(
    immat!,
    tripId!
  );

  const [selectedPoint, setSelectedPoint] = useState<StopPoint>();
  const [depart, setDepart] = useState<StopPoint>();
  const [arrive, setArrive] = useState<StopPoint>();

  const onClick = (p: StopPoint) => setSelectedPoint(p);

  const handleSetDepart = (p: StopPoint) => {
    setDepart(p);
    if (arrive === p) setArrive(undefined);
    setSelectedPoint(undefined);
  };

  const handleSetArrive = (p: StopPoint) => {
    setArrive(p);
    if (depart === p) setDepart(undefined);
    setSelectedPoint(undefined);
  };

  if (isLoading) return <LogoLoader />;
  if (isError) return <ErrorHandler error={error} />;
  if (!data) return <>No data</>;

  const onSend = () => {
    alert(
      `depart : ${depart?.Latitude}:${depart?.Longitude}. arrive : ${arrive?.Latitude}:${arrive?.Longitude}`
    );
  };

  const minMax = getMinMax(data.DrivePoints, data.StopPoints);

  return (
    <>
      <GeolocMap
        minMax={minMax}
        depart={depart}
        arrivee={arrive}
        setDepart={(p) => handleSetDepart(p)}
        setArrive={(p) => handleSetArrive(p)}
        onReset={() => setSelectedPoint(undefined)}
        geoloc={data}
        onClick={onClick}
        selectedPoint={selectedPoint}
      />
      <Box display={"flex"} gap={2} alignItems={"center"}>
        <Button
          sx={{ marginTop: 1 }}
          onClick={onSend}
          variant="contained"
          startIcon={<SendIcon />}
        >
          Envoyer
        </Button>
        <Box display={"flex"} gap={2} alignItems={"center"}>
          Départ :{" "}
          {depart && (
            <Box>
              {depart?.Latitude};{depart?.Longitude} -{" "}
              {new Date(depart?.StartDatetime || "").toLocaleTimeString()}
            </Box>
          )}
        </Box>
        <Box display={"flex"} gap={2} alignItems={"center"}>
          Arrivée :
          {arrive && (
            <Box>
              {arrive?.Latitude};{arrive?.Longitude} -{" "}
              {new Date(arrive?.StartDatetime || "").toLocaleTimeString()}
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}
