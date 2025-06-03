import client from "../api/client";
import type { IActionCmd } from "../components/Analyse/IAction";
import type { IActionForm } from "../components/Analyse/IAction";

import type { AnalyseCmd, IAnalyseForm } from "../components/Analyse/IAnalyse";

const getAnalyseById = async (logId: string) => {
  try {
    const request = await client.get(`analyze/${logId}`);
    return request.data;
  } catch (error) {
    throw error;
  }
};

const postAnalyze = async (analyse: IAnalyseForm) => {
  try {
    await client.post("analyze", analyse);
  } catch (error) {
    throw error;
  }
};

const putAnalyse = async (analyze: IAnalyseForm) => {
  try {
    await client.put("analyze", analyze);
  } catch (error) {
    throw error;
  }
};

const actionFormToCmd = (action: IActionForm): IActionCmd => ({
  ActionTypeId: { Id: action.ActionTypeId.toString() },
  Actor: { Id: action.ActorId.toString() },
  comment: action.comment || "",
  Constraint: { Id: action.ConstraintId.toString() },
  DueDate: action.DueDate || "",
  Id: action.Id.toString(),
});

const analyzeFormToCmd = (
  analyse: IAnalyseForm,
  infos: {
    AnalyzeBy: string;
    crew: string;
    immatriculation: string;
    logId: number;
  }
): AnalyseCmd => {
  return {
    Analyze: analyse.Analyze,
    AnalyzeBy: infos.AnalyzeBy,
    ConcerningId: parseInt(analyse.ConcerningId),
    Crew: infos.crew,
    Immatriculation: infos.immatriculation,
    ImmobilizeVehicle: analyse.ImmobilizeVehicle,
    LogId: infos.logId,
    NatureId: parseInt(analyse.NatureId),
  };
};

export { getAnalyseById, postAnalyze, putAnalyse };
