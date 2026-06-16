import { Injectable, signal, inject } from '@angular/core';
import { RawChannelData } from '../interfaces/channel-interface';
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
} from '@angular/fire/firestore';
import { Channel } from '../models/channel.class';

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  firestore = inject(Firestore);

  rawChannelData = signal<RawChannelData>({
    name: '',
    description: '',
  });

  addChannel(channel: Channel) {
    const channelsRef = collection(this.firestore, 'channels');
    return addDoc(channelsRef, channel.toJSON());
  }
}
