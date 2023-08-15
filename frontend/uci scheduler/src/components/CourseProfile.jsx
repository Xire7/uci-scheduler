import classes from "./css/CreatorProfile.module.css";
import { Link, useSubmit } from "react-router-dom";
import { redirect } from "react-router-dom";


const CourseProfile = ({ name, imageURL, url, description }) => {
  const submit = useSubmit();
  const deleteHandler = () => {
    const proceed = window.confirm("Delete this Course from your schedule?");

    redirect('/new')
    if (proceed) {
      submit(null, {method: 'DELETE'});
    }
  }
  return (
    <section>
      <div className={classes.card}>
        <div>
        <img src={imageURL} />
        <h1>{name}</h1>
        <a href={url} target="_blank" rel="noopener noreferrer">
          {url}
        </a>
        <p>{description}</p>
        </div>
        <div className={classes.control}>
          <Link to="edit">Edit</Link>
          <a onClick={deleteHandler}>Delete</a>
        </div>
      </div>
    </section>
  );
};

export default CourseProfile;
