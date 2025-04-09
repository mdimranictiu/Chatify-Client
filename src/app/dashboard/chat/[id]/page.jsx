"use client"
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import { IoIosSend } from "react-icons/io";

import { io } from 'socket.io-client';

export default function page({params}) {
  const [user,setUser]=useState()
  const [receiver,setReceiver]=useState()
  const [messages,setMessages]=useState()
  const { data: session, status } = useSession();
  const [message,setMessage]=useState("")
  const [fetch,refetch]=useState(false)
  // const [socket,setSocket]=useState(null)
  const messagesEndRef = useRef(null);

  const userEmail = session?.user?.email;
  const id= params?.id
  const [socket,Setsocket]=useState(null)
  console.log(id)
  useEffect(()=>{
    const UserFecth=async()=>{
    try {
      const response= await axios.post('http://localhost:5000/auth/find/Profile/',{email:userEmail})
if(response?.data){
  setUser(response?.data)
}
    }
    catch (error) {
      console.log(error)
    }}
    UserFecth();
  },[userEmail])


  // set socket
  useEffect(()=>{
    const newSocket= io('http://localhost:5000');
    Setsocket(newSocket);
   
    newSocket.on('receiveMessage',(newMessage)=>{
      setMessages((preMessage)=>[...preMessage,newMessage])
    })
    if (userEmail) {
      newSocket.emit('join', user?._id);
    }
    return ()=> newSocket.close()
  },[receiver?._id])
  // fetch receiver info
  useEffect(()=>{
    const ReceiverFecth=async()=>{
    try {
      const response= await axios.post('http://localhost:5000/auth/find/receiver/',{_id:id})
if(response?.data){
  setReceiver(response?.data)
}
    }
    catch (error) {
      console.log(error)
    }}
    ReceiverFecth();
  },[id])
  console.log("sender",user)
  console.log('receiver',receiver)
  //fetch all messages between sender & receiver

  useEffect(() => {
    if (user?._id && receiver?._id) {
      const fetchMessage = async () => {

        try {
          const response = await axios.post('http://localhost:5000/api/get/messages', {
            senderId: user._id,
            receiverId: receiver._id
          });
          if (response?.data) {
            setMessages(response.data);
          } else {
            console.log("No messages found");
          }
        } catch (error) {
          console.log("Messages fetching error:", error.message);
        }
      };
      fetchMessage();
      refetch(false)
    }
  }, [user?._id, receiver?._id,fetch]);
  
  //local date converter
  const ConvertLocalDate=(time)=>{
    const date= new Date(time)
    const localDate= date.toLocaleString('en-Us',{
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
    return localDate;
  }
  // handleSendMessage

  const handleSendMessage=async(e)=>{
   e.preventDefault();
   const form=e.target;
   const message= form.msg.value;
   
   if(socket && message){
    const messageData={
      text:message,senderId: user?._id,receiverId: receiver?._id
    }
    socket.emit('send_message',messageData);
    setMessages((pre)=>[...pre,{ ...messageData, timestamp: new Date().toISOString() }])
    setMessage('')
   }
  //  try {
  //   const response= await axios.post('http://localhost:5000/api/send/message',{text:message,senderId:user?._id,receiverId:receiver?._id})
  //   if(response?.data){
  //     console.log('send Message successfully')
  //     refetch(true)
  //   }
  //  } catch (error) {
  //   console.log(error?.message)
  //  }
  }


  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]); 

  return (
    <div className='relative'>
      <div className='border-b-2 py-2 w-full  text-gray-400 mx-auto'>
        <div className='flex flex-row gap-2 items-center'>
          <div className='w-12 h-12 rounded-full bg-gray-500 '>
                     <img 
              src={receiver?.profilePicture }
              alt={receiver?.name || 'User'}
              className="rounded-full w-full h-full object-cover"
            />
          </div>
          <h2>{receiver?.name || "Unknown"} </h2>
        </div>
      </div>
      <div className='h-110 overflow-y-auto py-5' style={{ scrollbarWidth: 'none', }}>
        {messages?.map((message,index)=>{
          return(
            <div key={index} className={`chat ${message?.senderId===user?._id ? "chat-end":"chat-start"}`}>
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Profile Image"
                  src={message?.senderId===user?._id ? user?.profilePicture : receiver?.profilePicture} />
              </div>
            </div>
            <div className="chat-header">
             {/* {user?._id===message?.senderId ? user?.name : receiver?.name} */}
              <time className="text-xs opacity-50">{ConvertLocalDate(message?.timestamp)}</time>
            </div>
            <div className="chat-bubble">{message?.text}</div>
      
          </div>
          )
        })}

      <div ref={messagesEndRef} ></div>
      </div>
      
<div className='border my-2 absolute w-[80%]  p-5 rounded-sm mx-[10%] border-gray-400'>
<form onSubmit={handleSendMessage}>
<div className='flex  justify-between gap-5 items-center'>
  <input type="text" placeholder='Write Message' value={message}
  onChange={(e) => setMessage(e.target.value)} className='bg-[#bbbfc5] outline-none px-5 w-full h-16' name="msg"  />
  <div>
  <button type='submit'><IoIosSend className='text-3xl text-[#7169EF]'  title='send message'/></button>

  </div>
</div>
</form>
</div>
    </div>
  )
}
