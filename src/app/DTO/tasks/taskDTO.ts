import { StatusTask } from "../../models/enum/statusTask.enum";

export interface TaskDTO {
  id?: number;
  projectId: number;
  userResponsibleId: number;
  name: string;
  startDate: Date;
  endDate: Date;
  status: StatusTask;
}
