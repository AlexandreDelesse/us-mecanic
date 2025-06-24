import { useQuery } from "@tanstack/react-query";
import { getGeoloc } from "./Geoloc.api";

export default function useGeolocService(immat: string, tripId: string) {
  const query = useQuery({
    queryKey: ["geoloc"],
    queryFn: () => getGeoloc(immat, tripId),
  });
  return query;
}
