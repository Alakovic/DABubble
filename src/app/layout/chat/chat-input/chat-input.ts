import { Component, Input, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { UserInterface } from '../../../interfaces/user-interface';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-chat-input',
  imports: [MatIconModule],
  templateUrl: './chat-input.html',
  styleUrls: ['./chat-input.scss']
})
export class ChatInput {
  @Input() user: UserInterface | null = null;
  userService = inject(UserService);
  showList = signal(false);
  showEmojis = signal(false);

  emojis = [
    'assets/img/emojis/excellence.png',
    'assets/img/emojis/face-savoring-food.png',
    'assets/img/emojis/head-bandage.png',
    'assets/img/emojis/laugh.png',
    'assets/img/emojis/love.png',
    'assets/img/emojis/mark.png',
    'assets/img/emojis/nerd.png',
    'assets/img/emojis/party-popper.png',
    'assets/img/emojis/rocket.png',
    'assets/img/emojis/smiling-eyes.png',
    'assets/img/emojis/smiling-face-with-sunglasses.png',
    'assets/img/emojis/star-struck.png',
    'assets/img/emojis/without-mouth.png',
    'assets/img/emojis/zany-face.png'
  ]

  toggleUserList() {
    this.showList.update((show) => !show);
  }

  toggleEmojiPicker() {
    this.showEmojis.update((show) => !show);
  }

 
}
