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
  const [Contacts,setContacts]=useState()
  const [user,setUser]=useState()
  const userEmail = session?.user?.email;
  const [search,SetSearch]=useState('')
  const router=useRouter()
  console.log(userEmail)

  
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
  useEffect(()=>{
    const fetchrecent=async()=>{
      try {
        const response= await axios.post(`http://localhost:5000/api/find/all/contacts?search=${search}`,{email:userEmail})
      if(response.data){
        setContacts(response?.data)
      }
      } catch (error) {
        console.log(error)
      }
     
    }
    if(user?._id){
      fetchrecent()
    }
  },[user?._id,search])
  console.log(Contacts)
  console.log(search)
  //handleChatPage
  const handleChatPage=(id)=>{
    router.push(`/dashboard/chat/${id}`);
  }
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-[90%] mx-auto bg-[#E6EBF5]  text-black p-6 space-y-4">
        <h2 className="text-xl text-center font-bold mb-4">Contacts</h2>
        <div>
        <div className="relative w-full">
  <IoIosSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
  <input
    type="text"
    placeholder="Search Contacts" onChange={(e)=>SetSearch(e.target.value)}
    className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-200"
  />
</div>

<div>
  {/* Contacts recent */}
  <div className='overflow-y-auto my-2 h-96 sm:h-80 md:h-96 lg:h-[30rem] flex flex-col gap-1 ' style={{ scrollbarWidth: 'none', }}>
    {/*  */}
    {Contacts?.map((contact, index) => (
  <div
    key={index} onClick={()=>handleChatPage(contact?.id)}
    className="bg-white hover:bg-[#f1f5fb] transition duration-300 rounded-lg shadow-sm hover:shadow-lg flex items-center justify-between p-4 mb-2"
  >
    <div className="flex items-center gap-4">
      <div className="relative w-12 h-12">
        <Image
          src={contact?.profilePicture || "/default-avatar.png"}
          alt={contact?.username || "User"}
          width={48}
          height={48}
          className="rounded-full object-cover w-full h-full"
        />
        <div className={`w-3 h-3 ${contact?.isOnline? "bg-green-400":"bg-red-400"}  rounded-full absolute bottom-0 right-0 ring-2 ring-white`} />
      </div>

      <div className="flex flex-col">
        <h2 className="text-sm font-semibold text-gray-800">
          {contact?.name || "Unknown"}
        </h2>
        <p className="text-xs text-gray-500">{contact?.isOnline ? "I am available right now":"Offline now, leave a message!"}</p>
      </div>
    </div>
  </div>
))}


  </div>

</div>

        </div>

      </aside>
    </div>
  );
}
