// this component will render the list of creators within homepage route
import { Link } from "react-router-dom";
import CourseCard from "./CourseCard";
import classes from './css/CourseList.module.css'

const CourseList = ({ CourseList }) => {
  return (
    <div>
      <h2> All Creators </h2>
      <ul>
        {CourseList.map((element) => {
          return (
            <li key={element.id}>
              <Link to={`/${element.id}`}>
                <CourseCard name={element.name} imageURL={element.imageURL} description={element.description} />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CourseList;
