import { Component , signal} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-channels',
  imports: [MatIconModule],
  templateUrl: './channels.html',
  styleUrls: ['./channels.scss'],
})
export class Channels {
  channelsOpen = signal(true);

toggleChannels() {
  this.channelsOpen.update(value => !value);
}
}
