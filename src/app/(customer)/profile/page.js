"use client";
import ProfileCard from '@/Components/Customer/profile/ProfileCard'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

 function ProfilePage() {
  const router=useRouter();
  const [isCheckingAuth, setIsCheckingAuth]=useState(true);

useEffect(() => {
  const token = sessionStorage.getItem("omx_admin_token");

  if (!token) {
    router.replace("/");
    return;
  }

  const frame = requestAnimationFrame(() => {
    setIsCheckingAuth(false);
  });

  return () => cancelAnimationFrame(frame);
}, [router]);
  return (
    <div>
        <ProfileCard/>
      
    </div>
  )
}

export default ProfilePage
