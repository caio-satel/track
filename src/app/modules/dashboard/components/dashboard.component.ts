import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Project } from '../../../models/projects/project';
import { StatusProject } from '../../../models/enum/statusProject.enum';
import { Priority } from '../../../models/enum/priority.enum';
import { StatusTask } from '../../../models/enum/statusTask.enum';
import { ThemeService } from '../../../services/theme-service/theme-service.service';
import { Subject, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ReleasesFormComponent } from '../../releases/components/releases-form/releases-form.component';
import { ReleaseDTO } from '../../../DTO/releases/releaseDTO';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SnackbarService } from '../../../shared/snackbar/services/snackbar.service';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { Release } from '../../../models/releases/release';
import { UsersService } from '../../../services/users/users.service';
import { UserDTO } from '../../../DTO/users/userDTO';
import { UserLoggedNameDTO } from '../../../DTO/users/userLoggedNameDTO';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  dialog: MatDialog = inject(MatDialog);
  snackbar: SnackbarService = inject(SnackbarService);
  themeService: ThemeService = inject(ThemeService);
  userService: UsersService = inject(UsersService);
  user: UserLoggedNameDTO = { name: '', role: '' };

  projects: Project[] = []; // Lista de projetos
  projectColumns: string[] = ['name', 'startDate', 'endDate', 'status', 'priority', 'userResponsible'];
  taskColumns: string[] = ['taskName', 'taskStartDate', 'taskEndDate', 'taskStatus'];
  columns: string[] = ['taskId', 'description', 'startDate', 'endDate', 'actions'];

  isLightTheme: boolean = false;  // Para armazenar o estado do tema

  currentDate: string = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric'
  });

  releases: Release[] = [];

  dataSource = new MatTableDataSource<ReleaseDTO>(this.releases);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  ngOnInit() {
    this.subscribeTheme(); // Inscrever no Observable do ThemeService
    this.updateTime(); // Data/Mês na inicialização do componente Dashboard
    this.loadProjects(); // Mockup de dados
    this.getUserName();
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
  }

  // Função exemplo - implementar com back
  getUserName(): void {
    this.userService.getUserLogged().subscribe({
      next: (response) => this.user = response,
      error: (err) => console.error('Erro ao buscar usuário logado:', err)
    });
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

  // Função para editar uma release
  openEditDialog(release: ReleaseDTO, enterAnimationDuration: string, exitAnimationDuration: string): void {
    console.log(release);
    this.dialog.open(ReleasesFormComponent, {
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        release
      }
    });
  }

  // Função para abrir o dialog de confirmação
  openDeleteDialog(releaseId: number, enterAnimationDuration: string, exitAnimationDuration: string): void {
    // console.log('entrou na função', releaseId);
    // Busca o release na lista pelo ID
    const release = this.releases.find(r => r.id === releaseId);

    if (!release) {
      // Se a release não existir na lista, exibe uma mensagem de erro
      this.snackbar.openSnackBar('Release não encontrada!', 'warning');
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Excluir Release',
        message: `Tem certeza que deseja excluir ${release.description}?`, // Nome dinâmico
        enterAnimationDuration,
        exitAnimationDuration
      }
    });

    // Se o dialog for confirmar, chamamos a função de exclusão
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteRelease(releaseId);
      }
    });
  }

  // Função para excluir uma release
  deleteRelease(releaseId: number) {
    // console.log('Release excluída:', releaseId);
    this.snackbar.openSnackBar('Release excluída com sucesso!', 'success');
    // Chamar o service para excluir a release no backend
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
