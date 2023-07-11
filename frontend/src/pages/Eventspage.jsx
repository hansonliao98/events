// import { useEffect, useState } from 'react';

// import EventsList from '../components/EventsList';
import { Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";
import EventsList from "../components/EventsList";

function EventsPage() {
  // const [isLoading, setIsLoading] = useState(false);
  // const [fetchedEvents, setFetchedEvents] = useState();
  // const [error, setError] = useState();

  // useEffect(() => {
  //   async function fetchEvents() {
  //     setIsLoading(true);

  //     // moved to app.js
  //     // const response = await fetch('http://localhost:8080/events');

  //     // if (!response.ok) {
  //     //   setError('Fetching events failed.');
  //     // } else {
  //     //   const resData = await response.json();
  //     //   setFetchedEvents(resData.events);
  //     // }
  //     setIsLoading(false);
  //   }

  //   fetchEvents();
  // }, []);
  const data = useLoaderData();
  const events = data.events;

  if (data.isError) {
    return <p> {data.message} </p>;
  }

  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // return {isError: true, message: 'Could not fetch events'}
    // throw { message: 'Could not fetch events' }
    throw new Response(JSON.stringify({ message: "Could not fetch Events" }), {
      status: 500,
    });
  } else {
    // MUST parse data now to accomodate for fulfillment
    const resData = await response.json();
    return resData.events;

    // the other way to do it:
    // const resData = await response.json();
    // // return resData.events;

    // // this is a modern browser feature
    // const res = new Response('any data', {status: 201});
  }
}

// LOADER FUNCTION =============================================================
// CANNOT USE REACT COMPONENTS LIKE USESTATE, USE EFFECT ,etc
export function loader() {
  // have values we'll eventually resolve
  return defer({
    events: loadEvents(),
  });
}
