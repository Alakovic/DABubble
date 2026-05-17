import { Component, inject } from '@angular/core';
import { RouterLink,Router } from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
})
export class Header {
  router = inject(Router);
}
