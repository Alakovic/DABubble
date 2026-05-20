import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { Intro } from './shared/intro/intro';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Intro, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App  {
  protected readonly title = signal('DABubble');

  showIntro = signal(localStorage.getItem('hasSeenIntro') === null);



  
  ngOnInit() {
    if (this.showIntro()) {
      setTimeout(() => {
        localStorage.setItem('hasSeenIntro', 'true');
        this.showIntro.set(false);
      }, 3500);
    }
  }
}
