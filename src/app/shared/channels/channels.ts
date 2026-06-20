import { Component, signal,inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CreateChannel } from '../create-channel/create-channel';
import { ChannelService } from '../../services/channel-service';

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

  openDialog():void  {
    this.dialog.open(CreateChannel, {
      panelClass: 'create-channel-dialog',
    });
  }
}
