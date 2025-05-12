import client from "../api/client";
import type { IMecanicLog } from "../components/MecanicLog/IMecanicLog";

const getMecanicLogs = async () => {
  try {
    const request = await client.get("api/MecanicLog");
    return request.data;
  } catch (error) {
    throw error;
  }
};

const getMecanicLogsById = async (id: number) => {
  try {
    const mecanicLogs = await getMecanicLogs();
    return mecanicLogs.find((log: IMecanicLog) => log.Id === id);
  } catch (error) {
    throw error;
  }
};

export { getMecanicLogs, getMecanicLogsById };
