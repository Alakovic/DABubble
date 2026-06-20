import { Component, signal, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CreateChannel } from '../create-channel/create-channel';
import { ChannelService } from '../../services/channel-service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-channels',
  imports: [MatIconModule],
  templateUrl: './channels.html',
  styleUrls: ['./channels.scss'],
})
export class Channels {
  channelsOpen = signal(true);
  dialog = inject(MatDialog);
  channelService = inject(ChannelService);
  userService = inject(UserService);
  router = inject(Router);
  activeChannelId = '';
  unsubscribe?: () => void;

  ngOnInit() {
    this.unsubscribe = this.channelService.getAllChannels();
  }

  ngOnDestroy() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  toggleChannels() {
    this.channelsOpen.update((value) => !value);
  }

  openDialog(): void {
    this.dialog.open(CreateChannel, {
      panelClass: 'create-channel-dialog',
    });
  }

  openChannel(channelId: string) {
     this.activeChannelId = channelId;
    this.router.navigate(['/workspace/channel', channelId]);
  }

  myChannels() {
    const loggedUser = this.userService.loggedUser();
    if (!loggedUser) return [];
    return this.channelService
      .allChannels()
      .filter((channel) => channel.participants.includes(loggedUser.id));
  }
}
