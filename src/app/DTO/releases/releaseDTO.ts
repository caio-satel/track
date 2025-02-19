export interface ReleaseDTO {
  id?: number;
  taskId: number;
  userId: number;
  description: string;
  startDate: Date;
  endDate: Date;
}
