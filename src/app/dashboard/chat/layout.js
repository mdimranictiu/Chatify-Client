// app/dashboard/layout.js
"use client"
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IoIosSearch } from "react-icons/io";

export default function chatLayout({ children }) {
  const { data: session, status } = useSession();
  const [onlineUsers,setOnlineUsers]=useState()
  const [recentContacts,setrecentContacts]=useState()
  const [recent,setRecent]=useState()
  const [user,setUser]=useState()
  const [search,SetSearch]=useState("")
  const userEmail = session?.user?.email;
  const router=useRouter()
  console.log(userEmail)
  useEffect(()=>{
    const fetchOnlineUsers=async()=>{
      try {
        const response= await axios.post('http://localhost:5000/api/find/onlineUsers',{email: userEmail})
      if(response.data){
        setOnlineUsers(response?.data)
      }
      } catch (error) {
        console.log(error)
      }
     
    }
    fetchOnlineUsers()
  },[userEmail])
  // useEffect(()=>{
  //   const fetchrecentContacts=async()=>{
  //     try {
  //       const response= await axios.post('http://localhost:5000/api/find/recent/contacts',{email: userEmail})
  //     if(response.data){
  //       setrecentContacts(response?.data)
  //     }
  //     } catch (error) {
  //       console.log(error)
  //     }
     
  //   }
  //   fetchrecentContacts()
  // },[userEmail])
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
  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const response = await axios.post(
          `http://localhost:5000/api/find/recent?search=${search}`,
          { userId: user?._id }
        );
        if (response.data) {
          setrecentContacts(response.data);
        }
      } catch (error) {
        console.log("Fetch error:", error);
      }
    };
  
    if (user?._id) {
      fetchRecent();
    }
  }, [user?._id, search]);
  
  console.log(recentContacts)
  //handleChatPage
  const handleChatPage=(id)=>{
    router.push(`/dashboard/chat/${id}`);
  }
  console.log(search)
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-112 bg-[#E6EBF5]  text-black p-6 space-y-4">
        <h2 className="text-xl font-bold mb-4">Chats</h2>
        <div>
        <div className="relative w-full">
  <IoIosSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
  <input
    type="text"
    placeholder="Search users" onChange={(e)=>SetSearch(e.target.value)}
    className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-200"
  />
</div>
<div className="py-6 px-2 overflow-x-auto flex gap-3 no-scrollbar">
  {onlineUsers?.map((user, index) => (
    <div
      key={index}
      className="w-20 flex-shrink-0 flex flex-col items-center relative bg-white hover:bg-[#f1f5fb] rounded-lg shadow-sm transition-all duration-300 p-2"
    >
      <div className="w-12 h-12 relative">
        <Image
          src={user?.profilePicture || '/default-avatar.png'}
          alt={user?.username || 'User'}
          width={48}
          height={48}
          className="rounded-full object-cover w-full h-full"
        />
        <div className="w-3 h-3 bg-green-500 rounded-full ring-2 ring-white absolute bottom-0 right-0"></div>
      </div>
      <p className="mt-2 text-[11px] text-green-600 font-medium text-center">
        Online
      </p>
    </div>
  ))}
</div>


<div>
  <h2 className='text-xl font-bold py-2'>Recent</h2>
  {/* Contacts recent */}
  <div className='overflow-y-auto min-h-3/4 flex flex-col gap-1 ' style={{ scrollbarWidth: 'none', }}>
    {/*  */}
    {recentContacts?.map((recentContact, index) => (
  <div
    key={index} onClick={()=>handleChatPage(recentContact?._id)}
    className="bg-white hover:bg-[#f1f5fb] transition duration-300 rounded-lg shadow-sm hover:shadow-lg flex items-center justify-between p-4 mb-2"
  >
    <div className="flex items-center gap-4">
      <div className="relative w-12 h-12">
        <Image
          src={recentContact?.profilePicture || "/default-avatar.png"}
          alt={recentContact?.username || "User"}
          width={48}
          height={48}
          className="rounded-full object-cover w-full h-full"
        />
        <div className={`w-3 h-3 ${recentContact?.isOnline? "bg-green-400":"bg-red-400"}  rounded-full absolute bottom-0 right-0 ring-2 ring-white`} />
      </div>

      <div className="flex flex-col">
        <h2 className="text-sm font-semibold text-gray-800">
          {recentContact?.name || "Unknown"}
        </h2>
        <p className="text-xs text-gray-500">{recentContact?.isOnline ? "I am available right now":"Offline now, leave a message!"}</p>
      </div>
    </div>

    <p className="text-xs text-gray-400">5 mins ago</p>
  </div>
))}


  </div>

</div>

        </div>
        {/* <nav className="flex flex-col gap-3">
          <Link href="/dashboard/chat" className="hover:text-yellow-400">💬 Chat</Link>
          <Link href="/dashboard/profile" className="hover:text-yellow-400">👤 Profile</Link>
          <Link href="/dashboard/settings" className="hover:text-yellow-400">⚙️ Settings</Link>
          <Link href="/dashboard/group" className="hover:text-yellow-400">👥 Group</Link>
          <Link href="/dashboard/contacts" className="hover:text-yellow-400">📇 Contacts</Link>
        </nav> */}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-white">
        {children}
      </main>
    </div>
  );
}
