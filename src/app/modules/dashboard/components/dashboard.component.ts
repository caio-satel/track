import { DashboardService } from './../../../services/dashboard/dashboard.service';
import { Component,OnInit, SimpleChanges, ViewChild } from '@angular/core';
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
    private dashboardService: DashboardService
  ) {}

  projects: DashboardProjectDTO[] = [];
  projectColumns: string[] = ['name', 'startDate', 'endDate', 'status', 'priority', 'userResponsible'];
  taskColumns: string[] = ['taskName', 'taskStartDate', 'taskEndDate', 'taskStatus'];
  columns: string[] = ['taskName', 'description', 'dateRelease', 'startTime', 'endTime', 'actions'];
  isLightTheme: boolean = false;
  hoursWorked: string = '00:00';
  user: UserLoggedNameDTO = { name: '', role: '' };
  currentDate: string = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric'
  });

  releases: ReleaseDTO[] = [];

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
        console.log(response);
        this.hoursWorked = response;
      },
      error: (err) => console.log(err)
    });
  }

  loadReleasesByUserLogged() {
    this.releaseService.getReleasesByUserLogged().subscribe({
      next: (response) => {
        this.dataSource.data = response;
      },
      error: (err) => console.log(err)
    });
  }

  getUserName(): void {
    this.userService.getUserLogged().subscribe({
      next: (response) => this.user = response,
      error: (err) => console.error('Erro ao buscar usuário logado:', err)
    });
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
