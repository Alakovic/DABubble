export interface ChannelInterface {
  id: string;
  name: string;
  description: string;
  createdAt: number;
  participants: string[];
  createdBy: string;
}

export interface RawChannelData {
  name: string;
  description: string;
}
