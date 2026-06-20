import { Component, signal,inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CreateChannel } from '../create-channel/create-channel';
import { ChannelService } from '../../services/channel-service';
import { Router } from '@angular/router';

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
  router = inject(Router);
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

  openChannel(channelId: string) {
    this.router.navigate(['/workspace/channel', channelId]);
  }
}
