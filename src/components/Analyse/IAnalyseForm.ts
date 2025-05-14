import type { IActionForm } from "./IActionForm";

export interface IAnalyseForm {
  Immatriculation: string;
  Crew: string;
  Analyze: string;
  AnalyzeBy: string;
  LogId: number;
  Concerning: {
    Id: string;
  };

  Nature: {
    Id: string;
  };
  ImmobilizeVehicle: boolean;
  Actions: IActionForm[];
}
