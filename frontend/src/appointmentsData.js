import React from 'react';
import { Link } from 'react-router-dom';
import Card from "react-bootstrap/Card";
import { Button} from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Appointments = (props) => {
  var options = { weekday: 'long', hour:'numeric', minute:'numeric', year: 'numeric', month: 'long', day: 'numeric' }; // for date time format
  return (
    <div>
      <h1 className='text-dark'>Appointment List</h1>
      {props.appointmentlist.map((app, id) => (
        <Card border="info" className="text-center" key={id}>
          <Card.Header as="h5" className="bg-dark text-white">{app.id}</Card.Header>
          <Card.Body>
            <Row>
              <Col fluid sm={4}>
                <Card.Img fluid className="float-left" src="../img/qiuqiu.jpg" style={{width: '250px', height:'250px'}} />
              </Col>
              <Col fluid sm={8} >
                <Card.Title as="h4">Student Name: {app.student}</Card.Title>
                <Card.Title as="h4" className="mb-6 py-3">Tutor Name: {app.tutor}</Card.Title>
                <Card.Text className="mb-6  text-muted">Start: {new Date(app.start).toLocaleDateString("en-US", options)} </Card.Text>
                <Card.Text className="mb-6  text-muted">End: {new Date(app.end).toLocaleDateString("en-US", options)} </Card.Text>
              </Col>
            </Row>
            <Button className="bg-light"><Link to={`./${app.id}`}>Details..</Link></Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
export default Appointments;