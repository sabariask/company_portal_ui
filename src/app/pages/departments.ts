import { ChangeDetectorRef, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DepartmentService } from '../services/departments/department-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { SnackbarService } from '../services/snackbar/snackbar-service';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-departments',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatDividerModule,
    MatTableModule,
  ],
  templateUrl: './departments.html',
  styleUrl: './departments.scss',
  standalone: true,
})
export class DepartmentComponent implements OnInit {
  departments: any[] = [];
  names = '';
  description = '';
  isAdmin = false;
  displayedColumns = ['id', 'name', 'description'];

  private deptService = inject(DepartmentService);
  private destoryRef = inject(DestroyRef);
  private cdRef = inject(ChangeDetectorRef);
  private snackbarService = inject(SnackbarService);

  ngOnInit(): void {
    this.detectRole();
    this.loadDepartments();
  }

  detectRole() {
    const token = localStorage.getItem('token')!;
    const payload = JSON.parse(atob(token?.split('.')[1]));

    this.isAdmin = payload?.role === 'ADMIN';
    if (this.isAdmin) {
      this.displayedColumns.push('actions');
    }
  }

  loadDepartments() {
    this.deptService
      .getDepartments()
      .pipe(takeUntilDestroyed(this.destoryRef))
      .subscribe({
        next: (res) => {
          this.departments = res;
          this.cdRef.markForCheck();
        },
      });
  }

  create(e: Event) {
    e.preventDefault();
    if (!this.names.trim()) return;
    this.deptService
      .createDepartment({ name: this.names, description: this.description })
      .subscribe(() => {
        this.names = '';
        this.description = '';
        this.loadDepartments();
      });
  }

  delete(id: number) {
    this.deptService
      .delete(id)
      .pipe(takeUntilDestroyed(this.destoryRef))
      .subscribe((res: string) => {
        this.loadDepartments();
        this.snackbarService.openSnackBar(res);
      });
  }
}
