import { Priority } from "../enum/priority.enum";
import { StatusProject } from "../enum/statusProject.enum";
import { Task } from "../tasks/task";
import { User } from "../users/user";

export  interface Project {
  id?: number;
  name: string;
  startDate: Date;
  endDate: Date;
  status: StatusProject;
  userResponsibleId: number;
  createdAt?: Date;
  priority: Priority;
  users: User[];
  tasks: Task[];
}
