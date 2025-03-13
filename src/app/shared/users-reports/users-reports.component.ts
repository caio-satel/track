import { UsersService } from './../../services/users/users.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables  } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-users-reports',
  templateUrl: './users-reports.component.html',
  styleUrl: './users-reports.component.css'
})
export class UsersReportsComponent {
  @ViewChild('totalHoursLaunched') chartTotalHoursLaunched!: ElementRef;
  @ViewChild('totalProjectsByUser') chartCountProjectsByUser!: ElementRef;
  @ViewChild('totalTasksByUser') chartTotalTasksByUser!: ElementRef;

  constructor(
    private usersService: UsersService
  ) {}

  ngAfterViewInit(): void {
    this.hoursLaunchedData();
    this.projectsByUserData();
    this.loadTasksData();
  }

  hoursLaunchedData(): void {
    this.usersService.getTotalHoursByUser().subscribe(data => {
      const chartLabels = data.map(item => item[0]);  // Nome dos usuários
      const chartData = data.map(item => item[1]);    // Total de horas

      this.renderChartTotalHours(chartLabels, chartData);
    });
  }

  renderChartTotalHours(labels: string[], data: number[]): void {
    const ctx = this.chartTotalHoursLaunched.nativeElement.getContext('2d');
    const backgroundColors = labels.map(() => this.getRandomColor());

    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          label: 'Total de Horas por Usuário',
          data: data,
          backgroundColor: backgroundColors,
          hoverOffset: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Total de Horas Lançadas por Usuário',
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

  projectsByUserData(): void {
    this.usersService.getTotalProjectsByUser().subscribe(data => {
      const chartLabels = data.map(item => item[0]);  // Nome dos usuários
      const chartData = data.map(item => item[1]);    // Total de projetos

      this.renderChartProjectsByUser(chartLabels, chartData);
    });
  }

  renderChartProjectsByUser(labels: string[], data: number[]): void {
    const ctx = this.chartCountProjectsByUser.nativeElement.getContext('2d');
    const backgroundColors = labels.map(() => this.getRandomColor());

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Total de Projetos',
          data: data,
          backgroundColor: backgroundColors,
          borderColor: backgroundColors.map(color => color.replace('rgb', 'rgba').replace(')', ', 0.8)')),
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Total de Projetos',
              font: {
                size: 14,
                weight: 'bold'
              },
              color: '#fff'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Usuários',
              font: {
                size: 14,
                weight: 'bold'
              },
              color: '#fff'
            }
          }
        },
        plugins: {
          legend: {
            display: true
          },
          title: {
            display: true,
            text: 'Qunatidade de Projetos que o Usuário é Responsável',
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

  loadTasksData(): void {
    this.usersService.getTotalTasksByUser().subscribe(data => {
        const chartLabels = data.map(item => item[0]); // Nomes dos usuários
        const chartData = data.map(item => item[1]);   // Quantidade de tarefas

        this.renderChartTasksByUser(chartLabels, chartData);
    });
  }

  renderChartTasksByUser(labels: string[], data: number[]): void {
  const ctx = this.chartTotalTasksByUser.nativeElement.getContext('2d');
  const backgroundColors = labels.map(() => this.getRandomColor());

  new Chart(ctx, {
      type: 'pie',
      data: {
          labels: labels,
          datasets: [{
              label: 'Total de Tarefas',
              data: data,
              backgroundColor: backgroundColors,
              borderWidth: 1
          }]
      },
      options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Total de Tarefas por Usuário (Exceto Concluídas)',
              font: {
                size: 18,
                weight: 'bold',
              },
              color: '#fff'
            }
          }
      }
  });
  }

  // Função para gerar cores aleatórias
  getRandomColor(): string {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  }
}
