import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client"
import { SOCKET_URL } from "../config/constants";
import { useSelector } from "react-redux";
import { IUserSelector } from "../interface/IUserSlice";

interface SocketContextType {
  socket: any | null;
  messages: any[]; 
  onlineUsers: any[];
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  messages: [],
  onlineUsers: [],
});

export const useSocketContext  = (): SocketContextType => {
  return useContext(SocketContext);
}



export const SocketProvider = ({ children }: any) => {
  const { user} = useSelector((state: IUserSelector) => state.user);
  const id = useSelector((state: IUserSelector) => state.user?.user?._id);
  
  const [socket, setSocket] = useState<any | null>(null);
  const [onlineUsers, setOnlineUsers] = useState([]);


  useEffect(() => {
    if(user){
      const newSocket = io("htt",{
        query:{
          userId: id
        }
      })
      setSocket(newSocket)

      newSocket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users)
      })

      return () => {
        newSocket.close();
      }
    } else {
      if(socket) {
        socket.close()
      }
      setSocket(null)
    }
  },[id, socket, user])

  const contextValue: SocketContextType = {
    socket, onlineUsers,
    messages: []
  };

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  )
}