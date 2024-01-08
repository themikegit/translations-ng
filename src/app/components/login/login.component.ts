import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-login',
  template: ` <div id="form">
    <mat-form-field appearance="outline" class="field">
      <mat-label>Username</mat-label>
      <input
        [required]="true"
        matInput
        placeholder="Label key vale"
        [(ngModel)]="username"
      />
    </mat-form-field>
    <mat-form-field appearance="outline" class="field">
      <mat-label>Password</mat-label>
      <input
        [required]="true"
        matInput
        placeholder="Label key vale"
        [(ngModel)]="password"
      />
    </mat-form-field>

    <button mat-flat-button (click)="login()" color="primary">Login</button>
    <button mat-flat-button (click)="cancel()" color="secondary">Cancel</button>
  </div>`,
  styles: [
    `
      #form {
        display: flex;
        flex-direction: column;
        width: 400px;
        margin: 0 auto;
        margin-top: 30vh;
      }
    `,
  ],
})
export class LoginComponent {
  private apiService = inject(ApiServiceService);
  private router = inject(Router);
  username!: string;
  password!: string;
  login() {
    this.apiService
      .signIn({
        username: this.username,
        password: this.password,
      })
      .subscribe((r: any) => {
        localStorage.setItem('accessToken', r.accessToken);
        this.router.navigateByUrl('');
      });
  }
  cancel() {}
}
