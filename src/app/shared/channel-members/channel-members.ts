import { Component, inject, signal, output } from '@angular/core';
import { ChannelService } from '../../services/channel-service';
import { UserService } from '../../services/user.service';
import { MatIconModule } from '@angular/material/icon';
import { UserInterface } from '../../interfaces/user-interface';
import { MatDialog } from '@angular/material/dialog';
import { UserProfile } from '../user-profile/user-profile';

@Component({
  selector: 'app-channel-members',
  imports: [MatIconModule],
  templateUrl: './channel-members.html',
  styleUrls: ['./channel-members.scss'],
})
export class ChannelMembers {
  channelService = inject(ChannelService);
  userService = inject(UserService);
  close = output<void>();
  openAdd = output<void>();
  dialog = inject(MatDialog);

  getMembers() {
    const channel = this.channelService.selectedChannel();
    if (!channel) return [];
    return this.userService.allUsers().filter((user) => channel.participants.includes(user.id));
  }

  openProfile(user:UserInterface) {
    this.dialog.open(UserProfile, {
      data: { user, source: 'channel-members' },
      panelClass: 'profile-dialog-centered',
    });
  }
}
