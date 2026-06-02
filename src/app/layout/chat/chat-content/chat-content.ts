import { Component, Input, inject } from '@angular/core';
import { UserInterface } from '../../../interfaces/user-interface';
import { UserService } from '../../../services/user.service';
import { UserProfile } from '../../../shared/user-profile/user-profile';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-chat-content',
  imports: [],
  templateUrl: './chat-content.html',
  styleUrls: ['./chat-content.scss'],
})
export class ChatContent {
  @Input() loggedUser: UserInterface | null = null;
  @Input() isWelcome = false;
  @Input() user: UserInterface | null = null;
  @Input() isDirectChat = false;
  userService = inject(UserService);
  dialog = inject(MatDialog);
  messages = [];

  goToProfile() {
    this.dialog.open(UserProfile, {
      data: { user: this.user, source: 'chat' },
      panelClass: 'profile-dialog-centered',
    });
  }
}
