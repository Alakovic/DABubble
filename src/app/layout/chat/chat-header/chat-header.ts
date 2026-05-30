import { Component, Input, inject } from '@angular/core';
import { UserInterface } from '../../../interfaces/user-interface';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { UserProfile } from '../../../shared/user-profile/user-profile';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-chat-header',
  imports: [CommonModule],
  templateUrl: './chat-header.html',
  styleUrls: ['./chat-header.scss'],
})
export class ChatHeader {
  userService = inject(UserService);
  dialog = inject(MatDialog);
  @Input() user: UserInterface | null = null;

  goToProfile() {
    this.dialog.open(UserProfile, {
      data: { user: this.user, source: 'chat' },
      panelClass: 'profile-dialog-centered',
    });
  }
}
