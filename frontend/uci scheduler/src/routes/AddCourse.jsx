import CourseForm from "../components/CourseForm";
const AddCreator = ({idCheck}) => {
    return <CourseForm method='POST' ids={idCheck}/>
}

export default AddCreator;