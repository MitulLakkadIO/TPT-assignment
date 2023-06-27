import React, { useState, useEffect } from "react";

const PhotoItem = ({ title, thumbnailUrl }) => (
  <div>
    <h3>{title}</h3>
    <img src={thumbnailUrl} alt={title} />
  </div>
);

const PhotoList = () => {
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/photos"
        );
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const data = await response.json();
        setPhotos(data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {photos.map((photo) => (
        <PhotoItem
          key={photo.id}
          title={photo.title}
          thumbnailUrl={photo.thumbnailUrl}
        />
      ))}
    </div>
  );
};

export default PhotoList;
