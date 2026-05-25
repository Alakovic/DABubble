import { Component, Input } from '@angular/core';
import { UserInterface } from '../../../interfaces/user-interface';

@Component({
  selector: 'app-chat-content',
  imports: [],
  templateUrl: './chat-content.html',
  styleUrls: ['./chat-content.scss'],
})
export class ChatContent {
   @Input() loggedUser  : UserInterface | null = null;
   @Input() isWelcome = false;
}
