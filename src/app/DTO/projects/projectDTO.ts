import { Priority } from "../../models/enum/priority.enum";
import { StatusProject } from "../../models/enum/statusProject.enum";

export  interface ProjectDTO {
  id?: number;
  name: string;
  startDate: string;
  endDate: string;
  responsibleUser: number;
  status?: StatusProject;
  priority: Priority;
}
