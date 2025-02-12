"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function Signup() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-sky-800 to-indigo-950">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-3xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-blue-700">Sign Up</h2>

        <div>
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
            placeholder="Enter your password"
          />
        </div>

        <button className="w-full py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
          Sign Up
        </button>

        <div className="flex items-center justify-center space-x-4 mt-4">
          <button
            onClick={() => signIn("google")}
            className="w-1/2 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
          >
            Login with Google
          </button>
          <button
            onClick={() => signIn("github")}
            className="w-1/2 py-2 text-white bg-gray-800 rounded-lg hover:bg-gray-900"
          >
            Login with GitHub
          </button>
        </div>
      </div>
    </div>
  );
}
