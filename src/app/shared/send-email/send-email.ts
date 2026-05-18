import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-send-email',
  imports: [MatIconModule, RouterLink],
  templateUrl: './send-email.html',
  styleUrls: ['./send-email.scss'],
})
export class SendEmail {}
