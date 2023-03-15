import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookTicketForm from "../components/BookTicketForm";
const ShowDetails = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [ticketForm, setTicketForm] = useState(false);

  useEffect(() => {
    // Fetching the details of the selected show from the API
    fetch(`https://api.tvmaze.com/shows/${id}`)
      .then((response) => response.json())
      .then((data) => setShow(data))
      .catch((error) => console.log(error));
  }, [id]);

  // Loading while fetching data
  if (!show) {
    return <div>Loading...</div>;
  }

  // Open TicketForm on button click
  const handleToggleForm = () => {
    setTicketForm(!ticketForm);
  };

  return (
    <div className="container my-5">
      {!ticketForm ? (
        <div className="row">
          <div className="col-md-4">
            <img src={show.image?.medium || "/null.png"} alt={show.name} className="img-fluid mt-4 rounded w-75" />
          </div>
          <div className="col-md-8 mt-4">
            <h1>{show.name}</h1>
            <p dangerouslySetInnerHTML={{ __html: show.summary }}></p>
            <p>
              <strong>Genres:</strong> {show.genres}
            </p>
            <p>
              <strong>Status:</strong> {show.status}
            </p>
            <p>
              <strong>Language:</strong> {show.language}
            </p>
            <p>
              <strong>Runtime:</strong> {show.runtime} minutes
            </p>
            <p>
              <strong>Network:</strong> {show.network?.name || "N/A"}
            </p>
            <p>
              <strong>Schedule:</strong> {show.schedule?.days} at {show.schedule?.time}
            </p>
            <p>
              <strong>Rating:</strong> {show.rating?.average || "N/A"}
            </p>
            <button className="btn btn-primary" onClick={handleToggleForm}>
              Book Ticket
            </button>
          </div>
        </div>
      ) : (
        <BookTicketForm show={show} handleToggleForm={handleToggleForm} />
      )}
    </div>
  );
};

export default ShowDetails;
