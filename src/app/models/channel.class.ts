import { ChannelInterface } from '../interfaces/channel-interface';

export class Channel implements ChannelInterface {
  id: string;
  name: string;
  description: string;
  createdAt: number;
  participants: string[];
  createdBy: string;
  constructor(data?: Partial<ChannelInterface>) {
    this.id = data?.id ?? "";
    this.name = data?.name ?? '';
    this.description = data?.description ?? '';
    this.createdAt = data?.createdAt ?? Date.now();
    this.createdBy = data?.createdBy ?? '';

    this.participants = data?.participants ?? [];
  }

  toJSON() {
    return {
      name: this.name,
      description: this.description,
      createdAt: this.createdAt,
      createdBy: this.createdBy,
      participants: this.participants,
    };
  }
}
