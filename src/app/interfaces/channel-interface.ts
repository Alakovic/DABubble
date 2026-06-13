export interface Channel {
  id: number;
  name: string;
  description: string;
  createdAt: number;
  participants: string[];
}

export interface RawChannelData {
  name: string;
  description: string;
}
