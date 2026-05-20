import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
})
export class Header {
  router = inject(Router);

  hideHeaderRight(): boolean {
    return (
      this.router.url === '/sign-in' ||
      this.router.url === '/send-email' ||
      this.router.url === '/select-avatar' ||
      this.router.url.startsWith('/new-password')
    );
  }
}
