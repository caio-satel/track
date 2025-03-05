export interface CreateReleaseDTO {
  id?: number;
  description: string;
  dateRelease: string;
  startTime: string;
  endTime: string;
  taskId: number;
}
