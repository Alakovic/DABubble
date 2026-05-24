import { Component, inject} from '@angular/core';
import {  MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user.class';
import { UserService } from '../../services/user.service';
import { MatIconModule } from '@angular/material/icon';
import { TitleCasePipe } from '@angular/common';
import { EditUser } from '../edit-user/edit-user';

@Component({
  selector: 'app-user-profile',
  imports: [
    MatInputModule,
    MatNativeDateModule,
    FormsModule,
    CommonModule,MatIconModule,TitleCasePipe
  ],
  templateUrl: './user-profile.html',
  styleUrls: ['./user-profile.scss'],
})
export class UserProfile {
  dialog =inject(MatDialog);
  dialogRef = inject(MatDialogRef<UserProfile>);
  data = inject(MAT_DIALOG_DATA);
  user = new User(this.data);
  userService = inject(UserService);

  editDialog() {
    this.dialogRef.close(UserProfile);
    this.dialog.open(EditUser, {
      data: this.userService.loggedUser(),
    })
  }
}
