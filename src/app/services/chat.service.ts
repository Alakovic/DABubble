import { Injectable,inject,signal } from '@angular/core';
import { Firestore, doc, setDoc, docData } from '@angular/fire/firestore';
import { Chat } from '../models/chat.class';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  firestore = inject(Firestore);
  activeChatId = signal<string>('');
  
  async createChat(loggedUserId: string, selectedUserId: string) {
    const chatId = [loggedUserId, selectedUserId].sort().join('_');
    const chat = new Chat({
      id: chatId,
      participants: [loggedUserId, selectedUserId],
      createdAt: Date.now(),
    });
    const chatRef = doc(this.firestore, 'chats', chatId);
    await setDoc(chatRef, chat.toJSON(), { merge: true });
    return chatId;
  }

  getChatById(chatId: string) {
    const chatRef = doc(this.firestore, 'chats', chatId);
    return docData(chatRef);
  }

  getDisplayUserId(participants: string[], loggedUserId: string) {
    const isSelfChat = participants.every(id => id === loggedUserId);
    if (isSelfChat) {
      return loggedUserId; // For self-chat, return the logged user's ID
    }
    return participants.find(id => id !== loggedUserId) || '';
  }
}
