"use client"
import React from "react";
import { useForm } from "react-hook-form";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Login Data:", data);
  };

  return (
    <div className="flex flex-col justify-center min-h-screen items-center bg-gray-100">
      <h2 className="text-center text-3xl py-5 font-bold text-gray-800">Chatify</h2>
      
      <div className="flex flex-col items-center gap-2">
        <h3 className="text-2xl font-semibold">Register</h3>
        <p className="text-gray-600">Register in to continue to Chatify</p>
      </div>

      <div className="bg-white my-5 shadow-2xl rounded-lg w-full max-w-sm p-10">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            {/* Name Field */}
            <label className="text-gray-700 font-medium">Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#7169EF]"
            placeholder="Enter your Name"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

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
            <a href="#" className="text-blue-500 hover:underline text-sm">Forgot password?</a>
          </div>

          <button type="submit" className="btn bg-[#7169EF] text-white rounded-lg p-2 hover:bg-[#5b53e0] transition">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
