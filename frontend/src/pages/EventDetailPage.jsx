import { redirect, useParams } from "react-router-dom";
import EventItem from "../components/EventItem";
import { useRouteLoaderData } from "react-router-dom";

function EventDetailPage() {
  // this Loaderdata hook is slightly different
  // takes in arguement:
  const data = useRouteLoaderData("event-detail");
  const params = useParams();

  console.log(data);
  return (
    <>
      {/* <h1>EventDetailPage</h1>
      <p>Event ID: {params.eventId}</p> */}
      <EventItem event={data.event} />
    </>
  );
}

export default EventDetailPage;

// PURPOSE of LOADER here: EXTRACT infomation of event ========================================
// REMEMBER YOU CANT USE THE REACT HOOKS like USEPARAMS
// instead did you know? the Loader function passes 2 arguments:
// request =
// params =
export async function loader({ request, params }) {
  // console.log(params);
  const id = params.eventId;

  const response = await fetch("http://localhost:8080/events/" + id);

  if (!response.ok) {
    // return {isError: true, message: 'Could not fetch events'}
    // throw { message: 'Could not fetch events' }
    throw new Response(JSON.stringify({ message: "Could not fetch details" }), {
      status: 500,
    });
  } else {
    return response;
  }
}

// PURPOSE OF ACTION here: to DELETE infomation of event ========================================
export async function action({ request, params }) {
  const id = params.eventId;

  const response = await fetch("http://localhost:8080/events/" + id, {
    method: request.method, //we defined 'DELETE' already in the EventItem.js component
  });

  if (!response.ok) {
    // return {isError: true, message: 'Could not fetch events'}
    // throw { message: 'Could not fetch events' }
    throw new Response(JSON.stringify({ message: "Could not delete event" }), {
      status: 500,
    });
  }

  // response object, to redirect user to different page
  //   return redirect('/events')
  return redirect('/events');
}

// TRASH ===================================================================
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

//   if (!response.ok) {
//     throw json({ message: "Could not save event" }, { status: 500 });
//   }

//   // response object, to redirect user to different page
//   return redirect('/events')
// }
