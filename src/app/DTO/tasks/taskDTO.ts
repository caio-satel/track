import { StatusTask } from "../../models/enum/statusTask.enum";

export interface TaskDTO {
  id?: number;
  name: string;
  startDate: Date;
  endDate: Date;
  status?: StatusTask;
  projectId?: number;
}
