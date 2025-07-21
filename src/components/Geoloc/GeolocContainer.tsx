import { useState } from "react";
import GeolocMap from "./GeolocMap";
import useGeolocService from "./useGeolocService";
import type { StopPoint, Trip } from "./Geoloc.model";
import { Box, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useParams } from "react-router";
import LogoLoader from "../Utils/LogoLoader";
import ErrorHandler from "../Utils/Error/ErrorHandler";
import { time } from "../Utils/DateTime.service";
import useNotifSnack from "../../hooks/useNotifSnack";

export default function GeolocContainer() {
  const { immat, tripId } = useParams();
  const { notifyError } = useNotifSnack();

  const { getMinMax, query, mutation } = useGeolocService(immat!, tripId!);

  const [selectedPoint, setSelectedPoint] = useState<StopPoint>();
  const [depart, setDepart] = useState<StopPoint>();
  const [arrive, setArrive] = useState<StopPoint>();

  const onClick = (p: StopPoint) => setSelectedPoint(p);

  const handleSetDepart = (p: StopPoint) => {
    if (arrive && time(arrive.StartDatetime) < time(p.StartDatetime))
      return notifyError("le depart ne peut pas succéder l'arrivée");

    setDepart(p);
    if (arrive === p) setArrive(undefined);
    setSelectedPoint(undefined);
  };

  const handleSetArrive = (p: StopPoint) => {
    if (depart && time(depart.StartDatetime) > time(p.StartDatetime))
      return notifyError("L'arrivé ne peut pas preceder le départ");
    setArrive(p);
    if (depart === p) setDepart(undefined);
    setSelectedPoint(undefined);
  };

  if (query.isLoading) return <LogoLoader />;
  if (query.isError) return <ErrorHandler error={query.error} />;
  if (!query.data) return <>No data</>;

  const onSend = () => {
    if (!depart || !arrive) return;
    const trip: Trip = {
      DrivePoints: query.data.DrivePoints.filter(
        (p) =>
          time(p.LocalTime) > time(depart.StartDatetime) &&
          time(p.LocalTime) < time(arrive.StartDatetime)
      ),
      StopPoints: query.data.StopPoints.filter(
        (p) =>
          time(p.StartDatetime) >= time(depart.StartDatetime) &&
          time(p.StartDatetime) <= time(arrive.StartDatetime)
      ),
      Departure: { Latitude: depart.Latitude, Longitude: depart.Longitude },
      Arrival: { Latitude: arrive.Latitude, Longitude: arrive.Longitude },
      TripDescription: query.data.TripDescription,
      TripId: query.data.TripId,
    };
    mutation.mutate(trip);
  };

  const minMax = getMinMax(query.data.DrivePoints, query.data.StopPoints);

  return (
    <Box display={"flex"} flexDirection={"column"} height={"100%"}>
      <GeolocMap
        minMax={minMax}
        depart={depart}
        arrivee={arrive}
        setDepart={(p) => handleSetDepart(p)}
        setArrive={(p) => handleSetArrive(p)}
        onReset={() => setSelectedPoint(undefined)}
        geoloc={query.data}
        onClick={onClick}
        selectedPoint={selectedPoint}
      />

      <Box display={"flex"} gap={2} alignItems={"center"}>
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
        <Box flex={1} />
        <Button
          sx={{ marginTop: 1 }}
          onClick={onSend}
          variant="contained"
          startIcon={<SendIcon />}
          disabled={mutation.isPending}
          loading={mutation.isPending}
        >
          Certifier
        </Button>
      </Box>
    </Box>
  );
}
