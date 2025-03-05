import { Component } from '@angular/core';
import { Task } from 'zone.js/lib/zone-impl';
import { TasksService } from '../../../services/tasks/tasks.service';
import { SnackbarService } from '../../../shared/snackbar/services/snackbar.service';
import { TaskDTO } from '../../../DTO/tasks/taskDTO';
import { CreateTaskDTO } from '../../../DTO/tasks/CreateTaskDTO';
import { UpdateTaskDTO } from '../../../DTO/tasks/UpdateTaskDTO';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  tasks: TaskDTO[] = [];

  constructor(private taskService: TasksService, private snackbar: SnackbarService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (response) => {
        this.tasks = response;
      },
      error: () => this.snackbar.openSnackBar('Erro ao buscar tarefas!', 'error')
    });
  }

  onTaskAdded(newTask: CreateTaskDTO) {
    this.taskService.createTask(newTask).subscribe({
      next: (response) => {
        if(response) {
          this.tasks = [...this.tasks, response];
          this.snackbar.openSnackBar('Tarefa criada com sucesso!', 'success');
        }
      },
      error: () => this.snackbar.openSnackBar('Erro ao criar tarefa!', 'error')
    });
  }

  onTaskEdited(updatedTask: UpdateTaskDTO) {
    this.taskService.updateTask(updatedTask.id, updatedTask).subscribe({
      next: () => {
        // Converte as datas de dd/MM/yyyy para Date
        const startDate = this.convertToDate(updatedTask.startDate);
        const endDate = this.convertToDate(updatedTask.endDate);

        this.tasks = this.tasks.map(task => {
          if (task.id === updatedTask.id) {
            return {
              ...task,
              ...updatedTask,
              startDate: startDate,
              endDate: endDate
            };
          }
          return task;
        });

        this.snackbar.openSnackBar('Tarefa atualizada com sucesso!', 'success');
      },
      error: () => this.snackbar.openSnackBar('Erro ao atualizar tarefa!', 'error')
    });
  }

  // Função para converter dd/MM/yyyy para Date
  convertToDate(dateString: string): Date {
    const [day, month, year] = dateString.split('/');
    return new Date(+year, +month - 1, +day);
  }

  onTaskDeleted(taskId: number) {
    this.taskService.deleteTask(taskId).subscribe({
      next: (response) => {
        if (response) {
          this.tasks = this.tasks.filter(task => task.id !== taskId);
          this.snackbar.openSnackBar('Tarefa excluída com sucesso!', 'success');
        }
      },
      error: () => this.snackbar.openSnackBar('Erro ao excluir tarefa!', 'error')
    });
  }
}
