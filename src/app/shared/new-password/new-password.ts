import { Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-new-password',
  imports: [MatIconModule, ReactiveFormsModule],
  templateUrl: './new-password.html',
  styleUrls: ['./new-password.scss'],
})
export class NewPassword {
  route = inject(ActivatedRoute);
  router = inject(Router);
  authService = inject(AuthService);
  oobCode = '';
  successMessage = signal<boolean>(false);

  ngOnInit() {
    this.oobCode = this.route.snapshot.queryParams['oobCode'];
    if (!this.oobCode) {
      this.router.navigate(['/']);
    }
  }

  resetPasswordForm = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  passwordsMatch() {
    const password = this.resetPasswordForm.get('password')?.value;
    const confirmPassword = this.resetPasswordForm.get('confirmPassword')?.value;
    return password === confirmPassword;
  }

  async resetPassword() {
    try {
      await this.authService.changePassword(
        this.oobCode,
        this.resetPasswordForm.value.password || '',
      );

      this.showSuccessMessage();
    } catch (error) {
      console.log(error);
    }
  }

   showSuccessMessage() {
    this.successMessage.set(true);
    this.resetPasswordForm.reset();
    setTimeout(() => {
      this.router.navigate(['']);
    }, 1000);
  }
}
