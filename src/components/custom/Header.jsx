import React, { useEffect,useState } from 'react'
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import {googleLogout} from '@react-oauth/google'
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import axios from 'axios'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

function Header() {
  const navigate=useNavigate();
  const GetUserProfile = (tokenInfo) => {
    axios
      .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: 'application/json',
        },
      })
      .then((res) => {
        console.log(res);
        localStorage.setItem('user',JSON.stringify(res.data));
        setOpenDialog(false)
        window.location.reload();
      })
      .catch((err) => {
        console.error("Error fetching user profile:", err);
      });
  };
const user=JSON.parse(localStorage.getItem('user'));
const [openDialog,setOpenDialog]=useState(false);
const login=useGoogleLogin({onSuccess:(result)=>GetUserProfile(result),onError:(error)=>console.log(error)})
  return (
    <div className='p-2 shadow-sm flex justify-between items-center'>
      <Link to={"/"}>
     <img className='h-[50px]' src="/reshot-icon-travel-calendar-79ZK3GCWUT.svg"/></Link>
     <div>{user?<div className='flex items-center gap-2'>
      <Link to={'/create-trip'}>
      <Button variant="outline" className='rounded-full'>Create Trip</Button></Link>
      <Link to={'/my-trips'}>
      <Button variant="outline" className='rounded-full'>My Trips</Button></Link>
      <Popover>
  <PopoverTrigger><img src={user?.picture} className='h-[35px] w-[35px] rounded-full bg-white' alt="" /></PopoverTrigger>
  <PopoverContent ><h2 className='cursor-pointer' onClick={()=>{googleLogout();localStorage.clear();navigate('/');}}>Logout</h2></PopoverContent>
</Popover>
     </div>:
      <Button onClick={()=>{setOpenDialog(true)}}>Sign in</Button>
      }
     </div>
      <Dialog open={openDialog}>
       <DialogContent>
         <DialogHeader>
           <DialogTitle></DialogTitle>
           <DialogDescription>
           <img className='h-[50px]' src="/reshot-icon-travel-calendar-79ZK3GCWUT.svg"/>
          <h2 className='font-bold text-lg mt-7'>Sign In With Google</h2>
          <p>Sign In with the app securly with Google authentication securely</p>
          <Button onClick={login} className='w-full mt-5 flex gap-4 items-center'><FcGoogle className='h-7 w-7' />
          Sign In</Button>
           </DialogDescription>
         </DialogHeader>
       </DialogContent>
     </Dialog>
    </div>
  )
}

export default Header;
