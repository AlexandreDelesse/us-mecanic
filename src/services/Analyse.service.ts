import client from "../api/client";

const getAnalyseById = async (logId: string) => {
  try {
    const request = await client.get(`analyze/${logId}`);
    return request.data;
  } catch (error) {
    throw error;
  }
};

export { getAnalyseById };
