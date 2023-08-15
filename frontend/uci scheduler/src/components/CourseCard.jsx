import classes from "./css/CourseCard.module.css"


const CourseCard = ({name, imageURL, description}) => {
    return (
        <div className={classes.card}>
            <img src={imageURL}/>
            <p>{name}</p>
            <p className={classes.desc}>{description}</p>
        </div>
    );
}

export default CourseCard;