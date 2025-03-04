import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { SnackbarService } from '../../../../shared/snackbar/services/snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { ProjectDTO } from '../../../../DTO/projects/projectDTO';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ConfirmDialogComponent } from '../../../../shared/confirm-dialog/confirm-dialog.component';
import { ProjectsFormComponent } from '../projects-form/projects-form.component';
import { UpdateProjectDTO } from '../../../../DTO/projects/UpdateProjectDTO';

@Component({
  selector: 'app-projects-table',
  templateUrl: './projects-table.component.html',
  styleUrl: './projects-table.component.css',
})
export class ProjectsTableComponent implements OnInit {
  @Input() projects: ProjectDTO[] = [];
  @Output() projectAdded = new EventEmitter<ProjectDTO>();
  @Output() projectEdited = new EventEmitter<UpdateProjectDTO>();
  @Output() projectDeleted = new EventEmitter<number>();

  columns: string[] = ['priority','name','startDate','endDate','status','responsibleUser','actions'];

  dataSource = new MatTableDataSource<ProjectDTO>(this.projects);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

    constructor(
      private snackbar: SnackbarService,
      private dialog: MatDialog
    ) {}

  ngOnInit(): void {
    this.setCustomFilter();
  }

  ngOnChanges(changes: SimpleChanges): void {
      if (changes['projects']) {
        this.dataSource.data = this.projects;
      }
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  search(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value.trim().toLowerCase();
    this.dataSource.filter = value;
  }

  setCustomFilter() {
    this.dataSource.filterPredicate = (data: ProjectDTO, filter: string) => {
      return (
        data.name.includes(filter) ||
        data.priority.includes(filter) ||
        data.status.includes(filter)
      );
    };
  }

  openFormDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(ProjectsFormComponent, {
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.projectAdded.emit(result as ProjectDTO);
      }
    });
  }

  openEditDialog(project: UpdateProjectDTO, enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(ProjectsFormComponent, {
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        project
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.projectEdited.emit(result as UpdateProjectDTO);
      }
    });
  }

  openDeleteDialog(projectId: number, enterAnimationDuration: string, exitAnimationDuration: string): void {
    const project = this.projects.find(p => p.id === projectId);

    if (!project) {
      this.snackbar.openSnackBar('Projeto não encontrado!', 'warning');
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Excluir Projeto',
        message: `Tem certeza que deseja excluir ${project.name}?`,
        enterAnimationDuration,
        exitAnimationDuration
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.projectDeleted.emit(projectId);
      }
    });
  }
}
