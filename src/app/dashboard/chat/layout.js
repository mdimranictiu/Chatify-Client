// app/dashboard/layout.js
import Link from 'next/link';
import { IoIosSearch } from "react-icons/io";

export default function chatLayout({ children }) {
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
    placeholder="Search users"
    className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-200"
  />
</div>
<div
  className="py-10 overflow-x-auto flex gap-2"
  style={{
    scrollbarWidth: 'none',     // Firefox
    msOverflowStyle: 'none',    // IE 10+
    display: 'flex',
    flexDirection: 'row',
  }}
>
  <style>
    {`
      div::-webkit-scrollbar {
        display: none;
      }
    `}
  </style>

  {/* Repeatable Item */}
  {[...Array(10)].map((_, i) => (
    <div
      key={i}
      className="w-16 h-16 rounded-sm relative items-center bg-gray-300 shrink-0"
    >
      <div className="w-11 h-11 mx-auto absolute transform -translate-y-4 translate-x-2 bg-red-400 rounded-full" />
      <h6 className="absolute mt-8 px-2 font-semibold text-green-500 text-center">
        Online
      </h6>
    </div>
  ))}
</div>

<div>
  <h2 className='text-xl font-bold py-2'>Recent</h2>
  {/* Contacts recent */}
  <div className='overflow-y-auto h-84 flex flex-col gap-1 ' style={{ scrollbarWidth: 'none', }}>
    {/*  */}
  <div className='bg-white duration-300 transition rounded-sm hover:bg-[#E6EBF5] flex items-center justify-between p-2'>
     <div className='flex flex-row gap-3 items-center'>
     <div className='w-12 h-12 relative bg-red-500 rounded-full'>
      <div className='w-2 h-2 absolute transform translate-x-10 translate-y-8 bg-green-400 rounded-full'></div>
     </div>
     <div className='flex flex-col '>
      <h2>User Name</h2>
      <p>I am Avaible Now</p>
     </div>
     </div>
     <p>5 mins ago</p>
    </div>
    {/*  */}
  <div className='bg-white duration-300 transition rounded-sm hover:bg-[#E6EBF5] flex items-center justify-between p-2'>
     <div className='flex flex-row gap-3 items-center'>
     <div className='w-12 h-12 relative bg-red-500 rounded-full'>
      <div className='w-2 h-2 absolute transform translate-x-10 translate-y-8 bg-green-400 rounded-full'></div>
     </div>
     <div className='flex flex-col '>
      <h2>User Name</h2>
      <p>I am Avaible Now</p>
     </div>
     </div>
     <p>5 mins ago</p>
    </div>
  <div className='bg-white duration-300 transition rounded-sm hover:bg-[#E6EBF5] flex items-center justify-between p-2'>
     <div className='flex flex-row gap-3 items-center'>
     <div className='w-12 h-12 relative bg-red-500 rounded-full'>
      <div className='w-2 h-2 absolute transform translate-x-10 translate-y-8 bg-green-400 rounded-full'></div>
     </div>
     <div className='flex flex-col '>
      <h2>User Name</h2>
      <p>I am Avaible Now</p>
     </div>
     </div>
     <p>5 mins ago</p>
    </div>
  <div className='bg-white duration-300 transition rounded-sm hover:bg-[#E6EBF5] flex items-center justify-between p-2'>
     <div className='flex flex-row gap-3 items-center'>
     <div className='w-12 h-12 relative bg-red-500 rounded-full'>
      <div className='w-2 h-2 absolute transform translate-x-10 translate-y-8 bg-green-400 rounded-full'></div>
     </div>
     <div className='flex flex-col '>
      <h2>User Name</h2>
      <p>I am Avaible Now</p>
     </div>
     </div>
     <p>5 mins ago</p>
    </div>
  <div className='bg-white duration-300 transition rounded-sm hover:bg-[#E6EBF5] flex items-center justify-between p-2'>
     <div className='flex flex-row gap-3 items-center'>
     <div className='w-12 h-12 relative bg-red-500 rounded-full'>
      <div className='w-2 h-2 absolute transform translate-x-10 translate-y-8 bg-green-400 rounded-full'></div>
     </div>
     <div className='flex flex-col '>
      <h2>User Name</h2>
      <p>I am Avaible Now</p>
     </div>
     </div>
     <p>5 mins ago</p>
    </div>
  <div className='bg-white duration-300 transition rounded-sm hover:bg-[#E6EBF5] flex items-center justify-between p-2'>
     <div className='flex flex-row gap-3 items-center'>
     <div className='w-12 h-12 relative bg-red-500 rounded-full'>
      <div className='w-2 h-2 absolute transform translate-x-10 translate-y-8 bg-green-400 rounded-full'></div>
     </div>
     <div className='flex flex-col '>
      <h2>User Name</h2>
      <p>I am Avaible Now</p>
     </div>
     </div>
     <p>5 mins ago</p>
    </div>
  <div className='bg-white duration-300 transition rounded-sm hover:bg-[#E6EBF5] flex items-center justify-between p-2'>
     <div className='flex flex-row gap-3 items-center'>
     <div className='w-12 h-12 relative bg-red-500 rounded-full'>
      <div className='w-2 h-2 absolute transform translate-x-10 translate-y-8 bg-green-400 rounded-full'></div>
     </div>
     <div className='flex flex-col '>
      <h2>User Name</h2>
      <p>I am Avaible Now</p>
     </div>
     </div>
     <p>5 mins ago</p>
    </div>
  <div className='bg-white duration-300 transition rounded-sm hover:bg-[#E6EBF5] flex items-center justify-between p-2'>
     <div className='flex flex-row gap-3 items-center'>
     <div className='w-12 h-12 relative bg-red-500 rounded-full'>
      <div className='w-2 h-2 absolute transform translate-x-10 translate-y-8 bg-green-400 rounded-full'></div>
     </div>
     <div className='flex flex-col '>
      <h2>User Name</h2>
      <p>I am Avaible Now</p>
     </div>
     </div>
     <p>5 mins ago</p>
    </div>
  <div className='bg-white duration-300 transition rounded-sm hover:bg-[#E6EBF5] flex items-center justify-between p-2'>
     <div className='flex flex-row gap-3 items-center'>
     <div className='w-12 h-12 relative bg-red-500 rounded-full'>
      <div className='w-2 h-2 absolute transform translate-x-10 translate-y-8 bg-green-400 rounded-full'></div>
     </div>
     <div className='flex flex-col '>
      <h2>User Name</h2>
      <p>I am Avaible Now</p>
     </div>
     </div>
     <p>5 mins ago</p>
    </div>
  <div className='bg-white duration-300 transition rounded-sm hover:bg-[#E6EBF5] flex items-center justify-between p-2'>
     <div className='flex flex-row gap-3 items-center'>
     <div className='w-12 h-12 relative bg-red-500 rounded-full'>
      <div className='w-2 h-2 absolute transform translate-x-10 translate-y-8 bg-green-400 rounded-full'></div>
     </div>
     <div className='flex flex-col '>
      <h2>User Name</h2>
      <p>I am Avaible Now</p>
     </div>
     </div>
     <p>5 mins ago</p>
    </div>
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
