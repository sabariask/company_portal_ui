import { FormControl } from "@angular/forms";


export interface Task {
    id?: number;
    title: string;
    description: string;
    status?: TaskStatus;
    priority: TaskPriority;

    projectId: number;
    assignedUserId?: number;
    assignedUserName?: string;
}

type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';
type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH';

export type TaskRowForm = {
  id: FormControl<number>;
  status: FormControl<TaskStatus>;
  title: FormControl<string>;
  priority: FormControl<TaskPriority>;
  description: FormControl<string>;
  projectId: FormControl<number>;
  assignUser: FormControl<number>;
};


export interface TaskDialogData {
    task: Task;
    employees: {
        id: number;
        name: string;
    }[];
}