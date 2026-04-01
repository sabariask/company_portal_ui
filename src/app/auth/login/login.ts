import { Component, DestroyRef, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Auth } from '../../services/auth';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { SnackbarService } from '../../services/snackbar/snackbar-service';

@Component({
  selector: 'app-login',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    FormsModule,
    RouterModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  standalone: true,
})
export class Login {
  username = '';
  password = '';

  private auth = inject(Auth);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private snackBar = inject(SnackbarService);

  login(e: Event) {
    e.preventDefault();
    const req = { username: this.username, password: this.password };

    if (!this.username || !this.password) {
      this.snackBar.openSnackBar('Please enter both username and password.');
      return;
    }

    this.auth
      .login(req)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.auth.setToken(res.token);
          const role = this.auth.getRole();

          if (role === 'ADMIN') this.router.navigate(['/admin']);
          else if (role === 'MANAGER') this.router.navigate(['/manager']);
          else this.router.navigate(['/employee']);
        },
        error: () => alert('Login failed'),
      });
  }
}
