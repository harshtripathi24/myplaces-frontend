import React from "react";
import { useState } from "react";
import { useContext } from "react";
import Card from "../../Shared/Components/Card/Card";
import Button from "../../Shared/Components/FormElements/Button";

import Modal from "../../Shared/Components/UIElements/Modal";
import Map from "../../Shared/Components/UIElements/Map";
import { useHttpClient } from "../../Shared/hooks/http-hook";
import ErrorModal from "../../Shared/Components/ErrorModal";
import LoadingSpinner from "../../Shared/Components/LoadingSpinner";

import { AuthContext } from "../../Shared/context/auth-context";

import "./PlaceItem.css";

const PlaceItem = (props) => {
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const auth = useContext(AuthContext);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelShowConfirmModalHandeler = (e) => {
    e.preventDefault();
    setShowConfirmModal(false);
  };

  const confirmDeletingHandler = async (e) => {
    e.preventDefault();
    setShowConfirmModal(false);

    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/places/${props.id}`,
        "DELETE",
        {},
        { Authorization: "Bearer " + auth.token }
      );

      props.onDelete(props.id);
    } catch (err) {}
  };

  const openShowMap = () => setShowMap(true);
  const closeShowMap = (e) => {
    e.preventDefault();

    setShowMap(false);
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showMap}
        onCancel={closeShowMap}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeShowMap}>CLOSE</Button>}
      >
        <div className="map-container">
          <Map center={props.cordinates} zoom={3} />
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        // cancel={cancelShowConfirmModalHandeler}
        header="Are You Sure?"
        footerClass="place-item__modal-actions"
        footer={
          <>
            <Button onClick={cancelShowConfirmModalHandeler} inverse>
              Cancel
            </Button>
            <Button onClick={confirmDeletingHandler} danger>
              Delete
            </Button>
          </>
        }
      >
        <p>
          Please Note That You can't undone this action after once deletion is
          done{" "}
        </p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="place-item__image">
            <img
              src={`${process.env.REACT_APP_ASSET_URL}/${props.image}`}
              alt={props.title}
            />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openShowMap}>
              Show Map
            </Button>
            {auth.userId === props.creatorID && (
              <Button to={`/places/${props.id}`}>Edit</Button>
            )}

            {auth.userId === props.creatorID && (
              <Button onClick={showDeleteWarningHandler} danger>
                Delete
              </Button>
            )}
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;
