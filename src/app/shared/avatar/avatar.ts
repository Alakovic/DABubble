import { Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.class';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-avatar',
  imports: [MatIconModule, RouterLink],
  templateUrl: './avatar.html',
  styleUrls: ['./avatar.scss'],
})
export class Avatar {
  authService = inject(AuthService);
  userService = inject(UserService);
  router = inject(Router);
  errorMessage = signal<string>('');
  successMessage = signal(false);

  avatars = [
    '/assets/img/avatars/avatar1.svg',
    '/assets/img/avatars/avatar2.svg',
    '/assets/img/avatars/avatar3.svg',
    '/assets/img/avatars/avatar4.svg',
    '/assets/img/avatars/avatar5.svg',
    '/assets/img/avatars/avatar6.svg',
  ];

  defaultAvatar = '/assets/img/avatars/avatar0.svg';
  selectedAvatar = signal<string>('');

  async createUser() {
    try {
      const user = this.createUserObject();
      await this.registerUser(user);
      this.showSuccessMessage();
    } catch (error: any) {
      this.handleRegisterError(error);
    }
  }

  createUserObject(): User {
    return new User({
      ...this.authService.registerData(),
      avatar: this.selectedAvatar(),
    });
  }

  async registerUser(user: User) {
    const response = await this.authService.register(user.email);
    user.id = response.user.uid;
    await this.userService.addUser(user);
  }

  showSuccessMessage() {
    this.successMessage.set(true);
    this.authService.registerData.set({
      name: '',
      email: '',
      password: '',
    });
    this.selectedAvatar.set('');
    setTimeout(() => {
      this.router.navigate(['']);
    }, 2000);
  }

  handleRegisterError(error: any) {
    if (error.code === 'auth/email-already-in-use') {
      this.errorMessage.set('Diese E-Mail-Adresse wird bereits verwendet.');
    }
  }
}
