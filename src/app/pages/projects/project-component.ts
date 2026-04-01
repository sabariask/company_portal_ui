import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { ProjectService } from '../../services/project/project';
import { Auth } from '../../services/auth';
import { MatDialog } from '@angular/material/dialog';
import { Department, Project } from '../../model/project.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ErrorResponse } from '../../model/common.model';
import { SnackbarService } from '../../services/snackbar/snackbar-service';
import { HttpErrorResponse } from '@angular/common/http';
import { DepartmentService } from '../../services/departments/department-service';
import { ProjectDialog } from '../../dialogs/projects/project-dialog';

@Component({
  selector: 'app-project-component',
  imports: [CommonModule, MatTableModule, MatButtonModule],
  templateUrl: './project-component.html',
  styleUrl: './project-component.scss',
  standalone: true,
})
export class ProjectComponent implements OnInit {
  private projectService = inject(ProjectService);
  private authService = inject(Auth);
  private dialog = inject(MatDialog);
  private destoryRef = inject(DestroyRef);
  private changeRef = inject(ChangeDetectorRef);
  private snackBarService = inject(SnackbarService);
  private departmentService = inject(DepartmentService);

  projects: Project[] = [];
  departments: Department[] = [];
  isAdminOrManager = false;

  displayedColumns = ['id', 'name', 'department'];

  ngOnInit(): void {
    this.isAdminOrManager = ['ADMIN', 'MANAGER'].includes(this.authService.getRole());
    if (this.isAdminOrManager) this.displayedColumns.push('edit', 'delete');
    this.loadDepartments();
    this.loadProjects();
  }

  loadProjects() {
    this.projectService
      .getAllProjects()
      .pipe(takeUntilDestroyed(this.destoryRef))
      .subscribe({
        next: (res: Project[]) => {
          this.projects = res;
          this.changeRef.markForCheck();
        },
      });
  }

  loadDepartments() {
    this.departmentService
      .getDepartments()
      .pipe(takeUntilDestroyed(this.destoryRef))
      .subscribe({
        next: (res: Department[]) => {
          this.departments = res;
          this.changeRef.markForCheck();
        },
      });
  }

  openCreateProject() {
    const dialogRef = this.dialog.open(ProjectDialog, {
      width: '500px',
      data: {
        departments: this.departments,
      },
    });

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        this.projectService.createProject(result).subscribe(() => {
          this.snackBarService.openSnackBar('Project created successfully!!');
          this.loadProjects();
        });
      },
    });
  }

  editProject(project: Project) {
    const dialogRef = this.dialog.open(ProjectDialog, {
      width: '500px',
      data: {
        project,
        departments: this.departments,
      },
    });

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.projectService.updateProject(project.id, result).subscribe(() => {
            this.snackBarService.openSnackBar('Project updated successfully!!');
            this.loadProjects();
          });
        }
      },
    });
  }

  deleteProject(id: number) {
    this.projectService.deleteProject(id).subscribe({
      next: () => {
        this.loadProjects();
      },
      error: (err: HttpErrorResponse) => {
        const errorMessage = err.error as ErrorResponse;
        this.snackBarService.openSnackBar(errorMessage.message);
      },
    });
  }
}
