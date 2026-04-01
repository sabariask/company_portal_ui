import { ChangeDetectorRef, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employees/employee-service';
import { DepartmentService } from '../services/departments/department-service';
import { SnackbarService } from '../services/snackbar/snackbar-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { EditEmployee } from '../dialogs/edit-employee/edit-employee';

@Component({
  selector: 'app-employees',
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatTableModule
  ],
  templateUrl: './employees.html',
  styleUrl: './employees.scss',
  standalone: true,
})
export class Employees implements OnInit {
  employees: any[] = [];
  departments: any[] = [];

  name = '';
  email = '';
  departmentId: number | null = null;
  phone: number | null = null;
  designation = '';
  displayedColumns = ['id', 'name', 'email', 'department', 'designation'];

  isAdmin = false;

  private readonly employeeService = inject(EmployeeService);
  private readonly departmentService = inject(DepartmentService);
  private readonly snackService = inject(SnackbarService);
  private readonly changeDef = inject(ChangeDetectorRef);
  private readonly destroyDef = inject(DestroyRef);
  private readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.detectRole();
    this.loadEmployees();
    this.loadDepartments();
  }

  detectRole() {
    const token = localStorage.getItem('token')!;
    const payload = JSON.parse(atob(token?.split('.')[1]));

    this.isAdmin = payload?.role === 'ADMIN';
    if(this.isAdmin) {
      this.displayedColumns.push('update', 'delete');
    }
  }

  loadEmployees() {
    this.employeeService
      .getAll()
      .pipe(takeUntilDestroyed(this.destroyDef))
      .subscribe((res) => {
        this.employees = res;
        this.changeDef.markForCheck();
      });
  }

  loadDepartments() {
    this.departmentService
      .getDepartments()
      .pipe(takeUntilDestroyed(this.destroyDef))
      .subscribe((res) => {
        this.departments = res;
        this.changeDef.markForCheck();
      });
  }

  createEmployee(event: Event) {
    event.preventDefault();
    if (!this.name || !this.departmentId || !this.phone) return;

    const payload = {
      name: this.name,
      email: this.email,
      phone: this.phone,
      designation: this.designation,
      departmentId: this.departmentId,
    };

    this.employeeService
      .create(payload)
      .pipe(takeUntilDestroyed(this.destroyDef))
      .subscribe({
        next: () => {
          this.snackService.openSnackBar('Employee created!!');
          this.name = '';
          this.email = '';
          this.phone = null;
          this.designation = '';
          this.departmentId = null;
          this.loadEmployees();
          this.changeDef.markForCheck();
        },
      });
  }

  delete(id: number) {
    this.employeeService
      .delete(id)
      .pipe(takeUntilDestroyed(this.destroyDef))
      .subscribe((res: string) => {
        this.snackService.openSnackBar(res);
        this.loadEmployees();
      });
  }

  openEdit(employee: any) {
    const dialogRef = this.dialog.open(EditEmployee, {
      width: '440px',
      maxWidth: '95vw',
      panelClass: 'edit-employee-dialog-panel',
      data: {
        ...employee,
        name: employee.name,
        email: employee.email,
        departmentId: employee.department?.id,
        departments: this.departments,
      },
    });

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (!result) return;

        const payload = {
          name: result.name,
          email: result.email,
          phone: result.phone,
          designation: result.designation,
          departmentId: result.departmentId,
        };

        this.employeeService
          .update(employee.id, payload)
          .pipe(takeUntilDestroyed(this.destroyDef))
          .subscribe(() => {
            this.snackService.openSnackBar('Employee details updated');
            this.loadEmployees();
          });
      },
    });
  }
}
