import { Priority } from "../../models/enum/priority.enum";
import { StatusProject } from "../../models/enum/statusProject.enum";

export  interface ProjectDTO {
  id?: number;
  name: string;
  startDate: Date;
  endDate: Date;
  responsibleUser: number;
  status?: StatusProject;
  priority: Priority;
}
