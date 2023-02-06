import React, { useState, useEffect } from 'react';
import Appointments from './appointmentsData.js';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';




const deleteA = (e) => {

  fetch("http://localhost:3000/allAppointments/" + document.getElementById("id").value, {

    method: 'DELETE',
    body: JSON.stringify({
      id: document.getElementById("id").value,
      start: document.getElementById("start").value,
      end: document.getElementById("end").value,
      student: document.getElementById("student").value,
      tutor: document.getElementById("tutor").value
    }),
    headers: {
      "Content-type": "application/json"
    }

  })

    .then(response => response.json())
    .then(json => console.log(json));

}


function AllAppointments() {

  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);
  const [curCount, setCurCount] = useState(0);
  // var curCount = 0;

  useEffect(() => {
    fetch('http://localhost:3000/allAppointments', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(res => res.json())
      .then((data) => {
        // console.log(data);
        setAppointments(data);
      })
      .catch((error) => {
        // console.log(error.message);
        setError(error);
      })
  }, []);

  useEffect(() => {
    fetch('http://localhost:3000/allAppointments/getCount', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(res => res.json())
    .then((data) => {
      // curCount = data;
      setCurCount(data)
      // console.log(curCount)
    })
    .catch((error) => {
      console.log(error.message);
    })
  }, []);

  const add = (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/allAppointments/getTutor/' + document.getElementById("tutor").value, {
        headers : {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json'
        }
    })
    .then(res => res.json())
    .then(res=>{
        console.log(res)
        var bookTime = new Date(document.getElementById("start").value);
        var conflict = false;
        for(var i = 0; i < res.length; i++){
          if(bookTime.getTime() >= new Date(res[i].start).getTime() && bookTime.getTime() <= new Date(res[i].end).getTime()){
            conflict = true;
            break;
          }
        }
        if(conflict){
          alert("Time slot already booked! Please choose another time.")
        }else{
          fetch("http://localhost:3000/allAppointments", {
            method: 'POST',
            body: JSON.stringify({
              id: "AP" + (parseInt(curCount)+1), //document.getElementById("id").value,
              start: document.getElementById("start").value,
              end: document.getElementById("end").value,
              student: document.getElementById("student").value,
              tutor: document.getElementById("tutor").value
            }),
            headers: {
              "Content-type": "application/json"
            }
          })
          .then(response => response.json())
          alert("Successfully booked an appointment with tutor " + document.getElementById("tutor").value + "!")
          window.location.reload(false);//refresh page
        }
    })

    

  }


  if (error) {
    return (
      <div> Error: {error.message} </div>
    )
  }else {
    return (
      <>
      <Row>
        <h1> Make an Appointment</h1>
        <form>
          <div className="form-group col-md-3">
            {/* <Row >
              <label>Appointment</label>
              <Col fluid md={6}>
                <input type="text" placeholder="number.." id="id" className="form-control" />
              </Col>
              <Col fluid md={6}>
                <button style={{ marginRight: 0 }} id="delete" className="btn btn-outline-dark" onClick={deleteA}>Delete</button>
              </Col>
            </Row> */}
          </div>
          <div className="form-group col-md-3">
            <label>Start Time</label>
            <input type="datetime-local" id="start" className="form-control" />
          </div>
          <div className="form-group col-md-3">
            <label>End Time</label>
            <input type="datetime-local" id="end" className="form-control" />
          </div>
          <div className="form-group col-md-3">
            <label>Student</label>
            <input type="text" id="student" placeholder="name" className="form-control" />
          </div>
          <div className="form-group col-md-3">
            <label>Tutor</label>
            <input type="text" id="tutor" placeholder="name" className="form-control" />
          </div>
          <div className="col-12 mt-3">
            <button id="add" type='submit' className="btn btn-primary float-start" onClick={add}>Book Appointment</button>
          </div>
        </form>
        <hr style={{marginTop: "20px"}}/>
        </Row>
            <Appointments appointmentlist={appointments} />
      </>

    );
  }
}

export default AllAppointments;