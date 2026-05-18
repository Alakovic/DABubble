import { Component } from '@angular/core';
import {  MatIconModule } from '@angular/material/icon';
import { RouterLink } from "@angular/router";
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatIconModule, RouterLink, MatCheckboxModule],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']  ,
})
export class Register {}
