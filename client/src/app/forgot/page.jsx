'use client'
import React, { useState } from 'react'
import Forgot from '@/components/ForgotPassword'
import NewPassword from '@/components/CreateNewPassword'
import supabase from '@/data/supabase'

const ForgotPassword = () => {
  const [isSessionAvailable, setIsSessionAvailable] = useState(false);
  const checkSession = async () => {
    const { data,error } = await supabase.auth.getSession();
    if(data.session!==null){
        setIsSessionAvailable(true);
    }
   
  }
  checkSession();

  return (
    <>
      {isSessionAvailable ? (
        <NewPassword />
      ) : (
        <Forgot />
      )}
    </>
  );
};

export default ForgotPassword;
