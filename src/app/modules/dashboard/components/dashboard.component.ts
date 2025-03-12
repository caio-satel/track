import { DashboardService } from './../../../services/dashboard/dashboard.service';
import { Component,ElementRef,OnInit, QueryList, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { ThemeService } from '../../../services/theme-service/theme-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ReleasesFormComponent } from '../../releases/components/releases-form/releases-form.component';
import { ReleaseDTO } from '../../../DTO/releases/releaseDTO';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SnackbarService } from '../../../shared/snackbar/services/snackbar.service';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { UsersService } from '../../../services/users/users.service';
import { UserLoggedNameDTO } from '../../../DTO/users/userLoggedNameDTO';
import { DashboardProjectDTO } from '../../../DTO/projects/DashboardProjectDTO';
import { ReleasesService } from '../../../services/releases/releases.service';
import { UpdateReleaseDTO } from '../../../DTO/releases/UpdateReleaseDTO';
import { LateTasksCountDTO } from '../../../DTO/dashboard/LateTasksCountDTO';
import { TaskDTO } from '../../../DTO/tasks/taskDTO';
import { TasksService } from '../../../services/tasks/tasks.service';
import { MatExpansionPanel } from '@angular/material/expansion';
import { ProjectDTO } from '../../../DTO/projects/projectDTO';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private snackbar: SnackbarService,
    private themeService: ThemeService,
    private userService: UsersService,
    private releaseService: ReleasesService,
    private dashboardService: DashboardService,
    private taskService: TasksService
  ) {}

  projects: DashboardProjectDTO[] = [];
  projectColumns: string[] = ['name', 'startDate', 'endDate', 'status', 'priority', 'userResponsible'];
  taskColumns: string[] = ['taskName', 'taskStartDate', 'taskEndDate', 'taskStatus'];
  columns: string[] = ['description', 'releaseName', 'dateRelease', 'startTime', 'endTime', 'actions'];
  isLightTheme: boolean = false;
  hoursWorked: string = '00:00';
  lateTasksCount: LateTasksCountDTO = { lateTasksCount: 0 };
  user: UserLoggedNameDTO = { name: '', role: '' };
  currentDate: string = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric'
  });

  releases: ReleaseDTO[] = [];
  listLateTasks: TaskDTO[] = [];

  @ViewChildren(MatExpansionPanel) expansionPanels: QueryList<MatExpansionPanel>; // Lista de expansion panels
  @ViewChildren('taskRow') taskRows: QueryList<ElementRef>; // Lista de elementos filho de tarefas - Linhas da tabela de tarefas

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
    this.subscribeTheme();
    this.updateTime();
    this.getUserName();
    this.loadProjectsAndTasksByUser();
    this.loadHoursWorkedByUser();
    this.loadReleasesByUserLogged();
    this.loadLateTasksByUserLogged();
  }

  ngOnChanges(changes: SimpleChanges): void {
      if (changes['releases']) {
        this.dataSource.data = this.releases;
      }
  }

  updateTime() {
    const now = new Date();
    this.currentDate = now.toLocaleDateString('pt-BR', {
      weekday: 'long', day: '2-digit', month: 'long'
    });
  }

  loadProjectsAndTasksByUser() {
    this.dashboardService.getProjectsAndTasksByUserLogged().subscribe({
      next: (response) => {
        this.projects = response;
      },
      error: () => this.snackbar.openSnackBar('Erro ao buscar projetos e tarefas do usuário!', 'error')
    });
  }

  loadHoursWorkedByUser() {
    this.dashboardService.getHoursWorkedByUserLogged().subscribe({
      next: (response) => {
        this.hoursWorked = response;
      },
      error: () => this.snackbar.openSnackBar('Erro ao buscar horas trabalhadas!', 'error')
    });
  }

  loadReleasesByUserLogged() {
    this.releaseService.getReleasesByUserLogged().subscribe({
      next: (response) => {
        this.dataSource.data = response;
        this.releases = response;
      },
      error: () => this.snackbar.openSnackBar('Erro ao buscar lançamentos!', 'error')
    });
  }

  loadLateTasksByUserLogged() {
    this.dashboardService.getLateTasksCountByUserLogged().subscribe({
      next: (response) => {
        this.lateTasksCount = response;
      },
      error: () => this.snackbar.openSnackBar('Erro ao buscar tarefas atrasadas!', 'error')
    });
  }

  getUserName(): void {
    this.userService.getUserLogged().subscribe({
      next: (response) => this.user = response,
      error: () => this.snackbar.openSnackBar('Erro ao buscar usuário logado!', 'error')
    });
  }

  registerRelease(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(ReleasesFormComponent, {
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.releaseService.createRelease(result).subscribe({
          next: (response) => {
            if(response) {
              this.dataSource.data = [...this.dataSource.data, response];
            }
            this.snackbar.openSnackBar('Lançamento registrado com sucesso!', 'success');
            this.loadHoursWorkedByUser();
            this.loadReleasesByUserLogged();
          },
          error: () => this.snackbar.openSnackBar('Erro ao registrar lançamento!', 'error')
        });
      }
    });
  }

  // Função para editar uma release
  openEditDialog(release: UpdateReleaseDTO, enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(ReleasesFormComponent, {
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        release
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.releaseService.updateRelease(result.id, result as UpdateReleaseDTO).subscribe({
          next: (response) => {
            if (response) {
              this.dataSource.data = this.dataSource.data.map(release => {
                if (release.id === result.id) {
                  return { ...release, ...result };
                }
                return release;
              });
              this.snackbar.openSnackBar('Lançamento atualizado com sucesso!', 'success');
              this.loadHoursWorkedByUser();
              this.loadReleasesByUserLogged();
            }
          },
          error: () => this.snackbar.openSnackBar('Erro ao atualizar lançamento!', 'error')
        });
      }
    });
  }

  // Função para abrir o dialog de confirmação
  openDeleteDialog(releaseId: number, enterAnimationDuration: string, exitAnimationDuration: string): void {
    const release = this.releases.find(r => r.id === releaseId);

    if (!release) {
      return this.snackbar.openSnackBar('Lançamento não encontrado ou excluída!', 'warning');
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Excluir Lançamento',
        message: `Tem certeza que deseja excluir ${release.description}?`,
        enterAnimationDuration,
        exitAnimationDuration
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.releaseService.deleteRelease(releaseId).subscribe({
          next: () => {
            this.dataSource.data = this.dataSource.data.filter(release => release.id !== releaseId);
            this.snackbar.openSnackBar('Lançamento excluído com sucesso!', 'success');
          },
          error: () => this.snackbar.openSnackBar('Erro ao excluir lançamento!', 'error')
        });
      }
      this.loadHoursWorkedByUser();
      this.loadReleasesByUserLogged();
    });
  }

  findAndHighlightLateTask(): void {
    this.taskService.getLateTasksByUser().subscribe({
      next: (tasks) => {
        this.listLateTasks = tasks;
        this.highlightLateTasks();
      },
      error: (error) => {
        console.error('Erro ao buscar tarefas atrasadas:', error);
      }
    });
  }

  highlightLateTasks() {
    // Itera sobre as tarefas atrasadas
    this.listLateTasks.forEach(lateTask => {
      // Encontra o projeto correspondente à tarefa atrasada
      const projectIndex = this.projects.findIndex(p => p.tasks.some(t => t.id === lateTask.id));
      if (projectIndex !== -1) {
        // Abre o expansion panel do projeto
        this.openExpansionPanel(projectIndex);

        // Destaca a tarefa atrasada
        this.highlightTask(lateTask.id);
      }
    });
  }

  openExpansionPanel(projectIndex: number) {
    const panels = this.expansionPanels.toArray();
    if (panels[projectIndex]) {
      panels[projectIndex].open(); // Abre o expansion panel
    }
  }

  highlightTask(taskId: number) {
    const taskRows = this.taskRows.toArray();
    const taskRow = taskRows.find(row => row.nativeElement.getAttribute('data-task-id') === taskId.toString());

    if (taskRow) {
      taskRow.nativeElement.classList.add('late-task');
    }
  }

  isTaskLate(task: any): boolean {
    return this.listLateTasks.some(t => t.id === task.id);
  }

  // Se inscrever no Observable do ThemeService, será notificado sempre que o tema mudar
  subscribeTheme(): void {
    this.themeService.isLightTheme$
      .pipe()  // A inscrição será descartada quando destroy$ emitir
      .subscribe(theme => {
        this.isLightTheme = theme;  // Atualiza o valor de isLightTheme
      });
  }

  // Alterna o tema chamando o serviço de ThemeService
  toggleTheme() {
    this.themeService.toggleTheme(); // Chama o serviço para alternar o tema
  }
}
