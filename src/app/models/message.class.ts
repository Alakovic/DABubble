import { Mention, MessageInterface, MessageReaction } from "../interfaces/message-interface";

export class Message implements MessageInterface {
  id: string;
  senderId: string;
  text: string;
  createdAt: number;
  mentions: Mention[] = [];
  reactions?: MessageReaction[];

  constructor(data?: Partial<MessageInterface>) {
    this.id = data?.id ?? '';
    this.senderId = data?.senderId ?? '';
    this.text = data?.text ?? '';
    this.createdAt = data?.createdAt ?? Date.now();
    this.mentions = data?.mentions ?? [];
    this.reactions = data?.reactions ?? [];
  }

  toJSON() {
    return {
      senderId: this.senderId,
      text: this.text,
      createdAt: this.createdAt,
      mentions: this.mentions,
      reactions: this.reactions,
    };
  }
}
