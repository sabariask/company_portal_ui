import { Component, Inject, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

interface EditEmployeeData {
  id: number;
  name: string;
  email: string;
  phone: number | null;
  designation: string;
  departmentId: number | null;
  departments: any[];
  employee: any;
}

@Component({
  selector: 'app-edit-employee',
  imports: [MatFormFieldModule, FormsModule, MatInputModule, MatIconModule, MatSelectModule, MatDialogModule],
  templateUrl: './edit-employee.html',
  styleUrl: './edit-employee.scss',
  standalone: true,
})

export class EditEmployee {
  dialodRef = inject(MatDialogRef<EditEmployee>);
  data = inject<EditEmployeeData>(MAT_DIALOG_DATA);

  constructor() { console.log(this.data); }

  save(event: Event) {
    event.preventDefault();
    this.dialodRef.close(this.data);
  }
}
