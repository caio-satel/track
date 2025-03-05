export interface CreateTaskDTO {
  name: string;
  startDate: Date;
  endDate: Date;
  projectId: number;
  userResponsibleId?: number;
  collaborators: number[];
}
