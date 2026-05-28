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
  signOut,
} from '@angular/fire/auth';

/**
 * Service responsible for handling user authentication
 * with Firebase Authentication.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
   * Firebase authentication instance.
   */
  auth = inject(Auth);

  /**
   * Stores registration form data.
   */
  registerData = signal<registerDataInterface>({
    name: '',
    email: '',
    password: '',
  });

  /**
   * Creates a new user account using email and password.
   *
   * @param email - User email address.
   * @returns Promise containing Firebase user credentials.
   */
  register(email: string) {
    return createUserWithEmailAndPassword(this.auth, email, this.registerData().password);
  }

  /**
   * Logs in a user using email and password.
   *
   * @param email - User email address.
   * @param password - User password.
   * @returns Promise containing Firebase user credentials.
   */
  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  /**
   * Logs in a user using Google authentication.
   *
   * @returns Promise containing Firebase user credentials.
   */
  googleLogin() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider);
  }

  /**
   * Sends a password reset email to the specified email address.
   *
   * @param email - User email address.
   * @returns Promise<void>
   */
  resetPassword(email: string) {
    return sendPasswordResetEmail(this.auth, email);
  }

  /**
   * Confirms password reset with a verification code
   * and sets a new password.
   *
   * @param oobCode - Firebase password reset verification code.
   * @param newPassword - New password chosen by the user.
   * @returns Promise that resolves when the password is changed.
   */
  changePassword(oobCode: string, newPassword: string) {
    return confirmPasswordReset(this.auth, oobCode, newPassword);
  }

  /**
   * Logs out the currently authenticated user.
   *
   * @returns Promise<void>
   */
  logout() {
    return signOut(this.auth);
  }
}
