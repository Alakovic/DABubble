import { Component, signal,inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CreateChannel } from '../create-channel/create-channel';

@Component({
  selector: 'app-channels',
  imports: [MatIconModule],
  templateUrl: './channels.html',
  styleUrls: ['./channels.scss'],
})
export class Channels {
  channelsOpen = signal(true);
  dialog = inject(MatDialog);

  toggleChannels() {
    this.channelsOpen.update((value) => !value);
  }

  openDialog():void  {
    this.dialog.open(CreateChannel, {
      panelClass: 'create-channel-dialog',
    });
  }
}
