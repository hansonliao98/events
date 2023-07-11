import { Link, useSubmit } from "react-router-dom";
import classes from "./EventItem.module.css";

function EventItem({ event }) {
  // allows programmer to submit form --> automatically triggers the closest action in routing (aka in the eventDetailPage.jsx)
  const submit = useSubmit();

  function startDeleteHandler() {
    const proceed = window.confirm("Are you sure girl?");

    if (proceed) {
      // 2 arguments:
      // 1) Data that we want to submit
      // 2) set values like you would on a form
      submit(null, {
        method: "delete",
        // action : IF defined on a different route path = action: "/different-route-path"
      });
    }
  }

  const title = event;
  console.log(event);

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      <menu className={classes.actions}>
        <Link to="edit">Edit</Link>
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>
    </article>
  );
}

export default EventItem;
