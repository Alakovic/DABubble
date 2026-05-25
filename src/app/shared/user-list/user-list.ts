import { Component,signal,inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  imports: [MatIconModule],
  templateUrl: './user-list.html',
  styleUrls: ['./user-list.scss'] ,
})
export class UserList {
 usersOpen = signal(false);
 userService = inject(UserService)
  toggleUsers() {
    this.usersOpen.update((open) => !open);
  }
}
