import { Component, inject, signal } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CreateChannel } from '../create-channel/create-channel';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChannelService } from '../../services/channel-service';
import { UserService } from '../../services/user.service';
import { Channel } from '../../models/channel.class';
import { OverlayModule } from '@angular/cdk/overlay';
import { UserInterface } from '../../interfaces/user-interface';

@Component({
  selector: 'app-add-members',
  imports: [MatIconModule, ReactiveFormsModule, OverlayModule],
  templateUrl: './add-members.html',
  styleUrls: ['./add-members.scss'],
})
export class AddMembers {
  dialogRef = inject(MatDialogRef);
  dialog = inject(MatDialog);
  channelService = inject(ChannelService);
  userService = inject(UserService);
  selectedUsers: UserInterface[] = [];
  showList = signal(false);
  searchControl = new FormControl('');

  goBack(): void {
    this.dialogRef.close();
    this.dialog.open(CreateChannel, {
      panelClass: 'create-channel-dialog',
    });
  }

  addMembersForm = new FormGroup({
    memberMode: new FormControl<string | null>(null, Validators.required),
  });

  async createChannel() {
    const loggedUser = this.userService.loggedUser();
    if (!loggedUser) return;
    let members: string[] = [];
    if (this.addMembersForm.value.memberMode === 'all') {
      members = this.userService.allUsers().map((user) => user.id);
    }
    if (this.addMembersForm.value.memberMode === 'selected') {
      members = this.selectedUsers.map((user) => user.id);
    }
    if (!members.includes(loggedUser.id)) {
      members.push(loggedUser.id);
    }
    const channel = this.channelData(members, loggedUser.id);
    await this.channelService.addChannel(channel);
    this.channelService.rawChannelData.set({
      name: '',
      description: '',
    });

    this.dialogRef.close();
  }

  channelData(participants: string[], createdBy: string): Channel {
    const channelData = this.channelService.rawChannelData();
    return new Channel({
      name: channelData.name,
      description: channelData.description,
      participants,
      createdBy,
      createdAt: Date.now(),
    });
  }

  canCreateChannel(): boolean {
    if (this.addMembersForm.invalid) {
      return false;
    }
    if (this.addMembersForm.value.memberMode === 'selected') {
      return this.selectedUsers.length > 0;
    }
    return true;
  }

  openUserList() {
    this.showList.set(true);
  }

  closeUserList() {
    this.showList.set(false);
  }

  filteredUsers() {
    const loggedUser = this.userService.loggedUser();
    const search = this.searchControl.value?.toLowerCase().trim() ?? '';
    return this.userService
      .allUsers()
      .filter((user) => user.id !== loggedUser?.id)
      .filter((user) => user.name.toLowerCase().includes(search));
  }

  selectUser(user: UserInterface) {
    if (this.selectedUsers.some((u) => u.id === user.id)) {
      this.selectedUsers = this.selectedUsers.filter((u) => u.id !== user.id);
    } else {
      this.selectedUsers = [...this.selectedUsers, user];
    }
  }

}
