import client from "../api/client";

const getActors = async () => {
  try {
    const request = await client.get("api/ReferenceData/actors");
    return request.data;
  } catch (error) {
    throw error;
  }
};

const getActions = async () => {
  try {
    const request = await client.get("api/ReferenceData/actions");
    return request.data;
  } catch (error) {
    throw error;
  }
};

const getConstraints = async () => {
  try {
    const request = await client.get("api/ReferenceData/constraints");
    return request.data;
  } catch (error) {
    throw error;
  }
};

const getNature = async () => {
  try {
    const request = await client.get("api/ReferenceData/nature");
    return request.data;
  } catch (error) {
    throw error;
  }
};

const getConcerning = async () => {
  try {
    const request = await client.get("api/ReferenceData/concerning");
    return request.data;
  } catch (error) {
    throw error;
  }
};

export { getActions, getActors, getConcerning, getConstraints, getNature };
