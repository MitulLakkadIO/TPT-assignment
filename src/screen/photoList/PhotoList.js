import React, { useState, useEffect } from "react";
import "./PhotoList.css";

import Card from "../../components/card/Card";
import Spinner from "../../components/spinner/Spinner";
import ToastMessage from "../../components/toastMessage/ToastMessage";

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
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="toast-container">
        <ToastMessage className="tosatMessage" message={error.message} />
      </div>
    );
  }

  return (
    <>
      <h1 className="title">Photo Gallery</h1>
      <div className="card-container">
        {photos.map((photo) => (
          <Card
            key={photo.id}
            imageUrl={photo.thumbnailUrl}
            title={photo.title}
          />
        ))}
      </div>
    </>
  );
};
export default PhotoList;
