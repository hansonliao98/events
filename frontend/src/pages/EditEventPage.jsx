import React from "react";
import EventForm from "../components/EventForm";
import { useRouteLoaderData } from "react-router-dom";

const EditEventPage = () => {
  // first fetch the data of this event using the loader BUILT IN event detail page:
  const data = useRouteLoaderData('event-detail');
  const event = data.event

  return (
    <>
      <div>EditEventPage</div>
      < EventForm method="patch" event={event} />;
    </>
  );
};

export default EditEventPage;
