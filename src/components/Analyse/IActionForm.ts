export interface IActionForm {
  ActionType: { Id: string };
  Actor: { Id: string };
  comment: string;
  Constraint: { Id: string; RequiresDate?: boolean };
  Id: string;
  DueDate: string;
}
