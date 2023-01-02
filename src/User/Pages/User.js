import React, { useEffect, useState } from "react";

import UserList from "../Components/UserList";
import ErrorModal from "../../Shared/Components/ErrorModal";
import LoadingSpinner from "../../Shared/Components/LoadingSpinner";

import { useHttpClient } from "../../Shared/hooks/http-hook";

const User = () => {
  const [loadedUserData, setLoadedUserData] = useState();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users`
        );

        setLoadedUserData(responseData.users);
      } catch (err) {}
    };

    fetchUser();
  }, [sendRequest]);

  return (
    <>
      {error && <ErrorModal error={error} onClear={clearError} />}
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}

      {!isLoading && loadedUserData && <UserList item={loadedUserData} />}
    </>
  );
};

export default User;
