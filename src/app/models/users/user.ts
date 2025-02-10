import { Perfil } from "../enum/perfil.enum";
import { Project } from "../projects/project";
import { Task } from "../tasks/task";

export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  acessTime?: Date;
  perfil: Perfil;
  projects: Project[];
  tasks: Task[];
}
