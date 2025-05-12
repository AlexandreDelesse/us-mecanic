import type { IAction } from "./IAction";

export interface IAnalyse {
  Immatriculation: string | null;
  Crew: string | null;
  Analyze: string | null;
  AnalyzeBy: string | null;
  Concerning: IDisplayValue;
  LogId: number;
  Nature: IDisplayValue;
  ImmobilizeVehicle: boolean;
  Actions: IAction[];
  Date: string | null;
}

export interface IDisplayValue {
  Id: number;
  Value: string | null;
}
