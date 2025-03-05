import { Priority } from "../../models/enum/priority.enum";
import { StatusProject } from "../../models/enum/statusProject.enum";

export interface UpdateProjectDTO {
  id?: number;
  name: string;
  startDate: string;
  endDate: string;
  responsibleUser: number;
  priority: Priority;
  status: StatusProject;
}
