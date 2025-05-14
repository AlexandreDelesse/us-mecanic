import { useQuery } from "@tanstack/react-query";
import { getConcerning } from "../../services/ReferenceData.service";

export default function useGetAction() {
  const request = useQuery({
    queryKey: ["referencedData", "actions"],
    queryFn: getConcerning,
  });
  return request;
}
