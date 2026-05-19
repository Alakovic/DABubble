import { Injectable, inject } from '@angular/core';
import { User } from '../models/user.class';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  firestore = inject(Firestore);

  addUser(user: User) {
    const usersRef = doc(this.firestore, 'users', user.id);
    return setDoc(usersRef, user.toJSON());
  }
}
