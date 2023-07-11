import {
  Form,
  json,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom";

import classes from "./EventForm.module.css";

function EventForm({ method, event }) {
  const data = useActionData(); //gives data from the closest action function in routing
  // To navigate the user to another page
  const navigate = useNavigate();

  // gives access to a navigation object
  const navigation = useNavigation();

  console.log(navigation);
  const isSubmitting = navigation.state === "submitting"; // boolean

  function cancelHandler() {
    // return to parent route
    navigate("..");
  }

  return (
    // this 'Form' component is special: will NOT send data to the backend
    // instead will send to the action u made in the 'NewEventPage' file:
    <Form method={method} className={classes.form}>
      {/*  */}
      {/* SHOWING ERRORS MADE FROM BACKEND ================================================================= */}
      {/* check if data has any data present */}
      {/* check if theres any errors listed in the data */}
      {data && data.errors && (
        <ul>
          {/* loop through all keys in object (i believe this is matching the errors to the errors we made in an object in backend) */}
          {Object.values(data.errors).map((err) => (
            <li key={err}> {err} </li>
          ))}
        </ul>
      )}
      {/* ============================================================================================== */}
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          required
          defaultValue={event ? event.title : ""}
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="url"
          name="image"
          required
          defaultValue={event ? event.image : ""}
        />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          required
          defaultValue={event ? event.date : ""}
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          required
          defaultValue={event ? event.description : ""}
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Save"}
        </button>
      </div>
    </Form>
  );
}

export default EventForm;

// ACTION for NEW and EDITING events ===========================================================================

export async function action({ request, params }) {
  const method = request.method;
  // console.log(request);
  const data = await request.formData();

  // get access to the form data input values. Extract based on 'name' attribute
  const eventData = {
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
  };

  let url = "http://localhost:8080/events";

  if ((method === "PATCH")) {
    const eventId = params.eventId;
    url = "http://localhost:8080/events/" + eventId;
  }

  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });

  // error 422 was set on the backend
  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not save event" }, { status: 500 });
  }

  // response object, to redirect user to different page
  return redirect("/events");
}
