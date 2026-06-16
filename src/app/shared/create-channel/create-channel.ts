import { Component, inject } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ChannelService } from '../../services/channel-service';
import { Router } from '@angular/router';
import { AddMembers } from '../add-members/add-members';

@Component({
  selector: 'app-create-channel',
  imports: [MatIconModule, ReactiveFormsModule],
  templateUrl: './create-channel.html',
  styleUrls: ['./create-channel.scss'],
})
export class CreateChannel {
  dialogRef = inject(MatDialogRef);
  dialog = inject(MatDialog);
  channelService = inject(ChannelService);
  router = inject(Router);

  ngOnInit() {
    this.createForm.patchValue(this.channelService.rawChannelData());
  }

  createForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    description: new FormControl(''),
  });

  sendData() {
    if (this.createForm.invalid) return;
    this.channelService.rawChannelData.set({
      name: this.createForm.value.name || '',
      description: this.createForm.value.description || '',
    });
    this.dialogRef.close();
    this.dialog.open(AddMembers, {
      panelClass: 'create-channel-dialog',
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
    this.channelService.rawChannelData.set({
      name: '',
      description: '',
    });
  }

}
