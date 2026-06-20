import { Injectable, signal, inject } from '@angular/core';
import { ChannelInterface, RawChannelData } from '../interfaces/channel-interface';
import {
  Firestore,
  doc,
  setDoc,
  collection,
  getDocs,
  updateDoc,
  getDoc,
  docData,
  addDoc,
  onSnapshot,
} from '@angular/fire/firestore';
import { Channel } from '../models/channel.class';

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  firestore = inject(Firestore);
  allChannels = signal<ChannelInterface[]>([]);
  selectedChannel = signal<ChannelInterface | null>(null);
  private unsubscribeChannel?: () => void;

  rawChannelData = signal<RawChannelData>({
    name: '',
    description: '',
  });

  addChannel(channel: Channel) {
    const channelsRef = collection(this.firestore, 'channels');
    return addDoc(channelsRef, channel.toJSON());
  }

  getAllChannels() {
    const channelsRef = collection(this.firestore, 'channels');
    return onSnapshot(channelsRef, (snapshot) => {
      const channels = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      this.allChannels.set(channels as ChannelInterface[]);
    });
  }

  listenChannel(id: string) {
    this.unsubscribeChannel?.();
    const channelRef = doc(this.firestore, 'channels', id);
    this.unsubscribeChannel = onSnapshot(channelRef, (docSnap) => {
      if (!docSnap.exists()) {
        this.selectedChannel.set(null);
        return;
      }
      this.selectedChannel.set({
        id: docSnap.id,
        ...docSnap.data(),
      } as ChannelInterface);
    });
  }

  stopListeningChannel() {
    this.unsubscribeChannel?.();
    this.unsubscribeChannel = undefined;
    this.selectedChannel.set(null);
  }
}
