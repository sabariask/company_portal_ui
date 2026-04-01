import { Component, inject } from '@angular/core';
import { Task, TaskDialogData } from '../../model/task.model';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-task-dialog',
  imports: [
    CommonModule,
    MatDialogTitle,
    FormsModule,
    MatFormFieldModule,
    MatInput,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './task-dialog.html',
  styleUrl: './task-dialog.scss',
})
export class TaskDialog {
  task!: Task;

  private dialogRef = inject(MatDialogRef<TaskDialog>);
  data = inject<TaskDialogData>(MAT_DIALOG_DATA);

  constructor() {
    this.task = {
      title: this.data.task.title,
      description: this.data.task.description,
      priority: this.data.task.priority,
      projectId: this.data.task.projectId,
      assignedUserId: this.data.task.assignedUserId,
    };
  }

  save() {
    const assignedUserName = this.data.employees.find((employee)=>employee.id === this.task.assignedUserId);
    const updatedTask = {
      ...this.task,
      assignedUserName: assignedUserName?.name
    }
    this.dialogRef.close(updatedTask);
  }

  cancel() {
    this.dialogRef.close();
  }
}
