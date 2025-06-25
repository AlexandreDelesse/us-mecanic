import { useQuery } from "@tanstack/react-query";
import { getGeoloc } from "./Geoloc.api";
import type { AxiosError } from "axios";
import type { DrivePoint, StopPoint, Trip } from "./Geoloc.model";

export default function useGeolocService(immat: string, tripId: string) {
  const query = useQuery<Trip, AxiosError>({
    queryKey: ["geoloc"],
    queryFn: () => getGeoloc(immat, tripId),
  });

  const getMinMax = (
    drivePoints: DrivePoint[],
    stopPoints: StopPoint[]
  ): [number, number] => {
    const pointsTimestamps = [
      ...drivePoints.map((p) => new Date(p.LocalTime).getTime()),
      ...stopPoints.map((p) => new Date(p.StartDatetime).getTime()),
    ];
    const min = Math.min(...pointsTimestamps);
    const max = Math.max(...pointsTimestamps);
    return [min, max];
  };
  return { ...query, getMinMax };
}
