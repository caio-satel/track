import { StatusTask } from "../../models/enum/statusTask.enum";

export interface UpdateTaskDTO {
  id?: number;
  name: string;
  startDate: string;
  endDate: string;
  projectId: number;
  status: StatusTask;
  userResponsibleId?: number;
  collaborators: number[];
}
