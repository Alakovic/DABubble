import { Component, output, inject,signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { UserInterface } from '../../interfaces/user-interface';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ChannelService } from '../../services/channel-service';
import { UserService } from '../../services/user.service';
import { OverlayModule } from '@angular/cdk/overlay';

@Component({
  selector: 'app-add-member',
  imports: [MatIconModule, ReactiveFormsModule, OverlayModule],
  templateUrl: './add-member.html',
  styleUrls: ['./add-member.scss'],
})
export class AddMember {
  close = output<void>();
  channelService = inject(ChannelService);
  userService = inject(UserService);
  showList = signal(false);
  searchControl = new FormControl('');
  selectedUsers: UserInterface[] = [];

  filteredUsers() {
    const channel = this.channelService.selectedChannel();
    if (!channel) return [];
    const loggedUser = this.userService.loggedUser();
    const search = this.searchControl.value?.toLowerCase().trim() ?? '';

    return this.userService
      .allUsers()
      .filter((user) => user.id !== loggedUser?.id)
      .filter((user) => !channel.participants.includes(user.id))
      .filter((user) => user.name.toLowerCase().includes(search));
  }

  selectUser(user: UserInterface) {
    if (this.selectedUsers.some((u) => u.id === user.id)) {
      this.selectedUsers = this.selectedUsers.filter((u) => u.id !== user.id);
    } else {
      this.selectedUsers = [...this.selectedUsers, user];
    }
  }

  openUserList() {
    this.showList.set(true);
  }

  closeUserList() {
    this.showList.set(false);
  }

 async addMember() {
    const channel = this.channelService.selectedChannel();
    if(!channel)return;
    const newParticipants = this.selectedUsers.map((u) => u.id);
    await this.channelService.updateChannel(channel.id, {
      participants: [...channel.participants, ...newParticipants],
    });
    this.close.emit();
  }
}
