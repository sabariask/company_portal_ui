import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet, RouterLinkActive, NavigationEnd } from '@angular/router';
import { Auth } from '../../services/auth';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, RouterOutlet, CommonModule, RouterLinkActive],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private auth = inject(Auth);
  private router = inject(Router);

  role = this.auth.getRole();
  username = this.auth.getUsername();
  showWelcome = true;

  constructor() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        // Show welcome banner only on the exact dashboard route (no child route)
        this.showWelcome = this.isRootDashboard(event.urlAfterRedirects);
      });
  }

  private isRootDashboard(url: string): boolean {
    // Match patterns like /admin, /manager, /employee (without sub-routes like /admin/departments)
    const match = url.match(/^\/(admin|manager|employee)$/);
    return !!match;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  getTaskName() {
    if (this.role === 'ADMIN' || this.role === 'MANAGER') {
      return 'Tasks';
    } else {
      return 'My Tasks';
    }
  }
}
