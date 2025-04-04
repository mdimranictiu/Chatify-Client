"use client"
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const [error,setError]=useState("")
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const router=useRouter()

  const onSubmit = async(data) => {
    const email= data?.email;
    const password= data?.password
    const result= await signIn("credentials",{
    redirect: false,
    email,password
    })
    if(result?.error){
      setError(result.error);
      setTimeout(() => {
        setError(""); 
      }, 3000);
    }
    else{
      router.push('/')
    }
  };

  return (
    <div className="flex flex-col justify-center min-h-screen items-center bg-gray-100">
      <h2 className="text-center text-3xl py-5 font-bold text-gray-800">Chatify</h2>
      
      <div className="flex flex-col items-center gap-2">
        <h3 className="text-2xl font-semibold">Login</h3>
        <p className="text-gray-600">Log in to continue to Chatify</p>
      </div>

      <div className="bg-white my-5 shadow-2xl rounded-lg w-full max-w-sm p-10">
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Email Field */}
          <label className="text-gray-700 font-medium">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#7169EF]"
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

          {/* Password Field */}
          <label className="text-gray-700 font-medium">Password</label>
          <input
            type="password"
            {...register("password", { required: "Password is required", minLength: 6 })}
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#7169EF]"
            placeholder="Enter your password"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

          <div>
            <Link href="/reset-password" className="text-blue-500 hover:underline text-sm">Forgot password?</Link>
          </div>

          <button type="submit" className="btn bg-[#7169EF] text-white rounded-lg p-2 hover:bg-[#5b53e0] transition">
            Login
          </button>
        </form>
        <div>
          <p className="text-center py-2">Are you new? <Link className="font-bold" href='/register'>
          Register Now</Link></p>
        </div>
      </div>
    </div>
  );
}
