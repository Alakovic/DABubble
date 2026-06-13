import { Injectable,signal } from '@angular/core';
import { RawChannelData } from '../interfaces/channel-interface';

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  rawChannelData = signal<RawChannelData>({
    name: '',
    description: '',
  });

}
