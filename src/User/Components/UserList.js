import React from "react";

import "./UserItem";
import UserItem from "./UserItem";
import Card from "../../Shared/Components/Card/Card";
import "./UserList.css";

const UserList = ({ item }) => {
  if (item.length === 0) {
    return (
      <>
        <div className="center">
          <Card>
            <h2>There is No User </h2>
          </Card>
        </div>
      </>
    );
  } else {
    return (
      <>
        <ul className="users-list">
          {item.map((user) => {
            return (
              <UserItem
                key={user.id}
                id={user.id}
                image={user.image}
                name={user.name}
                placeCount={user.places.length}
              />
            );
          })}
        </ul>
      </>
    );
  }
};

export default UserList;
