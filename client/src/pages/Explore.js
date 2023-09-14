import React, { useState, useEffect } from "react";

import { useMutation } from "@apollo/client";
import { ADD_USEREVENT } from "../utils/mutations";
import ExploreEventList from "../components/ExploreEventList";

import Auth from "../utils/auth";

const Explore = () => {
  // state for holding searched event results
  const [searchedEvents, setSearchedEvents] = useState([]);
  // state for holding search input
  const [searchInput, setSearchInput] = useState("");

  const [addUserEvent, { error }] = useMutation(ADD_USEREVENT);

  // handle search input and send request to back-end for fetching data from API with API key (hidden from client)
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await fetch(`/search/${searchInput}`);

      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      const { events } = await response.json();

      const eventData = events.map((event) => ({
        eventId: event.id,
        performer: event.performers[0].name || ["No performers at this event."],
        venue: event.venue.name,
        location: event.venue.extended_address,
        date: event.datetime_local,
        title: event.title || "",
        image: event.performers[0].image,
        link: event.url,
      }));

      console.log(eventData);
      setSearchedEvents(eventData);
      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddEvent = async (eventId) => {
    const eventToSave = searchedEvents.find(
      (event) => event.eventId === eventId
    );

    // get token
    // const token = Auth.loggedIn() ? Auth.getToken() : null;

    // if (!token) {
    //   return false;
    // }

    try {
      const { data } = await addUserEvent({
        variables: {
          eventData: { ...eventToSave },
          // test user id from seed file; remove once login is implemented
          user: "64fe015fddb125f03aa9c1ea",
        },
      });
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div>
        <h1>Search for Events!</h1>
        <form onSubmit={handleFormSubmit} className="event-search">
          <input
            name="searchInput"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            type="text"
            className="search-input"
            placeholder="Search for events!"
          />
          <button type="submit" variant="success">
            Submit Search
          </button>
        </form>
      </div>

      <h2>
        {searchedEvents.length
          ? `Viewing ${searchedEvents.length} Events:`
          : "No events found!"}
      </h2>

      <ExploreEventList events={searchedEvents} />
    </>
  );
};

export default Explore;
