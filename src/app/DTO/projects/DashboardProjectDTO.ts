import { Priority } from "../../models/enum/priority.enum";
import { StatusProject } from "../../models/enum/statusProject.enum";
import { TaskDTO } from "../tasks/taskDTO";

export interface DashboardProjectDTO {
  id?: number;
  name: string;
  startDate: string;
  endDate: string;
  responsibleUser: number;
  status: StatusProject;
  priority: Priority;
  tasks: TaskDTO[];
}
