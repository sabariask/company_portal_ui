import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormControl,
} from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TaskService } from '../services/tasks/task-service';
import { SnackbarService } from '../services/snackbar/snackbar-service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Task, TaskRowForm } from '../model/task.model';
import { EmployeeService } from '../services/employees/employee-service';
import { DialogRef } from '@angular/cdk/dialog';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialog } from '../dialogs/task-dialog/task-dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorResponse } from '../model/common.model';
import { ProjectService } from '../services/project/project';
import { Project } from '../model/project.model';

@Component({
  selector: 'app-tasks',
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './tasks.html',
  styleUrl: './tasks.scss',
})
export class Tasks implements OnInit {
  tasks: any[] = [];
  displayedColumns = [
    'index',
    'title',
    'description',
    'priority',
    'assignedUserName',
    'status',
    'actions',
  ];

  employees: { id: number; name: string }[] = [];
  projects: Project[] = [];

  isManagerOrAdmin = false;

  private taskService = inject(TaskService);
  private snackBar = inject(SnackbarService);
  private destroyRef = inject(DestroyRef);
  private changeRef = inject(ChangeDetectorRef);
  private fb = inject(FormBuilder);
  private employeeService = inject(EmployeeService);
  private dialog = inject(MatDialog);
  private projectService = inject(ProjectService);

  form!: FormGroup;

  ngOnInit(): void {
    this.buildForm();
    this.detectRole();
    if (this.isManagerOrAdmin) {
      this.loadEmployees();
      this.loadProjects();
    }
    this.loadTasks();
  }

  buildForm() {
    this.form = this.fb.group({
      title: this.fb.control('', { nonNullable: true }),
      description: this.fb.control('', { nonNullable: true }),
      status: this.fb.control('', { nonNullable: true }),
      priority: this.fb.control('', { nonNullable: true }),
      projectId: this.fb.control<number | null>(null),
      assignUser: this.fb.control<number | null>(null),
      rows: this.fb.array<FormGroup<TaskRowForm>>([]),
    });
  }

  get rows() {
    return this.form.controls['rows'] as FormArray<FormGroup<TaskRowForm>>;
  }

  detectRole() {
    const token = localStorage.getItem('token')!;
    const payload = JSON.parse(atob(token?.split('.')[1]));

    this.isManagerOrAdmin = payload?.role === 'ADMIN' || payload?.role === 'MANAGER';
  }

  loadTasks() {
    this.taskService
      .getTasks()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.tasks = res;

        this.rows.clear();
        res.forEach((t: Task) => {
          this.rows.push(
            this.fb.group({
              id: this.fb.control(t.id || 0, { nonNullable: true }),
              status: this.fb.control(t.status || 'TODO', { nonNullable: true }),
              title: this.fb.control(t.title, { nonNullable: true }),
              description: this.fb.control(t.description, { nonNullable: true }),
              priority: this.fb.control(t.priority, { nonNullable: true }),
              projectId: this.fb.control(t.projectId, { nonNullable: true }),
              assignUser: this.fb.control(t.assignedUserId || 0, { nonNullable: true }),
            }),
          );
        });
        this.changeRef.markForCheck();
      });
  }

  loadEmployees() {
    this.employeeService.getAll().subscribe((res) => {
      this.employees = res.map((e) => ({
        id: e.id,
        name: e.name,
      }));
    });
  }

  loadProjects() {
    this.projectService.getAllProjects().subscribe({
      next: (res: Project[]) => {
        this.projects = res;
      },
      error: (err: HttpErrorResponse) => {
        const errorMessage = err.error as ErrorResponse;
        this.snackBar.openSnackBar(errorMessage.message);
      },
    });
  }

  createTask() {
    if (this.form.invalid) return;

    const { title, description, priority, projectId, assignUser } = this.form.value;

    const dto = {
      title,
      description,
      priority,
      projectId,
      assignedUserId: assignUser,
    };

    this.taskService.createTask(dto).subscribe({
      next: () => {
        this.snackBar.openSnackBar('Task created!!');
        this.form.reset();
        this.loadTasks();
      },
      error: (err: HttpErrorResponse) => {
        const errorMessage = err.error as ErrorResponse;
        this.snackBar.openSnackBar(errorMessage.message);
      },
    });
  }

  updateStatus(tasks: any, status: string) {
    this.taskService.updateStatus(tasks.id, status).subscribe(() => {
      tasks.status = status;
      this.snackBar.openSnackBar('Status Updated!!');
    });
  }

  delete(id: number) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.snackBar.openSnackBar('Task deleted successfully!!');
      this.loadTasks();
    });
  }

  getStatusControl(index: number): FormControl {
    return this.rows.at(index).get('status') as FormControl;
  }

  openCreateTask(task: Task) {
    const dialogRef = this.dialog.open(TaskDialog, {
      width: '500px',
      data: {
        task: task,
        employees: this.employees,
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        const { title, description, priority, projectId, assignedUserId, assignedUserName } = res;

        const dto = {
          ...task,
          title,
          description,
          priority,
          projectId,
          assignedUserId,
          assignedUserName,
        };
        this.taskService.updateTasks(dto.id || -1, dto).subscribe(() => {
          this.snackBar.openSnackBar('Task updated successfully!!');
          this.loadTasks();
        });
      }
    });
  }
}
