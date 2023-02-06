import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import Tutors from './tutor.js';

function TutorDetails(){
    const[tutors, setTutors] = useState([]);
    const[error, setError] = useState(null);

    let name = useParams();

    useEffect(() => {
        fetch('http://localhost:3000/allTutorsList', {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(res => res.json())
        .then( (data) => {
            // console.log(data);
            setTutors(data);
        })
        .catch((error) => {
            setError(error);
        })
    },[]
    );

    if(error){
        return(
            <div>Error: {error.message}</div>
        )
    }else{
        return(
            <Tutors tutorlist = {tutors} />
        )
    }
}

export default TutorDetails;