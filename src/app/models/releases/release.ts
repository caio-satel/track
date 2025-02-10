export interface Release {
  id?: number;
  taskId: number;
  userResponsibleId: number;
  description: string;
  startDate: Date;
  endDate: Date;
  createdAt?: Date;
}
