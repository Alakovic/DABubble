import { Injectable, signal, inject } from '@angular/core';
import { registerDataInterface } from '../interfaces/user-interface';
import { Auth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from '@angular/fire/auth';

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

  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  googleLogin() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider);
  }
}
