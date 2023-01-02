import React from "react";

import Card from "../../Shared/Components/Card/Card";
import PlaceItem from "./PlaceItem";
import Button from "../../Shared/Components/FormElements/Button";
import "./PlaceList.css";

const PlaceList = ({ items, onDelete }) => {
  if (items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No Places Found. May Be Create One? </h2>
          <Button to="/places/new">Share Places</Button>
        </Card>
      </div>
    );
  } else {
    return (
      <ul className="place-list">
        {items.map((place) => (
          <PlaceItem
            key={place.id}
            creatorID={place.creator}
            id={place.id}
            image={place.image}
            title={place.title}
            description={place.description}
            address={place.address}
            cordinates={place.location}
            onDelete={onDelete}
          />
        ))}
      </ul>
    );
  }
};

export default PlaceList;
