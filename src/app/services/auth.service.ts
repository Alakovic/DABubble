import { Injectable, signal } from '@angular/core';
import { registerDataInterface } from '../interfaces/user-interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  registerData = signal<registerDataInterface>({
    name: '',
    email: '',
    password: '',
  });
}
