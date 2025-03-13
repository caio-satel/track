import { Component, ElementRef, ViewChild } from '@angular/core';
import { TasksService } from '../../services/tasks/tasks.service';
import { Chart, registerables  } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-tasks-reports',
  templateUrl: './tasks-reports.component.html',
  styleUrl: './tasks-reports.component.css'
})
export class TasksReportsComponent {
  @ViewChild('chartTasksByStatusAndUser') chartTasksByStatusAndUser!: ElementRef;

  constructor(
    private tasksService: TasksService
  ) { }

  ngAfterViewInit(): void {
    this.countTasksByStatusAndUserData();
  }

  countTasksByStatusAndUserData(): void {
    this.tasksService.getUserTaskProjectDetails().subscribe(data => {
      // Coletando os nomes dos usuários
      const chartLabels = Array.from(new Set(data.map(item => item[0]))); // Nome do usuário (índice 0)

      // Definindo os status de tarefas
      const taskStatuses = ['OPEN', 'PROGRESS', 'DONE', 'PAUSED'];

      // Organizando os dados para contar as tarefas por status e usuário
      const taskData = chartLabels.map(user => {
        return taskStatuses.map(status => {
          // Contando quantas tarefas com o status específico existem por usuário
          return data.filter((item) => item[0] === user && item[2] === status).length;
        });
      });

      this.renderChartTasksByStatusAndUser(chartLabels, taskStatuses, taskData);
    });
  }

  renderChartTasksByStatusAndUser(labels: string[], taskStatus: string[], data: number[][]): void {
    const ctx = this.chartTasksByStatusAndUser.nativeElement.getContext('2d');
    const backgroundColors = taskStatus.map(() => this.getRandomColor());

    const datasets = taskStatus.map((status, statusIndex) => ({
      label: status,
      data: labels.map((user, userIndex) => data[userIndex][statusIndex]), // Quantidade de tarefas por status e usuário
      backgroundColor: backgroundColors[statusIndex].replace('rgb', 'rgba').replace(')', ', 0.2)'),
      borderColor: backgroundColors[statusIndex],
      borderWidth: 1
    }));

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels, // Nomes dos usuários
        datasets: datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            stacked: true // Barra empilhada por status de cada usuário
          },
          y: {
            stacked: true
          }
        },
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Total de Tarefas por Status e Usuário',
            font: {
              size: 20,
              weight: 'bold',
            },
            color: '#fff'
          }
        }
      }
    });
  }

  getRandomColor(): string {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  }
}
