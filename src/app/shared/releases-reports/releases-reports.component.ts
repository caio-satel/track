import { Component, ElementRef, ViewChild } from '@angular/core';
import { ReleasesService } from '../../services/releases/releases.service';
import { Chart, registerables  } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-releases-reports',
  templateUrl: './releases-reports.component.html',
  styleUrl: './releases-reports.component.css'
})
export class ReleasesReportsComponent {
  @ViewChild('totalHoursLaunchedByUsers') chartTotalHoursLaunchedByUsers!: ElementRef

  constructor(
    private releasesService: ReleasesService
  ) { }

  ngAfterViewInit(): void {
    this.usersLaunchesAndTotalHoursData();
  }

  usersLaunchesAndTotalHoursData(): void {
    this.releasesService.totalReleasesAndHoursLaunchedByUser().subscribe(data => {
      const chartLabels = data.map(item => item[0]);  // Nomes dos usuários
      const chartLaunchesData = data.map(item => item[1]);  // Total de lançamentos
      const chartHoursData = data.map(item => item[2]);    // Total de horas

      this.renderChartUsersLaunchesAndHours(chartLabels, chartLaunchesData, chartHoursData);
    });
  }

  renderChartUsersLaunchesAndHours(labels: string[], launchesData: number[], hoursData: number[]): void {
    const ctx = this.chartTotalHoursLaunchedByUsers.nativeElement.getContext('2d');
    const backgroundColors = labels.map(() => this.getRandomColor());

    new Chart(ctx, {
      type: 'bar',  // Tipo de gráfico, pode ser 'bar', 'line', etc.
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Total de Lançamentos',
            data: launchesData,
            backgroundColor: backgroundColors,
            borderColor: backgroundColors.map(color => color.replace('rgb', 'rgba').replace(')', ', 0.8)')),
            borderWidth: 1
          },
          {
            label: 'Total de Horas',
            data: hoursData,
            backgroundColor: backgroundColors.map(() => 'rgba(153, 102, 255, 0.2)'), // Cor diferente para horas
            borderColor: backgroundColors.map(() => 'rgba(153, 102, 255, 1)'),
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            beginAtZero: true
          },
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            position: 'top'
          },
          title: {
            display: true,
            text: 'Lançamentos e Total de Horas por Usuário',
            font: {
              size: 20,
              weight: 'bold'
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
