import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SnackbarService } from '../../services/snackbar/snackbar-service';
import { Auth } from '../../services/auth';
import { Router, RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, FormsModule, RouterModule, MatSelectModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {

  username = '';
  email = '';
  password = '';
  role = '';


  private snackbarService = inject(SnackbarService);
  private authService = inject(Auth);
  private router = inject(Router);

  register(e: Event) {
    e.preventDefault();
    const req = { username: this.username, password: this.password, email: this.email, role: this.role };

    if (!this.username || !this.password || !this.email || !this.role) {
      this.snackbarService.openSnackBar('Please enter all the manadatory fields.');
      return;
    }

    this.authService.register(req).subscribe({
      next: () => {
        this.snackbarService.openSnackBar('Registration successful! Please log in.');
        this.router.navigate(['/login']);
      },
      error: (err: HttpErrorResponse) => {
        this.snackbarService.openSnackBar(err.error.message || 'Registration failed. Please try again.');
      },
    });
  }
}
