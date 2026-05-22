import { Component, computed, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { UserInterface } from '../../interfaces/user-interface';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-workspace',
  imports: [MatIconModule, MatMenuModule],
  templateUrl: './workspace.html',
  styleUrls: ['./workspace.scss'] ,
})
export class Workspace {
  authService = inject(AuthService);
  userService = inject(UserService);
  loggedUser = signal<UserInterface | null>(null);
  isMenuOpen = signal(false);

  async ngOnInit() {
    await this.userService.getAllUsers();
    this.showLoggedUser();
  }

  showLoggedUser() {
    const firebaseUser = this.authService.auth.currentUser;
    const user = this.userService.allUsers().find((user) => user.email === firebaseUser?.email);
    this.loggedUser.set(user || null);
  }
}
