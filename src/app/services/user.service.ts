import { Injectable, inject, signal } from '@angular/core';
import { User } from '../models/user.class';
import {
  Firestore,
  doc,
  setDoc,
  collection,
  getDocs,
  updateDoc,
  getDoc,
  docData,
} from '@angular/fire/firestore';
import { UserInterface } from '../interfaces/user-interface';

/**
 * Service responsible for managing users in Firestore.
 */
@Injectable({
  providedIn: 'root',
})
export class UserService {
  firestore = inject(Firestore);
  allUsers = signal<UserInterface[]>([]);
  loggedUser = signal<UserInterface | null>(null);
  selectedUser = signal<UserInterface | null>(null);

  /**
   * Adds a new user document to Firestore.
   *
   * @param user - User object to save.
   * @returns Promise that resolves when the user is added.
   */
  addUser(user: User) {
    const usersRef = doc(this.firestore, 'users', user.id);
    return setDoc(usersRef, user.toJSON());
  }

  /**
   * Fetches all users from Firestore
   * and updates the local signal state.
   *
   * @returns Promise that resolves when users are loaded.
   */
  async getAllUsers() {
    const usersRef = collection(this.firestore, 'users');
    const snapshot = await getDocs(usersRef);
    const users = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    this.allUsers.set(users as UserInterface[]);
  }

  /**
   * Updates the status of a user in Firestore.
   *
   * @param id - User ID.
   * @param status - New status.
   * @returns Promise that resolves when the status is updated.
   */
  updateUserStatus(id: string, status: string) {
    const userRef = doc(this.firestore, 'users', id);
    return updateDoc(userRef, { status });
  }

  /**
   * Updates the name of a user in Firestore.
   *
   * @param id - User ID.
   * @param name - New name.
   * @returns Promise that resolves when the name is updated.
   */
  updateUser(id: string, name: string) {
    const userRef = doc(this.firestore, 'users', id);
    return updateDoc(userRef, { name });
  }

  async getUserById(id: string) {
    const userDocRef = doc(this.firestore, 'users', id);
    const userSnap = await getDoc(userDocRef);
    if (!userSnap.exists()) return;
    this.selectedUser.set(
      new User({
        id: userSnap.id,
        ...userSnap.data(),
      } as UserInterface),
    );
  }
}
