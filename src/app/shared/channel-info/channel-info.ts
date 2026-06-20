import { Component, inject,signal } from '@angular/core';
import { ChannelService } from '../../services/channel-service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-channel-info',
  imports: [MatIconModule],
  templateUrl: './channel-info.html',
  styleUrls: ['./channel-info.scss'],
})
export class ChannelInfo {
  isEditingName = signal(false);
  channelService = inject(ChannelService);
}
