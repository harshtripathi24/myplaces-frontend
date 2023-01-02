import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../Components/PlaceList";
import { useHttpClient } from "../../Shared/hooks/http-hook";

import LoadingSpinner from "../../Shared/Components/LoadingSpinner";
import ErrorModal from "../../Shared/Components/ErrorModal";

const UserPlaces = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [loadedPlaces, setLoadedPlaces] = useState();

  const userId = useParams().userId;

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`
        );

        setLoadedPlaces(responseData.places);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPlaces();
  }, [sendRequest, userId]);

  const placeDeleteHandler = (deletedPlaceId) => {
    setLoadedPlaces(
      loadedPlaces.filter((place) => place.id !== deletedPlaceId)
    );
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}

      {!isLoading && loadedPlaces && (
        <PlaceList items={loadedPlaces} onDelete={placeDeleteHandler} />
      )}
    </>
  );
};

export default UserPlaces;
