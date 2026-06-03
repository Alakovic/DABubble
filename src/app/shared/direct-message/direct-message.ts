import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { CommonModule } from '@angular/common';
import { ChatHeader } from '../../layout/chat/chat-header/chat-header';
import { UserService } from '../../services/user.service';
import { ChatInput } from '../../layout/chat/chat-input/chat-input';
import { ChatContent } from '../../layout/chat/chat-content/chat-content';
import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'app-direct-message',
  standalone: true,
  imports: [CommonModule, ChatHeader, ChatContent, ChatInput],
  templateUrl: './direct-message.html',
  styleUrls: ['./direct-message.scss'],
})
export class DirectMessage {
  route = inject(ActivatedRoute);
  chatService = inject(ChatService);
  userService = inject(UserService);
  messageService = inject(MessagesService);
  chatId: string = '';

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.chatId = params.get('id') || '';
      this.chatService.activeChatId.set(this.chatId);
      this.messageService.loadMessages(this.chatId);
      this.loadDisplayUser();
    });
  }

  async loadDisplayUser() {
    const participants = this.chatId.split('_');
    const loggedUserId = this.userService.loggedUser()?.id;
    if (!loggedUserId) return;
    const displayUserId = this.chatService.getDisplayUserId(participants, loggedUserId);
    await this.userService.getUserById(displayUserId);
  }
}
