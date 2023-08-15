import { useRouteLoaderData, useParams } from 'react-router-dom';
import CourseForm from '../components/CourseForm'

const searchTarget = (array, id) => {
    for (let i = 0; i < array.length; i++) {
      console.log('CURRENT ID:', id, '===', array[i].id, i, array[i])
      if (array[i].id === id) {
        return array[i];
      }
    }
    return null;
  }  

const EditCreator = () => {
    const data = useRouteLoaderData('fetchCreator');
    console.log(data);
    const { creatorId } = useParams();
    const target = searchTarget(data, Number.parseInt(creatorId, 10));
    return <CourseForm method={'PATCH'} data={target}/>

};

export default EditCreator;