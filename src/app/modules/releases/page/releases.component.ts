import { CreateReleaseDTO } from '../../../DTO/releases/CreateReleaseDTO';
import { UpdateReleaseDTO } from '../../../DTO/releases/UpdateReleaseDTO';
import { ReleasesService } from '../../../services/releases/releases.service';
import { SnackbarService } from '../../../shared/snackbar/services/snackbar.service';
import { ReleaseDTO } from './../../../DTO/releases/releaseDTO';
import { Component } from '@angular/core';

@Component({
  selector: 'app-releases',
  templateUrl: './releases.component.html',
  styleUrl: './releases.component.css'
})
export class ReleasesComponent {
  releases: ReleaseDTO[] = [];

  constructor(
    private releaseService: ReleasesService,
    private snackbar: SnackbarService
  ) { }

  ngOnInit(): void {
    this.loadReleases();
  }

  loadReleases() {
    this.releaseService.getReleases().subscribe({
      next: (response) => {
        this.releases = response;
      },
      error: () => this.snackbar.openSnackBar('Erro ao buscar lançamentos!', 'error')
    });
  }

  onReleaseAdded(newRelease: CreateReleaseDTO) {
    this.releaseService.createRelease(newRelease).subscribe({
      next: (response) => {
        if(response) {
          this.releases = [...this.releases, response];
        }
        this.snackbar.openSnackBar('Lançamento registrado com sucesso!', 'success');
      },
      error: () => this.snackbar.openSnackBar('Erro ao registrar lançamento!', 'error')
    });
  }
}
