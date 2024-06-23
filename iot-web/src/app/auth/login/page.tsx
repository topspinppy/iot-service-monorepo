'use client'

import GuestGuard from "@/guards/GuestGuard";
import AuthenticationModule from "@/modules/Authentication/AuthenticationModule";

export default function Login() {
  return (
    <GuestGuard>
      <div className="flex justify-center items-center h-screen w-full">
        <AuthenticationModule />
      </div>
    </GuestGuard>
  )
}
