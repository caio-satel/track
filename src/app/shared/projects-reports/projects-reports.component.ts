import { Component, ElementRef, ViewChild } from '@angular/core';
import { ProjectsService } from '../../services/projects/projects.service';
import { Chart, registerables  } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-projects-reports',
  templateUrl: './projects-reports.component.html',
  styleUrl: './projects-reports.component.css'
})
export class ProjectsReportsComponent {
  @ViewChild('totalHoursLaunchedByProjects') chartTotalHoursLaunched!: ElementRef;
  @ViewChild('countOngoingTasksByProjects') chartCountOngoingTasksByProjects!: ElementRef;

  constructor(
    private projectsService: ProjectsService
  ) {}

  ngAfterViewInit(): void {
    this.hoursLaunchedByProjects30DaysData();
    this.countOngoingTasksByProjectsData();
  }

  hoursLaunchedByProjects30DaysData(): void {
    this.projectsService.totalHoursLaunchedByProjects30days().subscribe(data => {
      const chartLabels = data.map(item => item[0]);  // Nome dos projetos
      const chartData = data.map(item => item[1]);    // Total de horas trabalhadas por projeto

      this.renderChartProjects30Days(chartLabels, chartData);
    });
  }

  renderChartProjects30Days(labels: string[], data: number[]): void {
    const ctx = this.chartTotalHoursLaunched.nativeElement.getContext('2d');
    const backgroundColors = labels.map(() => this.getRandomColor());

    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          label: 'Total de Horas por Projeto',
          data: data,
          backgroundColor: backgroundColors,
          borderColor: backgroundColors.map(color => color.replace('rgb', 'rgba').replace(')', ', 0.8)')),
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
            text: 'Total de Horas Lançadas por Projeto (Últimos 30 dias)',
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

  countOngoingTasksByProjectsData(): void {
    this.projectsService.countOngoingTasksByProjects().subscribe(data => {
      const chartLabels = data.map(item => item[0]);  // Nome dos projetos
      const chartData = data.map(item => item[1]);    // Total de tarefas em andamento por projeto

      this.renderChartOngoingTasksByProjects(chartLabels, chartData);
    });
  }

  renderChartOngoingTasksByProjects(labels: string[], data: number[]): void {
    const ctx = this.chartCountOngoingTasksByProjects.nativeElement.getContext('2d');
    const backgroundColors = labels.map(() => this.getRandomColor());

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Total de Atividades em Andamento',
          data: data,
          backgroundColor: backgroundColors.map(color => color.replace('rgb', 'rgba').replace(')', ', 0.2)')),
          borderColor: backgroundColors.map(color => color.replace('rgb', 'rgba').replace(')', ', 0.8)')),
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Total de Atividades em Andamento por Projeto',
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

  // Função para gerar cores aleatórias
  getRandomColor(): string {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  }
}
