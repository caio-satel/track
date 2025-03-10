import { Component } from '@angular/core';
import { ProjectDTO } from '../../../DTO/projects/projectDTO';
import { ProjectsService } from '../../../services/projects/projects.service';
import { UpdateProjectDTO } from '../../../DTO/projects/UpdateProjectDTO';
import { SnackbarService } from '../../../shared/snackbar/services/snackbar.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {
  projects: ProjectDTO[] = [];

  constructor(
    private projectService: ProjectsService,
    private snackbar: SnackbarService
  ) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects() {
    this.projectService.getProjects().subscribe({
      next: (response) => {
        this.projects = response;
      },
      error: () => this.snackbar.openSnackBar('Erro ao buscar projetos!', 'error')
    });
  }

  onProjectAdded(newProject: ProjectDTO) {
    this.projectService.createProject(newProject).subscribe({
      next: (response) => {
        if(response) {
          this.projects = [...this.projects, response];
        }
        this.snackbar.openSnackBar('Projeto cadastrado com sucesso!', 'success');
      },
      error: () => this.snackbar.openSnackBar('Erro ao cadastrar projeto!', 'error')
    });
  }

  onProjectEdited(updatedProject: UpdateProjectDTO) {
    this.projectService.updateProject(updatedProject.id, updatedProject).subscribe({
      next: (response) => {
        this.projects = this.projects.map(project => {
          if (project.id === updatedProject.id) {
            return { ...project, ...response};
          }
          return project;
        });
        this.snackbar.openSnackBar('Projeto atualizado com sucesso!', 'success');
      },
      error: () => this.snackbar.openSnackBar('Erro ao atualizar projeto!', 'error')
    });
  }

  onProjectDeleted(projectId: number) {
    this.projectService.deleteProject(projectId).subscribe({
      next: (response) => {
        if (response) {
          this.projects = this.projects.filter(project => project.id !== projectId);
        }
        this.snackbar.openSnackBar('Projeto excluído com sucesso!', 'success');
      },
      error: () => this.snackbar.openSnackBar('Erro ao excluir projeto!', 'error')
    });
  }
}
