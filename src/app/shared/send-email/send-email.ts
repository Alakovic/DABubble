import { Component, signal, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-send-email',
  imports: [MatIconModule, RouterLink, ReactiveFormsModule],
  templateUrl: './send-email.html',
  styleUrls: ['./send-email.scss'],
})
export class SendEmail {
  errorMessage = signal('');
  successMessage = signal('');
  authService = inject(AuthService);

  emailForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  async sendEmail() {
    try {
      await this.authService.resetPassword(this.emailForm.value.email as string);
      this.successMessage.set(
        'Wenn ein Konto mit dieser E-Mail existiert, wurde eine E-Mail gesendet.',
      );
      this.emailForm.reset();
    } catch (error: any) {
      this.errorMessage.set('Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.');
    }
  }
}
