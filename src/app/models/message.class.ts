import { Mention, MessageInterface, MessageReaction } from '../interfaces/message-interface';

export class Message implements MessageInterface {
  id: string;
  senderId: string;
  text: string;
  createdAt: number;
  mentions: Mention[] = [];
  reactions?: MessageReaction[];
  edited?: boolean;
  updatedAt?: number;

  constructor(data?: Partial<MessageInterface>) {
    this.id = data?.id ?? '';
    this.senderId = data?.senderId ?? '';
    this.text = data?.text ?? '';
    this.createdAt = data?.createdAt ?? Date.now();
    this.mentions = data?.mentions ?? [];
    this.reactions = data?.reactions ?? [];
    this.edited = data?.edited ?? false;
    this.updatedAt = data?.updatedAt;
  }

  toJSON() {
    const data: any = {
      senderId: this.senderId,
      text: this.text,
      createdAt: this.createdAt,
      mentions: this.mentions,
      reactions: this.reactions,
      edited: this.edited,
    };
    if (this.updatedAt !== undefined) {
      data.updatedAt = this.updatedAt;
    }
    return data;
  }
}
