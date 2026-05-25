import { Component, inject } from '@angular/core';
import { ChatHeader } from '../../layout/chat/chat-header/chat-header';
import { UserService } from '../../services/user.service';
import { ChatContent } from '../../layout/chat/chat-content/chat-content';

@Component({
  selector: 'app-welcome-screen',
  imports: [ChatHeader, ChatContent],
  templateUrl: './welcome-screen.html',
  styleUrls: ['./welcome-screen.scss'],
})
export class WelcomeScreen {
  userService = inject(UserService);
  loggedUser = this.userService.loggedUser;
  welcome: boolean = true;
}
