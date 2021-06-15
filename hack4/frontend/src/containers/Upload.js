import Uploader from '../components/Uploader';
import { UPLOAD_MUTATION} from '../graphql';
import { useQuery, useMutation } from '@apollo/react-hooks';  
import "./Upload.css";


export default function Upload() {
    const [insertPeople] = useMutation(UPLOAD_MUTATION);
    // TODO get the mutation function
    // pass it to the Uploader component

    return <div id="Upload">
        <div id="PeopleUploader">
            <Uploader tag="People" mutation={insertPeople}/>
        </div>
    </div>;
}
