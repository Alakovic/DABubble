import { Injectable, signal, inject } from '@angular/core';
import { registerDataInterface } from '../interfaces/user-interface';
import {
  Auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  confirmPasswordReset,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth = inject(Auth);

  registerData = signal<registerDataInterface>({
    name: '',
    email: '',
    password: '',
  });

  register(email: string) {
    return createUserWithEmailAndPassword(this.auth, email, this.registerData().password);
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  googleLogin() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider);
  }

  resetPassword(email: string) {
    return sendPasswordResetEmail(this.auth, email);
  }

  changePassword(oobCode: string, newPassword: string) {
    return confirmPasswordReset(this.auth, oobCode, newPassword);
  }
}
