import React, {useState, useEffect} from 'react';
//import Videos from './appointmentsData.js';
import {useParams} from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from "react-bootstrap/Card";
import { Link } from 'react-router-dom';


function AppointmentD(){
    
    const [appointments,setAppointments] = useState([]);
    const [error,setError] = useState(null);
    const [isLoading,setLoading] = useState(false);

    var options = { weekday: 'long', hour:'numeric', minute:'numeric', year: 'numeric', month: 'long', day: 'numeric' }; // for date time format

    let{id} = useParams();
    // console.log(useParams());
    useEffect(  () => {

      setLoading(true);

      fetch('http://localhost:3000/allAppointments/' + id, {
        headers : { 
          'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
      })
      .then( res => res.json() )
      .then( (data) => {
          // console.log(data);
          setAppointments(data);
          setLoading(false);
      })
      .catch( (error) => {
          // console.log(error.message);
          setError(error);
          setLoading(false);
      })

    }, []);
    
      if(isLoading){
        return(
          <div>Loading...</div>
        );
      }
      else if(error){
          return (
              <div> Error: {error.message} </div>
          );
      }

      else{
          return (
            <div>
              <h1 className='text-dark'> Current Appointment</h1>
              {appointments.map((app, id) => (
                <Card border="info" className="text-center" key={id}>
                  <Card.Header as="h5" className="bg-dark text-white" id = "appId">{app.id}</Card.Header>
                  <Card.Body>
                    <Row>
                      <Col fluid sm={4}>
                        <Card.Img fluid className="rounded img-fluid float-left" src="../img/qiuqiu.jpg" />
                      </Col>
                      <Col fluid sm={8} >
                        <Card.Title as="h4">Student Name: {app.student}</Card.Title>
                        <Card.Title as="h4" className="mb-6 py-3">Tutor Name: {app.tutor}</Card.Title>
                        <Card.Text className="mb-6  text-muted">Start: {new Date(app.start).toLocaleDateString("en-US", options)} </Card.Text>
                        <Card.Text className="mb-6  text-muted">End: {new Date(app.end).toLocaleDateString("en-US", options)} </Card.Text>
                      </Col>
                    </Row>
                    <button id="delete" className="btn btn-outline-dark bg-info" ><Link to={`/allAppointments`}>Go back</Link></button>
                  </Card.Body>
                </Card>
              ))}
            </div>
          );
      }
}

export default AppointmentD;