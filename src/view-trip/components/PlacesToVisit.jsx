import React from 'react'
import { Link } from 'react-router-dom';
import PlaceCardItem  from './PlaceCardItem';
function PlacesToVisit({trip}) {
    const display1=(places)=>{
        const userElements = [];
        for(const key in places){
            userElements.push(
                <div className='my-3'>
                  <h2 className='font-medium text-sm text-orange-500'>{places[key].bestTimeToVisit}</h2>
                    <PlaceCardItem place={places[key]} trips={trip}></PlaceCardItem>
                </div>
            )
        }
        return userElements;
    }
    const display=()=>{
        var a=trip?.tripData?.[0]?.itinerary;
        const userElements = [];
        var i=1;
        for(const key in a){
            if (a.hasOwnProperty(key)) {
                const p=a[key];
            userElements.push(
                <div className='mt-5'>
                    <h2 className='font-medium text-lg'>DAY {i++}</h2>
                    <div className='grid md:grid-cols-2 gap-5'>
                    {display1(p?.places)}
                    </div>
                </div>
            );}
        }
        return userElements;
    }
  return (
    <div>
      <div>
        <h2 className='font-bold text-xl mt-10'>Places To Visit</h2>
      </div>
      <div>
        {display()}
      </div>
    </div>
  )
}

export default PlacesToVisit
