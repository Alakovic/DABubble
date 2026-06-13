import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatIconModule, RouterLink, MatCheckboxModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
})
export class Register {
  authService = inject(AuthService);
  router = inject(Router);

  ngOnInit() {
    this.userform.patchValue(this.authService.registerData());
  }

  userform = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern(/^[a-zA-ZäöüÄÖÜß\s]+$/),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    privacy: new FormControl(false, [Validators.requiredTrue]),
  });

  sendData() {
    if (this.userform.invalid) return;
    this.authService.registerData.set({
      name: this.userform.value.name || '',
      email: this.userform.value.email || '',
      password: this.userform.value.password || '',
    });
    this.router.navigate(['/select-avatar']);
  }
}
