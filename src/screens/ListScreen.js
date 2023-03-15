import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ListScreen() {
  const [shows, setShows] = useState([]);

  // Fetching the details of all shows from the API
  useEffect(() => {
    fetch("https://api.tvmaze.com/search/shows?q=all")
      .then((response) => response.json())
      .then((data) => setShows(data));
  }, []);

  return (
    <div className="container">
      <h1 className="mt-3 mb-5">TV Shows</h1>
      <div className="row">
        {shows.map(({show}) => (
          <div className="col-md-3 col-sm-1 mb-5" key={show.id}>
            <div className="card shadow" style={{ width: "18rem" }}>
              <img className="card-img-top object-fit-contain" src={show.image?.medium || "/null.png"} alt="card img" height="250px" />
              <div className="card-body">
                <h4 className="card-title">{show.name}</h4>
                <p className="card-text" dangerouslySetInnerHTML={{ __html: show.summary.slice(0, 120) + "..." }}></p>
                <Link to={`/showdetails/${show.id}`} className="btn btn-primary">
                  Watch Now
                </Link>
                <span style={{ marginLeft: "30%", color: "orange" }}>Rating {show.rating?.average || "7.3"}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListScreen;
