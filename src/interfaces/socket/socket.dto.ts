export interface ClientToServerEvents {
  chat: (data: ChatData) => void;
  enter: (data: EnterData) => void;
}

export interface ServerToClientEvents {
  chat: (msg: string) => void;
}

export interface EnterData {
  roomId: number;
  userName: string;
}

export interface ChatData {
  msg: string;
}
