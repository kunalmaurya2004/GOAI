import  InfoSection  from '../components/InfoSection'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';
import { db } from '../../service/firebaseConfig';
import { doc,getDoc } from 'firebase/firestore'
import Hotels from '../components/Hotels'
import PlacesToVisit from '../components/PlacesToVisit';

function Viewtrip() {
    const {tripId}=useParams();
    const [trip,setTrip]=useState([]);
    useEffect(()=>{tripId&&GetTripData();},[tripId])
    const GetTripData=async()=>{
        const docRef=doc(db,'AItrips',tripId);
        const docSnap=await getDoc(docRef);
        if(docSnap.exists()){
            console.log("Document:",docSnap.data());
            setTrip(docSnap.data());
        }
        else{
            console.log("No such Document");
            toast("NO trip Found!");
        }
    }
  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
      {/* information */}
      <InfoSection trip={trip}></InfoSection>
      {/* Hotel recommendation */}
      <Hotels trip={trip}></Hotels>
      {/* Daily routine */}
      <PlacesToVisit trip={trip}></PlacesToVisit>
    </div>
  )
}

export default Viewtrip
