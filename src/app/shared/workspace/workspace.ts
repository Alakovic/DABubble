import { Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterOutlet } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserProfile } from '../user-profile/user-profile';
import { Sidebar } from '../sidebar/sidebar';

@Component({
  selector: 'app-workspace',
  imports: [RouterOutlet, MatIconModule, MatMenuModule, MatButtonModule, MatDialogModule, Sidebar],
  templateUrl: './workspace.html',
  styleUrls: ['./workspace.scss'],
})
export class Workspace {
  authService = inject(AuthService);
  userService = inject(UserService);
  sidebarOpen = signal(false);
  threadOpen = signal(true);
  isMenuOpen = signal(false);
  router = inject(Router);
  dialog = inject(MatDialog);

  async ngOnInit() {
    await this.userService.getAllUsers();
    this.showLoggedUser();
  }

  showLoggedUser() {
    const firebaseUser = this.authService.auth.currentUser;
    const user = this.userService.allUsers().find((user) => user.email === firebaseUser?.email);
    this.userService.loggedUser.set(user || null);
  }

  async logout() {
    const firebaseUser = this.authService.auth.currentUser;
    if (firebaseUser) {
      await this.userService.updateUserStatus(firebaseUser.uid, 'offline');
      await this.authService.logout();
      this.router.navigate(['']);
    }
  }

  goToProfile() {
    this.dialog.open(UserProfile, {
      data: { user: this.userService.loggedUser(), source: 'workspace' },
      panelClass: 'profile-dialog-corner',
      position: {
        top: '100px',
        right: '20px',
      },
    });
  }

  toggleSidebar() {
    this.sidebarOpen.update((value) => !value);
  }
}
