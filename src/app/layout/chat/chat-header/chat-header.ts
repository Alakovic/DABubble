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
import { OverlayModule } from '@angular/cdk/overlay';
import { ChannelMembers } from '../../../shared/channel-members/channel-members';
import { ConnectedPosition } from '@angular/cdk/overlay';
import { AddMember } from '../../../shared/add-member/add-member';

@Component({
  selector: 'app-chat-header',
  imports: [CommonModule, MatIconModule, OverlayModule, ChannelInfo, ChannelMembers, AddMember],
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
  showMemberList = signal(false);
  showAddMember = signal(false);

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

  openMembers() {
    this.showMemberList.set(true);
  }

  closeMembers() {
    this.showMemberList.set(false);
  }

  showMembers() {
    return this.showMemberList();
  }

  openAddMember() {
    this.showMemberList.set(false);
    this.showAddMember.set(true);
  }

  closeAddMember() {
    this.showAddMember.set(false);
  }

  positions: ConnectedPosition[] = [
    {
      originX: 'end',
      originY: 'bottom',
      overlayX: 'end',
      overlayY: 'top',
      offsetY: 8,
    },
    {
      originX: 'end',
      originY: 'top',
      overlayX: 'end',
      overlayY: 'bottom',
      offsetY: -8,
    },
  ];
}
