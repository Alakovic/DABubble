import { Component, Input, inject } from '@angular/core';
import { UserInterface } from '../../../interfaces/user-interface';
import { UserService } from '../../../services/user.service';
import { UserProfile } from '../../../shared/user-profile/user-profile';
import { MatDialog } from '@angular/material/dialog';
import { MessagesService } from '../../../services/messages.service';
import { MessageInterface } from '../../../interfaces/message-interface';

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
  messagesService = inject(MessagesService);

  goToProfile() {
    this.dialog.open(UserProfile, {
      data: { user: this.user, source: 'chat' },
      panelClass: 'profile-dialog-centered',
    });
  }

  parseMessage(message: MessageInterface): string {
    let text = message.text;
    message.mentions.forEach((mention) => {
      text = text.replace(
        `@${mention.name}`,
        `<span class="chat__mention">${mention.name}</span>`,
      );
    });
    text = text.replace(
      /:([a-z-]+):/g,
      (_, name) => `<img src="assets/img/emojis/${name}.png" class="chat__emoji-inline">`,
    );
    return text;
  }
}
