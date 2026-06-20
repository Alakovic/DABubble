import { Component, Input, computed, inject, signal } from '@angular/core';
import { UserInterface } from '../../../interfaces/user-interface';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { UserProfile } from '../../../shared/user-profile/user-profile';
import { MatDialog } from '@angular/material/dialog';
import { ChannelInterface } from '../../../interfaces/channel-interface';
import { MatIconModule } from '@angular/material/icon';
import { ChannelService } from '../../../services/channel-service';
import { ChannelInfo } from '../../../shared/channel-info/channel-info';
import {  OverlayModule } from '@angular/cdk/overlay';

@Component({
  selector: 'app-chat-header',
  imports: [CommonModule, MatIconModule, OverlayModule, ChannelInfo],
  templateUrl: './chat-header.html',
  styleUrls: ['./chat-header.scss'],
})
export class ChatHeader {
  userService = inject(UserService);
  channelService = inject(ChannelService);
  dialog = inject(MatDialog);
  @Input() user: UserInterface | null = null;
  @Input() isDirectChat = false;
  @Input() isChannelChat = false;
  @Input() channel: ChannelInterface | null = null;
  showInfo = signal(false);

  displayInfo() {
    this.showInfo.set(true);
  }

  closeInfo() {
    this.showInfo.set(false);
  }
  goToProfile() {
    this.dialog.open(UserProfile, {
      data: { user: this.user, source: 'chat' },
      panelClass: 'profile-dialog-centered',
    });
  }

  getMembers(): UserInterface[] {
    if (!this.channel) return [];

    return this.userService
      .allUsers()
      .filter((user) => this.channel!.participants.includes(user.id));
  }
}
