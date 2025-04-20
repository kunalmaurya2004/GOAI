import React,{ useEffect, useState } from 'react'
import axios from 'axios'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { Input } from '../components/ui/input'
import { AI_PROMPT, SelectBudgetOptions } from '../constants/options'
import { SelectTravelesList } from '../constants/options'
import { Button } from '../components/ui/button'
import { toast } from "sonner"
import { chatSession } from '../service/AIModal'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useGoogleLogin } from '@react-oauth/google';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../service/firebaseConfig.jsx';
import { useNavigate } from 'react-router-dom';
function CreateTrip() {
  const [loading,setLoading]=useState(false);
  const [place,setPlace]=useState();
  const [formData,setFormData]=useState([]);
  const [openDialog,setOpenDialog]=useState(false);
  const navigate=useNavigate();
const handleInputChange=(name,value)=>{

  setFormData({
    ...formData,[name]:value
  })
}
useEffect(()=>{
console.log(formData);
},[formData])
const login=useGoogleLogin({onSuccess:(result)=>GetUserProfile(result),onError:(error)=>console.log(error)})
const onGenerateTrip=async()=>{
  const user=localStorage.getItem('user');
  if(!user){
    setOpenDialog(true);
    return;
  }
  if (
    !formData || // Check if formData itself is undefined or null
    !formData.budget || // Check if budget is falsy (null, undefined, 0, or "")
    !formData.traveler ||
    !formData.noOfDays ||
    !formData.location ||
    formData.noOfDays >= 6 || formData.noOfDays==0 // Enforce that noOfDays must be less than 6
  ) {
    toast("Please input all the details and ensure the number of days is less than 6");
    return;
  }
  
  setLoading(true);
  const FINAL_PROMPT=AI_PROMPT
  .replace('{location}',formData?.location)
  .replace('{totalDays}',formData?.noOfDays)
  .replace('{traveler}',formData?.traveler)
  .replace('{budget}',formData?.budget)
  .replace('{totalDays}',formData?.noOfDays)
  const result= await chatSession.sendMessage(FINAL_PROMPT);
  console.log(result?.response?.text());
  setLoading(false);
  saveAiTrip(result?.response?.text())
}
const saveAiTrip=async(TripData)=>{
  setLoading(true);
  const user=JSON.parse(localStorage.getItem('user'));
  const docId=Date.now().toString();
  await setDoc(doc(db,'AItrips',docId),{
    locationImageUrl:'url',
    userSelection:formData,
    tripData:JSON.parse(TripData),
    userEmail:user?.email,
    id:docId
  })
  setLoading(false);
  navigate('/view-trip/'+docId);
}
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
      onGenerateTrip();
    })
    .catch((err) => {
      console.error("Error fetching user profile:", err);
    });
};

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Tell us your travel preferences🏕️</h2>
      <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information, and our trip planner will generate a customized Itinerary based on your preferences</p>
      <div className='mt-20 flex flex-col gap-10'>
        <div> <h2 className='text-xl my-3 font-medium'>What is Destination of Choice?</h2>
        <Input placeholder='EX. Delhi' onChange={(e)=>handleInputChange('location',e.target.value)}></Input>
      </div>
      <div>
      <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
      <Input placeholder='EX. 3' onChange={(e)=>handleInputChange('noOfDays',e.target.value)} type='number'></Input>
      </div>
      <div>
      <h2 className='text-xl my-3 font-medium'>What is Your Budget?</h2>
      <div className='grid grid-cols-3 gap-5 mt-5'>
        {SelectBudgetOptions.map((item,index)=>(
          <div key={index} onClick={(e)=>handleInputChange('budget',item.title)} className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${formData?.budget==item.title&&'shadow-lg border-black'}`}>
            <h2 className='text-4xl'>{item.icon}</h2>
            <h2 className='font-bold text-lg'>{item.title}</h2>
            <h2 className='text-sm text-gray-500'>{item.desc}</h2>
          </div>
        ))}
      </div>
      </div>
      <div>
      <h2 className='text-xl my-3 font-medium'>Who do you plan on travelling with on your next adventure?</h2>
      <div className='grid grid-cols-3 gap-5 mt-5'>
        {SelectTravelesList.map((item,index)=>(
          <div key={index} onClick={(e)=>handleInputChange('traveler',item.title)} className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${formData?.traveler==item.title&&'shadow-lg border-black'}`}>
            <h2 className='text-4xl'>{item.icon}</h2>
            <h2 className='font-bold text-lg'>{item.title}</h2>
            <h2 className='text-sm text-gray-500'>{item.desc}</h2>
          </div>
        ))}
      </div>
      </div>
      </div>
      <div className='my-10 flex justify-end '><Button disabled={loading} onClick={onGenerateTrip}>{loading?<AiOutlineLoading3Quarters className='w-7 h-7 animate-spin' />:"Generate Trip"}</Button></div>
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

export default CreateTrip
