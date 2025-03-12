import { StatusTask } from "../../models/enum/statusTask.enum";

export interface TaskDTO {
  id?: number;
  name: string;
  startDate: string;
  endDate: string;
  status?: StatusTask;
  projectId?: number;
}
