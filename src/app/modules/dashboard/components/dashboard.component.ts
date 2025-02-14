import { Component, OnInit } from '@angular/core';
import { Project } from '../../../models/projects/project';
import { StatusProject } from '../../../models/enum/statusProject.enum';
import { Priority } from '../../../models/enum/priority.enum';
import { StatusTask } from '../../../models/enum/statusTask.enum';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  projects: Project[] = []; // Lista de projetos
  projectColumns: string[] = ['name', 'startDate', 'endDate', 'status', 'priority', 'userResponsible'];
  taskColumns: string[] = ['taskName', 'taskStartDate', 'taskEndDate', 'taskStatus'];

  currentDate: string = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric'
  });

  constructor() {}

  ngOnInit() {
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

  //
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

}
