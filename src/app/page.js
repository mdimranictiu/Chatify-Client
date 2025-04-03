"use client";
import { signOut, useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <p>User not logged in, <a href="/login">login</a></p>;
  }

  return (
    <div>
      <h1>Welcome, {session.user?.name}!</h1>
      <p>Email: {session.user?.email}</p>
      <button
      onClick={() => signOut()}
      className="bg-red-600 my-5 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
    >
      Log Out
    </button>    </div>
  );
}
