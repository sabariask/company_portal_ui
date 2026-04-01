import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { Dashboard } from './admin/dashboard/dashboard';
import { Users } from './admin/users/users';
import { Login } from './auth/login/login';
import { roleGuard } from './guards/role-guard-guard';
import { Register } from './auth/register/register';

export const routes: Routes = [
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'register',
    component: Register
  },
  {
    path: 'admin',
    canActivate: [authGuard, roleGuard],
    component: Dashboard,
    data: { roles: ['ADMIN'] },
    children: [
      {
        path: 'users',
        component: Users,
      },
      {
        path: 'departments',
        loadComponent: () => import('./pages/departments').then((m) => m.DepartmentComponent),
      },
      {
        path: 'employees',
        loadComponent: () => import('./pages/employees').then((m) => m.Employees),
      },
      {
        path: 'projects',
        loadComponent: () => import('./pages/projects/project-component').then((m) => m.ProjectComponent),
      },
    ],
  },
  {
    path: 'manager',
    component: Dashboard,
    data: { roles: ['MANAGER', 'ADMIN'] },
    canActivate: [authGuard, roleGuard],
    children: [
      {
        path: 'employees',
        loadComponent: () => import('./pages/employees').then((m) => m.Employees),
      },
      {
        path: 'departments',
        loadComponent: () => import('./pages/departments').then((m) => m.DepartmentComponent),
      },
      {
        path: 'tasks',
        loadComponent: () => import('./pages/tasks').then((m) => m.Tasks),
      },
      {
        path: 'projects',
        loadComponent: () => import('./pages/projects/project-component').then((m) => m.ProjectComponent),
      },
    ],
  },
  {
    path: 'employee',
    component: Dashboard,
    data: { roles: ['EMPLOYEE', 'MANAGER', 'ADMIN'] },
    canActivate: [authGuard, roleGuard],
    children: [
      {
        path: 'tasks',
        loadComponent: () => import('./pages/tasks').then((m) => m.Tasks),
      },
    ],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full'},
];
