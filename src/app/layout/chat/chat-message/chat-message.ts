import { Component, Input, inject, signal } from '@angular/core';
import { MessageInterface } from '../../../interfaces/message-interface';
import { UserService } from '../../../services/user.service';
import { CommonModule, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { EMOJIS } from '../../../data/emojis';
import { MessagesService } from '../../../services/messages.service';
import { ChatService } from '../../../services/chat.service';


@Component({
  selector: 'app-chat-message',
  imports: [CommonModule, DatePipe, MatIconModule],
  templateUrl: './chat-message.html',
  styleUrls: ['./chat-message.scss'],
})
export class ChatMessage {
  @Input() message!: MessageInterface;
  chatService = inject(ChatService);
  userService = inject(UserService);
  messageService = inject(MessagesService);
  showEmojis = signal(false);

  emojis = EMOJIS.map((name) => ({
    icon: `assets/img/emojis/${name}.png`,
    value: `:${name}:`,
  }));

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
    this.showEmojis.update((show) => !show);
  }

  async addReaction(emoji: string) {
    const userId = this.userService.loggedUser()!.id;
    const reactions = [...(this.message.reactions ?? [])];
    const existingReaction = reactions.find((reaction) => reaction.emoji === emoji);
    if (!existingReaction) {
      reactions.push({
        emoji,
        userIds: [userId],
      });
    } else if (!existingReaction.userIds.includes(userId)) {
      existingReaction.userIds.push(userId);
    }
    this.showEmojis.update((show) => !show);
    await this.messageService.addReaction(
      this.chatService.activeChatId(),
      this.message.id,
      reactions,
    );
  }

  getReactionIcon(emoji: string) {
    return `assets/img/emojis/${emoji.replaceAll(':', '')}.png`;
  }

 getReactionName(userId: string): string {
  return (
    this.userService
      .allUsers()
      .find((user) => user.id === userId)?.name ?? 'Unknown User'
  );
}
}
