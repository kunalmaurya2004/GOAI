import React from 'react'
import { Link } from 'react-router-dom'
import { useState,useEffect } from 'react';
import { GetPlaceDetails } from './GlobalApi';
import { PHOTO_REF_URL } from './GlobalApi';
import { db,modifyDocument } from '../../service/firebaseConfig';

function PlaceCardItem({place,trips}) {

  const [PhotoUrl,setPhotoUrl]=useState();
        useEffect(()=>{
          trips&&GetPlacePhoto();
        },[trips])
         const GetPlacePhoto=async()=>{
                if(place?.placeImageUrl.startsWith("https://example.com")){
                  const searchTerm = place?.placeName+","+trips?.userSelection?.location;
              const apiUrl = 'https://customsearch.googleapis.com/customsearch/v1?q='+searchTerm+'&cx='+import.meta.env.VITE_CSE_ID+'&key='+import.meta.env.VITE_GOOGLE_PLACE_API_KEY+'&searchType=image&imgSize=medium';
              
              fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                  if (data.items && data.items.length > 0) {
                    const firstImage = data.items[0];
                    const PhotoUrl=firstImage.link;
                    setPhotoUrl(PhotoUrl);
                    place.placeImageUrl=PhotoUrl;
                    modifyDocument('AItrips',trips?.id,{tripData:trips.tripData});
                  } else {
                    console.log('No images found.');
                  }
                })
                .catch(error => console.error('Error:', error));}
                else{
                  const PhotoUrl=place?.placeImageUrl;
                  setPhotoUrl(PhotoUrl);
                }
                }

  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+place?.placeName+","+trips?.userSelection?.location} target='_blank'>
    <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-lg cursor-pointer'>
      <img src={PhotoUrl?PhotoUrl:'https://placehold.co/130x130'} alt="" className='w-[130px] h-[130px] rounded-xl object-cover'/>
      <div>
        <h2 className='font-bold text-lg text-black'>{place?.placeName}</h2>
        <h2 className='text-sm text-gray-500'>{place?.placeDetails}</h2>
        <h2 className='text-sm text-gray-500  mt-2'>🕑 {place?.timeTravel}</h2>
        <h2 className='text-sm text-gray-500  mt-2'>💴 {place?.ticketPricing}</h2>
      </div>
    </div>
    </Link>
  )
}

export default PlaceCardItem
