import { useParams } from "react-router";
import useGetMecanicLogById from "../../hooks/mecanicLog/useGetMecanicLogById";
import AsyncComponent from "../Utils/AsyncComponent";
import type { IMecanicLog } from "./IMecanicLog";
import LogResume from "./LogResume";

export default function AsyncMecanicLogResume() {
  const params = useParams();

  const request = useGetMecanicLogById(params.logId || "-1");

  return (
    <AsyncComponent
      query={request}
      render={(data: IMecanicLog) => <LogResume log={data} />}
    />
  );
}
