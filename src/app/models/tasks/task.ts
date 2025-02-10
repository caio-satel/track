import { StatusTask } from "../enum/statusTask.enum";

export interface Task {
  id?: number;
  projectId: number;
  userResponsibleId: number;
  name: string;
  startDate: Date;
  endDate: Date;
  status: StatusTask;
  createdAt?: Date;
}
