/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client"
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
  console.log("Recahed inside socket Provider")
  const { user} = useSelector((state: IUserSelector) => state.user);
  const id = useSelector((state: IUserSelector) => state.user?.user?._id);
  
  const [socket, setSocket] = useState<any | null>(null);
  const [onlineUsers, setOnlineUsers] = useState([]);


  useEffect(() => {
    if(user){
      const newSocket = io("showbuzz.tickertick.shop",{
        query:{
          userId: id
        }
      })
      setSocket(newSocket)

      newSocket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users)
      })
      console.log("🚀 ~ file: SocketContext.tsx:55 ~ useEffect ~ newSocket:", newSocket)

      return () => {
        newSocket.close();
      }
    } else {
      if(socket) {
        socket.close()
      }
      setSocket(null)
    }
  },[socket])

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