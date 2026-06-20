import { Component, inject, signal,output } from '@angular/core';
import { ChannelService } from '../../services/channel-service';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../services/user.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-channel-info',
  imports: [MatIconModule, ReactiveFormsModule],
  templateUrl: './channel-info.html',
  styleUrls: ['./channel-info.scss'],
})
export class ChannelInfo {
  isEditingName = signal(false);
  isEditingDescription = signal(false);
  channelService = inject(ChannelService);
  userService = inject(UserService);
  close = output<void>();

  getCreatorName(): string {
    const channel = this.channelService.selectedChannel();
    if (!channel) return '';
    const creator = this.userService.allUsers().find((user) => user.id === channel.createdBy);
    return creator?.name ?? 'Unbekannt';
  }

  channelForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
  });

  editName() {
    const channel = this.channelService.selectedChannel();
    if (!channel) return;
    this.channelForm.patchValue({
      name: channel.name,
    });
    this.isEditingName.set(true);
  }

  editDescription() {
    const channel = this.channelService.selectedChannel();
    if (!channel) return;
    this.channelForm.patchValue({
      description: channel.description,
    });
    this.isEditingDescription.set(true);
  }

  async saveName() {
    const channel = this.channelService.selectedChannel();
    if (!channel) return;
    await this.channelService.updateChannel(channel.id, {
      name: this.channelForm.value.name!,
    });
    this.isEditingName.set(false);
  }

  async saveDescription() {
    const channel = this.channelService.selectedChannel();
    if (!channel) return;
    await this.channelService.updateChannel(channel.id, {
      description: this.channelForm.value.description!,
    });
    this.isEditingDescription.set(false);
  }
}
