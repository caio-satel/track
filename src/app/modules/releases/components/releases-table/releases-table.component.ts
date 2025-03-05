import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ReleaseDTO } from '../../../../DTO/releases/releaseDTO';
import { SnackbarService } from '../../../../shared/snackbar/services/snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { ReleasesFormComponent } from '../releases-form/releases-form.component';
import { ConfirmDialogComponent } from '../../../../shared/confirm-dialog/confirm-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CreateReleaseDTO } from '../../../../DTO/releases/CreateReleaseDTO';
import { UpdateReleaseDTO } from '../../../../DTO/releases/UpdateReleaseDTO';

@Component({
  selector: 'app-releases-table',
  templateUrl: './releases-table.component.html',
  styleUrl: './releases-table.component.css'
})
export class ReleasesTableComponent {
  @Input() releases: ReleaseDTO[] = [];
  @Output() releaseAdded = new EventEmitter<CreateReleaseDTO>();
  @Output() releaseEdited = new EventEmitter<UpdateReleaseDTO>();
  @Output() releaseDeleted = new EventEmitter<number>();

  columns: string[] = ['nameTask', 'nameUser', 'description', 'startTime', 'endTime', 'dateRelease'];

  dataSource = new MatTableDataSource<ReleaseDTO>(this.releases);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private dialog: MatDialog,
  ) {}

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
      if (changes['releases']) {
        this.dataSource.data = this.releases;
      }
  }

  search(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value.trim().toLowerCase();
    this.dataSource.filter = value;
  }

  setCustomFilter() {
    this.dataSource.filterPredicate = (data: ReleaseDTO, filter: string) => {
      return (
        data.description.includes(filter)
      );
    };
  }

  openFormDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(ReleasesFormComponent, {
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.releaseAdded.emit(result as CreateReleaseDTO);
      }
    });
  }
}
