export class Channel implements Channel {
  id: number;
  name: string;
  description: string;
  createdAt: number;
  participants: string[];

  constructor(data?: Partial<Channel>) {
    this.id = data?.id ?? 0;
    this.name = data?.name ?? '';
    this.description = data?.description ?? '';
    this.createdAt = data?.createdAt ?? Date.now();
    this.participants = data?.participants ?? [];
  }

  toJSON() {
    return {
      name: this.name,
      description: this.description,
      createdAt: this.createdAt,
      participants: this.participants,
    };
  }
}
