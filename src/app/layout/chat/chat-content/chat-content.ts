import { Component, Input, inject,signal} from '@angular/core';
import { UserInterface } from '../../../interfaces/user-interface';
import { UserService } from '../../../services/user.service';
import { UserProfile } from '../../../shared/user-profile/user-profile';
import { MatDialog } from '@angular/material/dialog';
import { MessagesService } from '../../../services/messages.service';
import { MessageInterface } from '../../../interfaces/message-interface';
import { ChatMessage } from '../chat-message/chat-message';
import { CommonModule, DatePipe } from '@angular/common';
import { ChannelInterface } from '../../../interfaces/channel-interface';
import { MatIconModule } from '@angular/material/icon';
import { ChannelInfo } from '../../../shared/channel-info/channel-info';
import { OverlayModule } from '@angular/cdk/overlay';

@Component({
  selector: 'app-chat-content',
  imports: [ChatMessage, DatePipe, CommonModule, MatIconModule, ChannelInfo, OverlayModule],
  templateUrl: './chat-content.html',
  styleUrls: ['./chat-content.scss'],
})
export class ChatContent {
  @Input() loggedUser: UserInterface | null = null;
  @Input() isWelcome = false;
  @Input() user: UserInterface | null = null;
  @Input() channel: ChannelInterface | null = null;
  @Input() isDirectChat = false;
  @Input() isChannelChat = false;
  userService = inject(UserService);
  dialog = inject(MatDialog);
  messagesService = inject(MessagesService);
  showInfo = signal(false);

  goToProfile() {
    this.dialog.open(UserProfile, {
      data: { user: this.user, source: 'chat' },
      panelClass: 'profile-dialog-centered',
    });
  }

  shouldShowDateSeparator(index: number): boolean {
    const messages = this.messagesService.messages();
    if (index === 0) {
      return true;
    }
    const current = new Date(messages[index].createdAt);
    const previous = new Date(messages[index - 1].createdAt);
    return (
      current.getDate() !== previous.getDate() ||
      current.getMonth() !== previous.getMonth() ||
      current.getFullYear() !== previous.getFullYear()
    );
  }

  displayInfo() {
    this.showInfo.set(true);
  }

  closeInfo() {
    this.showInfo.set(false);
  }
}
