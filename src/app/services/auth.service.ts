import { Injectable, signal, inject } from '@angular/core';
import { registerDataInterface } from '../interfaces/user-interface';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';

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
}
