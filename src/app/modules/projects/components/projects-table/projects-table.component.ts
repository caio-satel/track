import { Component, OnInit, ViewChild } from '@angular/core';
import { UserDTO } from '../../../../DTO/users/userDTO';
import { SnackbarService } from '../../../../shared/snackbar/services/snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { ProjectDTO } from '../../../../DTO/projects/projectDTO';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { StatusProject } from '../../../../models/enum/statusProject.enum';
import { Priority } from '../../../../models/enum/priority.enum';
import { ConfirmDialogComponent } from '../../../../shared/confirm-dialog/confirm-dialog.component';
import { ProjectsFormComponent } from '../projects-form/projects-form.component';

@Component({
  selector: 'app-projects-table',
  templateUrl: './projects-table.component.html',
  styleUrl: './projects-table.component.css',
})
export class ProjectsTableComponent implements OnInit {
  projects: ProjectDTO[] = [  // Mock de dados
    {
      id: 1,
      name: "Projeto Angular",
      startDate: new Date('2024-02-01'),
      endDate: new Date('2024-04-01'),
      status: StatusProject.PROGRESS,
      userResponsibleId: 2,
      priority: Priority.HIGH,
    },
    {
      id: 2,
      name: "Sistema de Vendas",
      startDate: new Date('2024-03-01'),
      endDate: new Date('2024-05-30'),
      status: StatusProject.PLANNED,
      userResponsibleId: 1,
      priority: Priority.MEDIUM,
    },
    {
      id: 3,
      name: "Sistema de Vendas",
      startDate: new Date('2024-03-01'),
      endDate: new Date('2024-05-30'),
      status: StatusProject.PLANNED,
      userResponsibleId: 1,
      priority: Priority.MEDIUM,
    }
  ];
  columns: string[] = ['priority','name','startDate','endDate','status','userResponsibleId','actions'];

  // Injeções de dependência
    constructor(private snackbar: SnackbarService, private dialog: MatDialog) {}

  ngOnInit(): void {
    // Aplica o filtro customizado na inicialização do componente
    this.setCustomFilter();
  }

    // MatPaginator e MatSort
    dataSource = new MatTableDataSource<ProjectDTO>(this.projects);
    @ViewChild(MatPaginator) paginator!: MatPaginator; 
    @ViewChild(MatSort) sort!: MatSort;

    ngAfterViewInit() {
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
      if (this.sort) {
        this.dataSource.sort = this.sort;
      }
    }

  // Função para filtrar os dados
  search(event: Event) {
    // Recebe o evento de INPUT - Toda vez que algo é digitado no input, ele é capturado
    const target = event.target as HTMLInputElement;
    // Transforma o value do input em string (todos os caracteres ficam minúsculos e sem espaços)
    const value = target.value.trim().toLowerCase();
    // Aplica o filtro ao dataSource
    this.dataSource.filter = value;
  }

  // Função para aplicar filtro customizado
  setCustomFilter() {
    this.dataSource.filterPredicate = (data: ProjectDTO, filter: string) => {
      return (
        data.name.toLowerCase().includes(filter) ||
        data.priority.toLowerCase().includes(filter) ||
        data.status.toLowerCase().includes(filter)
      );
    };
  }

  // Função para abrir o dialog de criação de novo projeto
  openFormDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    // console.log('entrou na função form');
    this.dialog.open(ProjectsFormComponent, {
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  // Função para editar um projeto
  openEditDialog(project: ProjectDTO, enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ProjectsFormComponent, {
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        project
      }
    });
  }

  // Função para abrir o dialog de confirmação
  openDeleteDialog(projectId: number, enterAnimationDuration: string, exitAnimationDuration: string): void {
    // console.log('entrou na função', projectId);
    // Busca o projeto na lista pelo ID
    const project = this.projects.find(p => p.id === projectId);

    if (!project) {
      // Se o projeto não existir na lista, exibe uma mensagem de erro
      this.snackbar.openSnackBar('Projeto não encontrado!', 'warning');
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Excluir Projeto',
        message: `Tem certeza que deseja excluir ${project.name}?`, // Nome dinâmico
        enterAnimationDuration,
        exitAnimationDuration
      }
    });

    // Se o projeto confirmar, chamamos a função de exclusão
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteProject(projectId);
      }
    });
  }

  // Função para excluir um projeto
  deleteProject(projectId: number) {
    // console.log('Projeto excluído:', projectId);
    this.snackbar.openSnackBar('Projeto excluído com sucesso!', 'success');
    // Chamar o service para excluir o projeto no backend
  }

}
