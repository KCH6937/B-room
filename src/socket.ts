import { EnterData, ChatData } from '@interfaces/socket/socket.dto';
import { Server } from 'socket.io';

const createChatNameSpace = (io: Server) => {
  const chatNameSpace = io.of('/chat').on('connection', (socket: any) => {
    socket.on('enter', (data: EnterData) => {
      const roomId = (socket.data.roomId = data.roomId);
      const userName = (socket.data.userName = data.userName);

      socket.join(String(roomId));
      chatNameSpace
        .to(String(roomId))
        .emit('chat', `${userName}님이 입장하셨습니다.`);
    });

    socket.on('chat', (data: ChatData) => {
      const msg = (socket.data.msg = data.msg);

      socket.broadcast.to(String(socket.data.roomId)).emit('chat', msg);
    });

    socket.on('disconnect', () => {
      chatNameSpace
        .to(String(socket.data.roomId))
        .emit('chat', `${socket.data.userName}님이 퇴장하셨습니다.`);
    });
  });
};

export default createChatNameSpace;
