"use client"
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { IoIosSend } from "react-icons/io";

export default function page({params}) {
  const [user,setUser]=useState()
  const [receiver,setReceiver]=useState()
  const [messages,setMessages]=useState()
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email;
  const id= params?.id
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
            console.log("Fetched Messages:", response.data);
          } else {
            console.log("No messages found");
          }
        } catch (error) {
          console.log("Messages fetching error:", error.message);
        }
      };
      fetchMessage();
    }
  }, [user?._id, receiver?._id]);
  
  console.log("message",messages)
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

  return (
    <div className='relative'>
      <div className='border-b-2 py-2 w-full  text-gray-400 mx-auto'>
        <div className='flex flex-row gap-2 items-center'>
          <div className='w-12 h-12 rounded-full bg-gray-500 '>
                     <Image
              src={receiver?.profilePicture }
              alt={receiver?.name || 'User'}
              width={50} height={50}
              className="rounded-full object-cover"
            />
          </div>
          <h2>{receiver?.name || "Unknown"} </h2>
        </div>
      </div>
      <div className='h-110 overflow-y-auto' style={{ scrollbarWidth: 'none', }}>
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
             {user?._id===message?.senderId ? user?.name : receiver?.name}
              <time className="text-xs opacity-50">{ConvertLocalDate(message?.timestamp)}</time>
            </div>
            <div className="chat-bubble">{message?.text}</div>
      
          </div>
          )
        })}


      </div>
      
<div className='border transform translate-y-20 absolute w-[80%]  p-5 rounded-sm mx-[10%] border-gray-400'>
<div className='flex  justify-between gap-5 items-center'>
  <input type="text" placeholder='Write Message' className='bg-[#E6EBF5] outline-none px-5 w-full h-16' name="" id="" />
  <div>
  <IoIosSend className='text-3xl text-[#7169EF]' title='send message'/>

  </div>
</div>
</div>
    </div>
  )
}
