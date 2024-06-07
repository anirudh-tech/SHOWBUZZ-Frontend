import React, { useEffect, useRef, useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import Modal from "../../components/Modal/Modal";
import { CgCloseO } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { createGroup, getMessage, joinGroup, listGroups, listMessages, sendMessage } from "../../redux/actions/userActions";
import { IUserSelector } from "../../interface/IUserSlice";
import chatSvg from "../../assets/chat.svg"
import {useSocketContext } from "../../context/SocketContext";
import toast from "react-hot-toast";
import { format } from "date-fns"
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaPaperPlane } from "react-icons/fa";
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';


const UserCommunity = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [isPlusRotated, setPlusRotated] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [chatId, setChatId] = useState("");
  const [messageText, setMessageText] = useState("");
  const [joinLink, setJoinLink] = useState("");
  const [selectedGroupMessages, setSelectedGroupMessages] = useState<any>([]);
  const [groupError, setGroupError] = useState("");
  const [linkError, setLinkError] = useState("");
  const { groups } = useSelector((state: IUserSelector) => state.user);
  const {socket} = useSocketContext()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { onlineUsers } = useSocketContext()
  const id = useSelector((state: IUserSelector) => state.user?.user?._id);
  const messageBoxRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(listGroups())
  }, [])

  useEffect(() => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  }, [selectedGroupMessages]);

  useEffect(() => {
    socket?.on("message recieved", (newMessage: any) => {
      setSelectedGroupMessages([...selectedGroupMessages, newMessage])
      
    })
  },[selectedGroupMessages]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAnchor = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const idPop = open ? 'simple-popover' : undefined;

  const handleGroupSelect = async (id: string, name: string) => {
    await dispatch(getMessage({ id }))
    setSelectedGroup(name)
    setChatId(id)
    const res = await dispatch(listMessages(id))
    socket.emit("join chat",(id))
    setSelectedGroupMessages(res.payload)
  }

  const handleClose = () => {
    setModalOpen(false)
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const body = {
      groupName
    }
    if (groupName.trim() === '') {
      setGroupError("Group name cannot be empty");
      setTimeout(() => {
        setGroupError("")
      }, 3000);
      return;
    } else {
      const response = await dispatch(createGroup(body))
      
      if (response) {
        setModalOpen(false)
      }
    }
  }

  const handleSubmitLink = async (event: any) => {
    event.preventDefault();
    if (joinLink.trim() === '') {
      setLinkError("Link cannot be empty");
      setTimeout(() => {
        setLinkError("")
      }, 3000);
      return;
    } else {
      const splittedValue = joinLink.split('/').reverse()
      console.log("🚀 ~ file: UserCommunity.tsx:84 ~ handleSubmitLink ~ splittedValue:", splittedValue)
      const chatId = splittedValue[0]
      const response: any = await dispatch(joinGroup({ chatId }))
      console.log("🚀 ~ file: UserCommunity.tsx:87 ~ handleSubmitLink ~ response:", response)
      if (response.error) {
        setLinkError(response.payload);
        setTimeout(() => {
          setLinkError("")
        }, 3000);
        return;
      }
      setPlusRotated(!isPlusRotated);
      setModalOpen(false);
    }
  }

  const changeTime = (date: any) => {
    const formattedDate = format(date, 'dd MMM EEE');
    return formattedDate
  }

  const sendMessages = async () => {
    // Send the message here
    // e.preventDefault()

    if (messageText.trim() === '') {
      toast.error("Message is empty");
      return;
    }
    const content = messageText;
    const res = await dispatch(sendMessage({ content, chatId }))
    console.log("🚀 ~ file: UserCommunity.tsx:76 ~ sendMessages ~ res:", res)
    const data = res.payload.message;
    console.log("🚀 ~ file: UserCommunity.tsx:139 ~ sendMessages ~ data[0].sentAt:", data)
    socket.emit("new message",(data))
    // setSelectedGroupMessages(res.payload?.reverse())
    setMessageText("")
    dispatch(listGroups())

  };

  const handleCopyClick = () => {
    const link = `community/${chatId}`
    navigator.clipboard.writeText(link)
      .then(() => {
        console.log('Link copied successfully!');
        toast.success('Link copied successfully!')
      })
      .catch((err) => {
        console.error('Failed to copy link:', err);
      });
  }


  return (
    <>
      <div>
        <Popover
          id={idPop}
          open={open}
          anchorEl={anchorEl}
          onClose={handleCloseAnchor}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Typography sx={{ p: 2 }}>
            <div className="flex flex-col gap-2">
              <div onClick={handleCopyClick} className="border-2 p-6 cursor-pointer">
                Click to copy the group link
              </div>
              <div className="border-2 p-6 cursor-pointer">
                Edit Group Name
              </div>
            </div>
          </Typography>
        </Popover>
      </div>
      <div className="pt-16 h-screen">
        {
          isModalOpen && (
            <Modal open={isModalOpen} handleClose={handleClose}>
              <div className="flex flex-col gap-10">
                <form onSubmit={(event) => handleSubmit(event)}>
                  <div className="w-full flex flex-col gap-4 relative">
                    <h1 className="text-white text-xl">Create Group</h1>
                    <input
                      name="groupName"
                      value={groupName}
                      onChange={(event) => setGroupName(event.target.value)}
                      type="text"
                      placeholder="Enter the group name"
                      className="w-full h-12 px-4 rounded-lg bg-white focus:outline-none"
                    />
                    {groupError && <p className="text-red-500 ">{groupError}
                    </p>}
                    <button type="submit" className="bg-red-500 rounded-md text-white py-3">Sumbit</button>
                    <CgCloseO onClick={() => {
                      setPlusRotated(!isPlusRotated);
                      setModalOpen(false);
                    }} className="absolute -top-4 text-3xl -right-5 cursor-pointer text-white z-10" />
                  </div>
                </form>
                <form onSubmit={(event) => handleSubmitLink(event)}>
                  <div className="w-full flex flex-col gap-4 relative">
                    <h1 className="text-white text-xl">Join Group</h1>
                    <input
                      name="groupName"
                      value={joinLink}
                      onChange={(event) => setJoinLink(event.target.value)}
                      type="text"
                      placeholder="Enter the group link"
                      className="w-full h-12 px-4 rounded-lg bg-white focus:outline-none"
                    />
                    {linkError && <p className="text-red-500 ">{linkError}
                    </p>}
                    <button type="submit" className="bg-red-500 rounded-md text-white py-3">Sumbit</button>
                  </div>

                </form>
              </div>
            </Modal>
          )
        }

        <div className=" w-full flex gap-2  h-full">
          <div className=" w-1/5 flex flex-col overflow-x-hidden gap-0.5 pe-2 overflow-y-scroll">
            {
              groups?.map((data: any, index: any) => (
                <div key={index} onClick={() => handleGroupSelect(data._id, data.groupName)} className="bg-gradient-to-r from-amber-400 border border-yellow-500 hover:text-white hover:bg-yellow-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent rounded text-white flex justify-between items-center cursor-pointer p-6 px-10">
                  {data.groupName}
                  {
                    chatId == data._id ? (
                      <BsThreeDotsVertical onClick={(e: any) => handleClick(e)} className="text-white" />

                    ) : (
                      ""
                    )
                  }
                </div>
              ))
            }
            <div className="absolute flex cursor-pointer rounded-full items-cente bottom-0   ">
              <div className=" text-5xl text-white "
                onClick={() => {
                  setPlusRotated(!isPlusRotated);
                  setModalOpen(true);
                }}>

                <AiFillPlusCircle className={`${isPlusRotated ? "rotate-45 " : ""} transition-transform duration-200`} />
              </div>
            </div>
          </div>
          <style>
            {
              `::-webkit-scrollbar {
      width: 8px;
    }

    ::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    ::-webkit-scrollbar-thumb {
      background: #888;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: #555;
    }`
            }
          </style>
          <div className=" w-full bg-gray-900">
            <div className=" relative rounded-md h-full w-full">
              {
                selectedGroup === "" ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <img className="w-1/2" src={chatSvg} alt="" />
                  </div>
                ) : (
                  <>
                    <div className="absolute top-0 w-full flex gap-1 justify-start bg-black border border-gray-600 z-10 p-4">
                      <h1 className=" font-bold bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-500 bg-clip-text text-transparent">{selectedGroup}</h1>
                    </div>
                    <div className="h-5/6 w-full pt-14 overflow-y-scroll scrollBar p-4" ref={messageBoxRef}>
                      {
                        selectedGroupMessages.length == 0 ? (
                          <>
                            <h1 className="flex items-center justify-center h-full text-white text-2xl font-semibold">No Messages Found</h1>
                            {/* <img src={noMessage} alt="" /> */}
                          </>
                        ) : (
                          <>
                            {
                              selectedGroupMessages.map((message: any, index: number) => (
                                <div key={index} className={`py-4 flex flex-col ${message.sender === id ? "items-end" : "items-start"}`}>
                                  <div className="flex items-center">
                                  </div>
                                  <div className="flex items-center gap-2 ">
                                    {
                                      message.from === "sender" ? (
                                        <div className="rounded-full flex items-center justify-center bg-slate-500 w-8 h-8">
                                          <h1>{message.img}</h1>
                                        </div>
                                      ) : (
                                        ""
                                      )
                                    }
                                    {
                                      message.sender === id ? (
                                        <>
                                          <div className="chat chat-end">
                                            <div className="chat-bubble">{message.content}</div>
                                          </div>
                                        </>
                                      ) : (
                                        <>
                                          <div className="chat chat-start">
                                            <div className="chat-bubble chat-bubble-primary">{message.content} </div>
                                          </div>
                                        </>
                                      )
                                    }
                                  </div>
                                  <span className="text-gray-400 text-xs">{changeTime(message.sentAt)}</span>
                                </div>
                              ))
                            }
                          </>
                        )
                      }
                    </div>
                    <div className="absolute bottom-0 w-full flex gap-1 items-end bg-gray-800 p-4">
                      <div className="w-10/12">
                        <input
                          type="text"
                          placeholder="Type your message here..."
                          className="w-full h-12 px-4 bg-transparent rounded-lg border border-yellow-500 text-white focus:outline-none"
                          value={messageText}
                          onChange={(event) => setMessageText(event.target.value)}
                          onKeyDown={(event) => {
                            if (event.key === "Enter") {
                              sendMessages();
                            }
                          }}
                        />
                      </div>
                      <div className="w-2/12">
                        <button onClick={sendMessages} className="w-full h-12 hover:bg-yellow-500 border text-yellow-500 hover:text-white border-yellow-500 rounded flex justify-center items-center">
                          <FaPaperPlane className="  text-3xl" />
                        </button>
                      </div>
                    </div>
                  </>
                )
              }
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default UserCommunity