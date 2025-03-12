export interface CreateTaskDTO {
  name: string;
  startDate: string;
  endDate: string;
  projectId: number;
  userResponsibleId?: number;
  collaborators: number[];
}
