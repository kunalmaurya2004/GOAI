import React from 'react'
import { Link } from 'react-router-dom';
import HotelCardItem from './HotelCardItem';

function Hotels({trip}) {
    const display=()=>{
        var a=trip?.tripData?.[0]?.hotelOptions.length;
        const userElements = [];
        for(let i=0;i<a;i++){
            userElements.push(
                <HotelCardItem trip={trip} i={i}/>);
        }
        return userElements;
    }
    return (
        <div>
      <h2 className='font-bold text-xl mt-5'>Hotel Recommendation</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
       {display()
        }
      </div>
    </div>
  )
}

export default Hotels
