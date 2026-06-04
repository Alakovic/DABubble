import { Component, Input, inject } from '@angular/core';
import { MessageInterface } from '../../../interfaces/message-interface';
import { UserService } from '../../../services/user.service';
import { CommonModule, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-chat-message',
  imports: [CommonModule, DatePipe, MatIconModule],
  templateUrl: './chat-message.html',
  styleUrls: ['./chat-message.scss'],
})
export class ChatMessage {
  @Input() message!: MessageInterface;
  userService = inject(UserService);

  parseMessage(): string {
    let text = this.message.text;
    this.message.mentions.forEach((mention) => {
      text = text.replace(
        `@${mention.name}`,
        `<span class="message__mention">@${mention.name}</span>`,
      );
    });
    text = text.replace(
      /:([a-z-]+):/g,
      (_, name) => `<img src="assets/img/emojis/${name}.png" class="message__emoji">`,
    );
    return text;
  }

  isOwnMessage() {
    return this.message.senderId === this.userService.loggedUser()?.id;
  }

  getSender() {
    return this.userService.allUsers().find((user) => user.id === this.message.senderId);
  }

  toggleEmojiPicker() {
    // Implement your emoji picker toggle logic here
  }
}
