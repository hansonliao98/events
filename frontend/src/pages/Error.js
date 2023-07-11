import React from "react";
import PageContent from "../components/PageContent";
import { useRouteError } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

const Error = () => {
  // Set error messages according to what type of error we received
  const error = useRouteError(); //fetches the error type received

  // general error messages (initials)
  let title = "an error occurred";
  let message = "Something went wrong!";

  // conditional: This error returns data WE SET in 'EventsPage'. we extract:
  if (error.status === 500) {
    message = JSON.parse(error.data).message;
  }

  // conditional: this error did NOT return any data from browser aka we make our own
  if (error.status === 404) {
    title = "Not Found!";
    message = "Could not find resource or page.";
  }

  return (
    <>
      {/* include main navigation bar, since this file isn't part of routing */}
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
};

export default Error;
