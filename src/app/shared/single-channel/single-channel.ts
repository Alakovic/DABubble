import { Component, inject } from '@angular/core';
import { ChannelService } from '../../services/channel-service';
import { ActivatedRoute } from '@angular/router';
import { ChatHeader } from '../../layout/chat/chat-header/chat-header';

@Component({
  selector: 'app-single-channel',
  imports: [ChatHeader],
  templateUrl: './single-channel.html',
  styleUrls: ['./single-channel.scss'],
})
export class SingleChannel {
  route = inject(ActivatedRoute);
  channelService = inject(ChannelService);

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const channelId = params.get('id');
      if (channelId) {
        this.channelService.listenChannel(channelId);
      }
    });
  }

  ngOnDestroy() {
    this.channelService.stopListeningChannel();
  }
}
