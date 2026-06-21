import { Component, Input, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { UserInterface } from '../../../interfaces/user-interface';
import { UserService } from '../../../services/user.service';
import { ChatService } from '../../../services/chat.service';
import { MessagesService } from '../../../services/messages.service';
import { FormsModule } from '@angular/forms';
import { EMOJIS } from '../../../data/emojis';
import { Message } from '../../../models/message.class';
import { ChannelInterface } from '../../../interfaces/channel-interface';
import { ChannelService } from '../../../services/channel-service';

@Component({
  selector: 'app-chat-input',
  imports: [MatIconModule, FormsModule],
  templateUrl: './chat-input.html',
  styleUrls: ['./chat-input.scss'],
})
export class ChatInput {
  @Input() user: UserInterface | null = null;
  @Input() isChannelChat = false;
  @Input() channel: ChannelInterface | null = null;
  userService = inject(UserService);
  chatService = inject(ChatService);
  channelService = inject(ChannelService);
  messageService = inject(MessagesService);
  showList = signal(false);
  showEmojis = signal(false);
  messageText = '';

  emojis = EMOJIS.map((name) => ({
    icon: `assets/img/emojis/${name}.png`,
    value: `:${name}:`,
  }));

  toggleUserList() {
    this.showList.update((show) => !show);
  }

  toggleEmojiPicker() {
    this.showEmojis.update((show) => !show);
  }

  addEmoji(emoji: string) {
    this.messageText += ` ${emoji}`;
    this.showEmojis.set(false);
  }

  mentionUser(user: UserInterface) {
    this.messageText += ` @${user.name}`;
    this.messageService.mentions.update((mentions) => [
      ...mentions,
      { id: user.id, name: user.name },
    ]);
    this.showList.set(false);
  }

  getMembers(): UserInterface[] {
    if (!this.channel) return [];

    return this.userService
      .allUsers()
      .filter((user) => this.channel!.participants.includes(user.id));
  }

  sendMessageChannel() {
    const loggedUser = this.userService.loggedUser();
    if (!loggedUser) return;
    if (!this.messageText.trim()) return;
    const message = new Message({
      senderId: loggedUser.id,
      text: this.messageText,
      createdAt: Date.now(),
      mentions: this.messageService.mentions(),
    });
    this.messageService.sendMessageChannel(this.channelService.selectedChannel()?.id!, message);
    this.messageText = '';
    this.messageService.mentions.set([]);
  }

  sendMessage() {
    const loggedUser = this.userService.loggedUser();
    if (!loggedUser) return;
    if (!this.messageText.trim()) return;
    const message = new Message({
      senderId: loggedUser.id,
      text: this.messageText,
      createdAt: Date.now(),
      mentions: this.messageService.mentions(),
    });
    this.messageService.sendMessage(this.chatService.activeChatId(), message);
    this.messageText = '';
    this.messageService.mentions.set([]);
  }
}
