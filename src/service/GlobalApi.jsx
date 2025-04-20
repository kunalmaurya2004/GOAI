import React, { useState } from "react";
import axios from "axios";

const BingImageSearch = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    const apiKey = import.meta.env.REACT_APP_BING_API_KEY;
    const endpoint = "https://api.bing.microsoft.com/v7.0/images/search";

    try {
      const response = await axios.get(endpoint, {
        params: { q: query, count: 10 }, // `count` specifies the number of results
        headers: { "Ocp-Apim-Subscription-Key": apiKey },
      });

      setImages(response.data.value); // Bing API returns images in the `value` field
    } catch (error) {
      console.error("Error fetching images:", error);
      alert("Failed to fetch images.");
    }
  };

  return (
    <div>
      <h1>Bing Image Search</h1>
      <input
        type="text"
        placeholder="Search for images..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={fetchImages}>Search</button>

      <div style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}>
        {images.map((image) => (
          <div key={image.imageId} style={{ margin: "10px" }}>
            <img
              src={image.thumbnailUrl}
              alt={image.name}
              style={{ width: "150px", height: "100px", objectFit: "cover" }}
            />
            <p>{image.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BingImageSearch;
