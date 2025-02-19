import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Project } from '../../../models/projects/project';
import { StatusProject } from '../../../models/enum/statusProject.enum';
import { Priority } from '../../../models/enum/priority.enum';
import { StatusTask } from '../../../models/enum/statusTask.enum';
import { ThemeService } from '../../../services/theme-service/theme-service.service';
import { Subject, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ReleasesFormComponent } from '../../releases/components/releases-form/releases-form.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, OnDestroy {
  dialog: MatDialog = inject(MatDialog);
  projects: Project[] = []; // Lista de projetos
  projectColumns: string[] = ['name', 'startDate', 'endDate', 'status', 'priority', 'userResponsible'];
  taskColumns: string[] = ['taskName', 'taskStartDate', 'taskEndDate', 'taskStatus'];
  isLightTheme: boolean = false;  // Para armazenar o estado do tema
  private destroy$ = new Subject<void>();

  currentDate: string = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric'
  });

  constructor(private themeService: ThemeService) { }

  ngOnInit() {
    this.subscribeTheme(); // Inscrever no Observable do ThemeService
    this.updateTime(); // Data/Mês na inicialização do componente Dashboard
    this.loadProjects(); // Mockup de dados
    // Chamar o service de projetos para atualizar a lista de projetos e suas tasks
  }

  // Data do dia e mês exibidos na dashboard
  updateTime() {
    const now = new Date();
    // Atualiza a data sempre que necessário
    this.currentDate = now.toLocaleDateString('pt-BR', {
      weekday: 'long', day: '2-digit', month: 'long'
    });
  }

  loadProjects() {
    // Simulação de dados - substituir pela chamada ao backend do services de projetos e armazenar em this.projects
    this.projects = [
      {
        id: 1,
        name: "Projeto Angular",
        startDate: new Date('2024-02-01'),
        endDate: new Date('2024-04-01'),
        status: StatusProject.PROGRESS,
        userResponsibleId: 2,
        priority: Priority.HIGH,
        users: [],
        tasks: [
          { name: "Criar componentes", projectId: 1, userResponsibleId: 2, startDate: new Date('2024-02-02'), endDate: new Date('2024-02-10'), status: StatusTask.DONE },
          { name: "Implementar API", startDate: new Date('2024-02-11'), projectId: 1, userResponsibleId: 2, endDate: new Date('2024-03-01'), status: StatusTask.PROGRESS }
        ]
      },
      {
        id: 2,
        name: "Sistema de Vendas",
        startDate: new Date('2024-03-01'),
        endDate: new Date('2024-05-30'),
        status: StatusProject.PLANNED,
        userResponsibleId: 1,
        priority: Priority.MEDIUM,
        users: [],
        tasks: [
          { name: "Modelagem do Banco", projectId: 1, userResponsibleId: 2, startDate: new Date('2024-03-05'), endDate: new Date('2024-03-15'), status: StatusTask.PAUSED }
        ]
      }
    ];
  }

  // Função exemplo - implementar com back
  getUserName(userId: number): string {
    // Simulação de busca de usuário (substituir por API real)
    const users = [
      { id: 1, name: "Carlos Silva" },
      { id: 2, name: "Ana Souza" }
    ];
    return users.find(user => user.id === userId)?.name || 'Desconhecido';
  }

  // Carrega as tasks do projeto correspondente
  loadTasks(projectId: number) {
    // Busca o projeto pelo ID
    const project = this.projects.find(p => p.id === projectId);

    if (project) {
      console.log(`Carregando tasks para o projeto: ${project.name}`);

      // Simulação de carregamento de tasks
      setTimeout(() => {
        project.tasks = [
          { name: "Analisar requisitos", projectId: project.id, userResponsibleId: 2, startDate: new Date('2024-02-10'), endDate: new Date('2024-02-20'), status: StatusTask.DONE },
          { name: "Desenvolver frontend", projectId: project.id, userResponsibleId: 2, startDate: new Date('2024-02-21'), endDate: new Date('2024-03-10'), status: StatusTask.PROGRESS }
        ];
      }, 1000); // Simula um delay de 1 segundo para carregar as tasks
    }
  }

  // Função para registrar um lançamento
  registerRelease(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ReleasesFormComponent, {
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration
    });
  }

  // Se inscrever no Observable do ThemeService, será notificado sempre que o tema mudar
  subscribeTheme(): void {
    this.themeService.isLightTheme$
      .pipe(takeUntil(this.destroy$))  // A inscrição será descartada quando destroy$ emitir
      .subscribe(theme => {
        this.isLightTheme = theme;  // Atualiza o valor de isLightTheme
      });
  }

  // Alterna o tema chamando o serviço de ThemeService
  toggleTheme() {
    this.themeService.toggleTheme(); // Chama o serviço para alternar o tema
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
