import { useRef, useState } from "react";
import GeolocMap from "./GeolocMap";
import useGeolocService from "./useGeolocService";
import type { Point, StopPoint, Trip } from "./Geoloc.model";
import { Box, Button, Stack } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useParams } from "react-router";
import LogoLoader from "../Utils/LogoLoader";
import ErrorHandler from "../Utils/Error/ErrorHandler";
import { time } from "../Utils/DateTime.service";
import useNotifSnack from "../../hooks/useNotifSnack";
import SelectedStopPoint from "./SelectedStopPoint";
import type { MapRef } from "react-map-gl/maplibre";
import MainPoint from "./MainPoint";
import { green, orange } from "@mui/material/colors";

export default function GeolocContainer() {
  const { immat, tripId } = useParams();
  const { notifyError } = useNotifSnack();

  const { getMinMax, query, mutation } = useGeolocService(immat!, tripId!);

  const [selectedPoint, setSelectedPoint] = useState<StopPoint>();
  const [depart, setDepart] = useState<StopPoint>();
  const [arrive, setArrive] = useState<StopPoint>();
  const mapRef = useRef<MapRef>(null);

  const onClick = (p: StopPoint) => setSelectedPoint(p);

  const centerOnPoint = (p: Point) => {
    let map = mapRef.current?.getMap();
    if (!map) return console.log("No map");
    return map.flyTo({
      center: [p.Longitude, p.Latitude],
      zoom: 17,
    });
  };

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
      // StopPoints: query.data.StopPoints.filter(
      //   (p) =>
      //     time(p.StartDatetime) >= time(depart.StartDatetime) &&
      //     time(p.StartDatetime) <= time(arrive.StartDatetime)
      // ),
      StopPoints: [depart, arrive],
      Departure: query.data.Departure,
      Arrival: query.data.Arrival,
      TripDescription: query.data.TripDescription,
      TripId: query.data.TripId,
    };
    mutation.mutate(trip);
  };

  function distanceInMeters(p1?: Point, p2?: Point) {
    if (!p1 || !p2) return undefined;
    const R = 6371000; // Rayon de la Terre en mètres
    const toRad = (value: number) => (value * Math.PI) / 180;

    const φ1 = toRad(p1.Latitude);
    const φ2 = toRad(p2.Latitude);
    const Δφ = toRad(p2.Latitude - p1.Latitude);
    const Δλ = toRad(p2.Longitude - p1.Longitude);

    const a =
      Math.sin(Δφ / 2) ** 2 +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance en mètres
  }

  const minMax = getMinMax(query.data.DrivePoints, query.data.StopPoints);

  return (
    <Box display={"flex"} flexDirection={"row"} height={"100%"}>
      <Box flex={4}>
        <GeolocMap
          mapRef={mapRef}
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
      </Box>

      <Stack gap={1} direction={"column"} flex={1} padding={2}>
        <MainPoint
          title={query.data.Departure.Label}
          point={query.data.Departure}
          color={green[200]}
          onClick={centerOnPoint}
        />
        <MainPoint
          title={query.data.Arrival.Label}
          point={query.data.Arrival}
          color={orange[200]}
          onClick={centerOnPoint}
        />
        <SelectedStopPoint
          distance={distanceInMeters(depart, query.data.Departure)}
          onClick={centerOnPoint}
          point={depart}
          title="Départ séléctionné"
        />
        <SelectedStopPoint
          distance={distanceInMeters(arrive, query.data.Arrival)}
          onClick={centerOnPoint}
          point={arrive}
          title="Arrivée séléctionné"
        />

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
      </Stack>
    </Box>
  );
}
