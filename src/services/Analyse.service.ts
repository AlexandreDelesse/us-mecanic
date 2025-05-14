import client from "../api/client";
import type { IAction } from "../components/Analyse/IAction";
import type { IActionForm } from "../components/Analyse/IActionForm";
import type { IAnalyse } from "../components/Analyse/IAnalyse";
import type { IAnalyseForm } from "../components/Analyse/IAnalyseForm";

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

const analyzeToForm = (analyze: IAnalyse): IAnalyseForm => ({
  Actions: analyze.Actions.map((action) => actionToForm(action)),
  Analyze: analyze.Analyze || "",
  AnalyzeBy: analyze.AnalyzeBy || "",
  Concerning: { Id: analyze.Concerning.Id.toString() },
  Crew: analyze.Crew || "",
  Immatriculation: analyze.Immatriculation || "",
  ImmobilizeVehicle: analyze.ImmobilizeVehicle || false,
  LogId: analyze.LogId || -1,
  Nature: { Id: analyze.Nature.Id.toString() },
});

const actionToForm = (action: IAction): IActionForm => ({
  ActionType: { Id: action.ActionType.Id.toString() },
  Actor: { Id: action.Actor.Id.toString() },
  comment: action.comment || "",
  Constraint: { Id: action.Constraint.Id.toString() },
  DueDate: action.DueDate || "",
  Id: action.Id.toString(),
});

export { getAnalyseById, postAnalyze, analyzeToForm, putAnalyse };
