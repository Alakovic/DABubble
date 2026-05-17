import { Component } from '@angular/core';
import {  MatIconModule } from '@angular/material/icon';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatIconModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']  ,
})
export class Register {}
