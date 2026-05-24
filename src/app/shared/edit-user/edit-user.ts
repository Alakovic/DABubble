import { Component,inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.class';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { UserProfile } from '../user-profile/user-profile';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-edit-user',
  imports: [MatInputModule, MatNativeDateModule, FormsModule, CommonModule,MatIconModule],
  templateUrl: './edit-user.html',
  styleUrls: ['./edit-user.scss'],
})
export class EditUser {
  dialog =inject(MatDialog);
  dialogRef = inject(MatDialogRef<UserProfile>);
  data = inject(MAT_DIALOG_DATA);
  user = new User(this.data);
  userService = inject(UserService);

  async saveUser(){
    await this.userService.updateUser(this.user.id, this.user.name);
    this.userService.loggedUser.set(this.user);
    this.dialogRef.close();
  }
}
