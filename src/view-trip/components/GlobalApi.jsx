import React, { useState } from "react";
import axios from "axios";
const BASE_URL='https://maps.gomaps.pro/maps/api/place/textsearch/json';

 export const GetPlaceDetails=(data)=>axios.get(BASE_URL,data);
 export const PHOTO_REF_URL='https://maps.gomaps.pro/maps/api/place/photo?photo_reference={name}&maxwidth=1400&key='+import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

