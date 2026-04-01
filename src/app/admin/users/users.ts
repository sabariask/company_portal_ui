import { ChangeDetectorRef, Component, DestroyRef, inject, OnDestroy, OnInit } from '@angular/core';
import { Userservice } from '../../services/users/userservice';
import { Subscription } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  imports: [MatTableModule],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users implements OnInit {

  users: any[] = [];

  private userService = inject(Userservice);
  private destroyRef = inject(DestroyRef);
  private cdf = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.userService.getUsers()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(res=>{
      this.users = res.content ?? res;
      this.cdf.markForCheck();
    });
  }
}
