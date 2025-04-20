import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { db,modifyDocument } from '../../service/firebaseConfig';
function UserTripCardItem({trip}) {
      const [PhotoUrl,setPhotoUrl]=useState();
      useEffect(()=>{
        trip&&GetPlacePhoto();
      },[trip])
       const GetPlacePhoto=async()=>{
        if(trip?.locationImageUrl=='url'){
      const searchTerm = trip?.userSelection?.location+" landscape";
      
      const apiUrl = 'https://customsearch.googleapis.com/customsearch/v1?q='+searchTerm+'&cx='+import.meta.env.VITE_CSE_ID+'&key='+import.meta.env.VITE_GOOGLE_PLACE_API_KEY+'&searchType=image&imgSize=large';
      
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          if (data.items && data.items.length > 0) {
            const firstImage = data.items[0];
            const PhotoUrl=firstImage.link;
            setPhotoUrl(PhotoUrl);
            modifyDocument('AItrips',trip?.id,{locationImageUrl:PhotoUrl});
          } else {
            console.log('No images found.');
          }
        })
        .catch(error => console.error('Error:', error));}
        else{
          const PhotoUrl=trip?.locationImageUrl;
          setPhotoUrl(PhotoUrl);
        }
        }
    return (
        <Link to={'/view-trip/'+trip?.id}>
        <div className='hover:scale-105 transition-all h-[220px] '>
      <img src={PhotoUrl?PhotoUrl:'https://placehold.co/600x400'} alt=""  className='object-cover rounded-xl mt-10 w-full h-48' />
      <div>
        <h2 className='font-bold text-lg'>{trip?.userSelection?.location}</h2>
        <h2>{trip?.userSelection?.noOfDays} Days of Trip with {trip?.userSelection?.budget} budget</h2>
      </div>
    </div></Link>
  )
}

export default UserTripCardItem
