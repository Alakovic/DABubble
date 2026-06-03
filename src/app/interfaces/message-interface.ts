export interface MessageInterface {
    id:string;
    senderId:string;
    text:string;
    createdAt:number;
    mentions:Mention[];
}


export interface Mention {
  id: string;
  name: string;
}
