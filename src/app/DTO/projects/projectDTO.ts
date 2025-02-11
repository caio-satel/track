import { Priority } from "../../models/enum/priority.enum";

export  interface ProjectDTO {
  id?: number;
  name: string;
  startDate: Date;
  endDate: Date;
  userResponsibleId: number;
  priority: Priority;
}
