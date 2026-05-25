import { Component, Input } from '@angular/core';
import { UserInterface } from '../../../interfaces/user-interface';

@Component({
  selector: 'app-chat-header',
  imports: [],
  templateUrl: './chat-header.html',
  styleUrls: ['./chat-header.scss'],
})
export class ChatHeader {
  @Input() loggedUser  : UserInterface | null = null;
 @Input() isWelcome = false;
}
