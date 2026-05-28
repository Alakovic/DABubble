import { ChatInterface } from '../interfaces/chat-interface';

export class Chat implements ChatInterface {
  id: string;
  participants: string[];
  createdAt: number;
  constructor(data?: Partial<ChatInterface>) {
    this.id = data?.id ?? '';
    this.participants = data?.participants ?? [];
    this.createdAt = data?.createdAt ?? Date.now();
  }

  toJSON() {
  return {
    id: this.id,
    participants: this.participants,
    createdAt: this.createdAt,
  };
}
}
