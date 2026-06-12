import { Injectable, inject, signal } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
import { Message } from '../models/message.class';
import { Mention, MessageInterface, MessageReaction } from '../interfaces/message-interface';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  firestore = inject(Firestore);
  messages = signal<MessageInterface[]>([]);
  mentions = signal<Mention[]>([]);
  unsubscribeMessages?: () => void;

  async sendMessage(chatId: string, message: Message) {
    const messRef = collection(this.firestore, 'chats', chatId, 'messages');
    await addDoc(messRef, message.toJSON());
  }

  async addReaction(chatId: string, messageId: string, reactions: MessageReaction[]) {
    const messRef = doc(this.firestore, 'chats', chatId, 'messages', messageId);
    await updateDoc(messRef, { reactions: reactions });
  }

  loadMessages(chatId: string) {
    const messRef = collection(this.firestore, 'chats', chatId, 'messages');
    const q = query(messRef, orderBy('createdAt'));
    this.unsubscribeMessages = onSnapshot(q, (querySnapshot) => {
      const messages = querySnapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() }) as MessageInterface,
      );
      this.messages.set(messages);
    });
  }

  async updateMessage(chatId: string, messageId: string, text: string, mentions: Mention[]) {
    const messRef = doc(this.firestore, 'chats', chatId, 'messages', messageId);
    await updateDoc(messRef, { text, mentions, edited: true, updatedAt: Date.now() });
  }
}
