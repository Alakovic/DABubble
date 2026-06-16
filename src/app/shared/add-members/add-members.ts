import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CreateChannel } from '../create-channel/create-channel';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChannelService } from '../../services/channel-service';
import { UserService } from '../../services/user.service';
import { Channel } from '../../models/channel.class';

@Component({
  selector: 'app-add-members',
  imports: [MatIconModule, ReactiveFormsModule],
  templateUrl: './add-members.html',
  styleUrls: ['./add-members.scss'],
})
export class AddMembers {
  dialogRef = inject(MatDialogRef);
  dialog = inject(MatDialog);
  channelService = inject(ChannelService);
  userService = inject(UserService);

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
    const channel = this.channelData(members, loggedUser.id);
    await this.channelService.addChannel(channel);
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
}
