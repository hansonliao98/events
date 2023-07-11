import React from "react";
import { json, redirect } from "react-router-dom";
import EventForm from "../components/EventForm";

const NewEventPage = () => {
  return (
    <>
      <div>NewEventPage</div>
      <EventForm method="post" />
    </>
  );
};

export default NewEventPage;

// // NEW : this action will send data to the backend save it =============================================================
// // 'request' contains form data
// export async function action({ request, params }) {
//   // console.log(request);
//   const data = await request.formData();

//   // get access to the form data input values. Extract based on 'name' attribute
//   const eventData = {
//     title: data.get("title"),
//     image: data.get("image"),
//     date: data.get("date"),
//     description: data.get("description"),
//   };

//   const response = await fetch("http://localhost:8080/events", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(eventData),
//   });

//   // error 422 was set on the backend
//   if (response.status === 422) {
//     return response;
//   }

//   if (!response.ok) {
//     throw json({ message: "Could not save event" }, { status: 500 });
//   }

//   // response object, to redirect user to different page
//   return redirect("/events");
// }
