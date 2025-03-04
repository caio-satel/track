import { Priority } from "../../models/enum/priority.enum";
import { StatusProject } from "../../models/enum/statusProject.enum";

export interface UpdateProjectDTO {
  id?: number;
  name: string;
  startDate: Date;
  endDate: Date;
  responsibleUser: number;
  priority: Priority;
  status: StatusProject;
}
