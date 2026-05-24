import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Channels } from '../channels/channels';
import { UserList } from "../user-list/user-list";

@Component({
  selector: 'app-sidebar',
  imports: [MatIconModule, Channels, UserList],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss'],
})
export class Sidebar {}
