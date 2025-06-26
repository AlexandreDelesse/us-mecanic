import { geoClient } from "../../api/client";
import type { Trip } from "./Geoloc.model";

export const getGeoloc = async (immat: string, tripId: string) => {
  return (
    await geoClient.get(`CertifyTrip?gTripId=${tripId}&strImmat=${immat}`)
  ).data;
};

export const postGeoloc = async (trip: Trip) => {
  console.log(trip);
  return;
};
