import { Component,signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user-list',
  imports: [MatIconModule],
  templateUrl: './user-list.html',
  styleUrls: ['./user-list.scss'] ,
})
export class UserList {
 usersOpen = signal(false);
  toggleUsers() {
    this.usersOpen.update((open) => !open);
  }
}
