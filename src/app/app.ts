import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { Intro } from './shared/intro/intro';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Intro],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App  {
  protected readonly title = signal('DABubble');

  showIntro = signal(sessionStorage.getItem('hasSeenIntro') === null);



  
  ngOnInit() {
    if (this.showIntro()) {
      setTimeout(() => {
        sessionStorage.setItem('hasSeenIntro', 'true');
        this.showIntro.set(false);
      }, 3500);
    }
  }
}
