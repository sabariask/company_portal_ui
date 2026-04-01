import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProjectDialogData } from '../../model/project.model';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatAnchor } from "@angular/material/button";

@Component({
  selector: 'app-project-dialog',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogTitle,
    MatSelectModule,
    MatAnchor
],
  templateUrl: './project-dialog.html',
  styleUrl: './project-dialog.scss',
  standalone: true,
})
export class ProjectDialog implements OnInit {
  project = {
    id: 0,
    name: '',
    description: '',
    departmentId: 0,
  };

  dialogRef = inject(MatDialogRef<ProjectDialog>);
  data = inject<ProjectDialogData>(MAT_DIALOG_DATA);

  ngOnInit(): void {
    if (this.data.project) {
      this.project = {
        id: this.data.project.id,
        name: this.data.project.name,
        description: this.data.project.description || '',
        departmentId: this.data.project.department?.id,
      };
    }
  }

  saveProject() {
    this.dialogRef.close(this.project);
  }

  cancel() {
    this.dialogRef.close();
  }
}
