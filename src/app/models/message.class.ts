import { Mention, MessageInterface } from "../interfaces/message-interface";

export class Message implements MessageInterface {
  id: string;
  senderId: string;
  text: string;
  createdAt: number;
  mentions: Mention[] = [];

  constructor(data?: Partial<MessageInterface>) {
    this.id = data?.id ?? '';
    this.senderId = data?.senderId ?? '';
    this.text = data?.text ?? '';
    this.createdAt = data?.createdAt ?? Date.now();
    this.mentions = data?.mentions ?? [];
  }

  toJSON() {
    return {
      senderId: this.senderId,
      text: this.text,
      createdAt: this.createdAt,
      mentions: this.mentions,
    };
  }
}
