import { Perfil } from "../../models/enum/perfil.enum";
import { Project } from "../../models/projects/project";
import { Task } from "../../models/tasks/task";

export interface UserDTO {
  id?: number;
  name: string;
  email: string;
  perfil: Perfil;
  projects?: Project[];
  tasks?: Task[];
}
