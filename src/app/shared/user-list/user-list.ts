import { Component,signal,inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../services/user.service';
import { UserInterface } from '../../interfaces/user-interface';
import { ChatService } from '../../services/chat.service';
import { Router } from '@angular/router';
import { CdkAutofill } from "@angular/cdk/text-field";

@Component({
  selector: 'app-user-list',
  imports: [MatIconModule, CdkAutofill],
  templateUrl: './user-list.html',
  styleUrls: ['./user-list.scss'] ,
})
export class UserList {
 usersOpen = signal(false);
 userService = inject(UserService)
 chatService = inject(ChatService)
 router = inject(Router)

  toggleUsers() {
    this.usersOpen.update((open) => !open);
  }

  async startChat(selectedUser:UserInterface){
    const loggedUser = this.userService.loggedUser();
    if(!loggedUser) return;
    const chatId = await this.chatService.createChat(loggedUser.id, selectedUser.id);
    this.router.navigate(['/workspace/chat', chatId]);
  }
}
