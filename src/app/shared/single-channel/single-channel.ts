import { Component, inject } from '@angular/core';
import { ChannelService } from '../../services/channel-service';
import { ActivatedRoute } from '@angular/router';
import { ChatHeader } from '../../layout/chat/chat-header/chat-header';
import { ChatInput } from '../../layout/chat/chat-input/chat-input';
import { ChatContent } from '../../layout/chat/chat-content/chat-content';
import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'app-single-channel',
  imports: [ChatHeader, ChatContent, ChatInput],
  templateUrl: './single-channel.html',
  styleUrls: ['./single-channel.scss'],
})
export class SingleChannel {
  route = inject(ActivatedRoute);
  channelService = inject(ChannelService);
  messageService = inject(MessagesService);

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const channelId = params.get('id');
      if (channelId) {
        this.channelService.listenChannel(channelId);
        this.messageService.loadChannelMessages(channelId);
      }
    });
  }

  ngOnDestroy() {
    this.channelService.stopListeningChannel();
  }
}
