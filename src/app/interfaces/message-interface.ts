export interface MessageInterface {
  id: string;
  senderId: string;
  text: string;
  createdAt: number;
  mentions: Mention[];
  reactions?: MessageReaction[];
  edited?: boolean;
  updatedAt?: number;
}

export interface Mention {
  id: string;
  name: string;
}

export interface MessageReaction {
  emoji: string;
  userIds: string[];
}
