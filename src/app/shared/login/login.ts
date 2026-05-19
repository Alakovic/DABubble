import { Component, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { Router, RouterLink } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.class';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class Login {
  isTrue: boolean = true;
  authService = inject(AuthService);
  userService = inject(UserService);
  errorMessage = signal<string>('');
  successMessage = signal<boolean>(false);
  router = inject(Router);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  async loginUser() {
    try {
      await this.authService.login(
        this.loginForm.value.email || '',
        this.loginForm.value.password || '',
      );
      this.showSuccessMessage();
    } catch (error: any) {
      if (error.code === 'auth/invalid-credentials') {
        this.errorMessage.set('E-Mail oder Passwort ist falsch');
      }
    }
  }

  showSuccessMessage() {
    this.successMessage.set(true);
    this.loginForm.reset();
    setTimeout(() => {
      this.router.navigate(['/workspace']);
    }, 1000);
  }

  async googleLogin() {
    try {
      const response = await this.authService.googleLogin();
      const user = this.createGoogleUser(response);
      await this.userService.addUser(user);
      this.showSuccessMessage();
    } catch (error: any) {
      this.errorMessage.set('Google login failed');
    }
  }

  createGoogleUser(response: any): User {
    return new User({
      id: response.user.uid,
      name: response.user.displayName || '',
      email: response.user.email || '',
      avatar: response.user.photoURL || '',
    });
  }
}
