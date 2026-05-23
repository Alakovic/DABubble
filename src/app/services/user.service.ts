import { Injectable, inject, signal } from '@angular/core';
import { User } from '../models/user.class';
import { Firestore, doc, setDoc, collection, getDocs, updateDoc } from '@angular/fire/firestore';
import { UserInterface } from '../interfaces/user-interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  firestore = inject(Firestore);
  allUsers = signal<UserInterface[]>([]);

  addUser(user: User) {
    const usersRef = doc(this.firestore, 'users', user.id);
    return setDoc(usersRef, user.toJSON());
  }

  async getAllUsers() {
    const usersRef = collection(this.firestore, 'users');
    const snapshot = await getDocs(usersRef);
    const users = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    this.allUsers.set(users as UserInterface[]);
  }

  updateUserStatus(id: string, status: string) {
    const userRef = doc(this.firestore, 'users', id);
    return updateDoc(userRef, { status });
  }
}
