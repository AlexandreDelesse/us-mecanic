import { geoClient } from "../../api/client";

export const getGeoloc = async (immat: string, tripId: string) => {
  return (
    await geoClient.get(`CertifyTrip?gTripId=${tripId}&strImmat=${immat}`)
  ).data;
};
