export interface Department {
    id: number;
    name: string;
    description?: string;
}

export interface Project {
    id: number;
    name: string;
    description?: string;
    department: Department;
}

export interface ProjectDialogData {
    project?: Project;
    departments: Department[];
}