import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
import { Link} from 'react-router-dom';
import Card from "react-bootstrap/Card";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function UpcomingAppointments(props){
    var curUser = props.userName
    // const [appInfo, setAppInfo] = useState([]);
    var appInfo = [];
    var searchedList = [];
    const [display, setDisplay] = useState([]);
    const [hasApp, setHasApp] = useState(false);
    var ratingDisplay = [];
    const [countDisplay, setCountDisplay] = useState([]);
    var countPath = "";
    var count = 0;
    var options = { weekday: 'long', hour:'numeric', minute:'numeric', year: 'numeric', month: 'long', day: 'numeric' }; // for date time format

    useEffect(()=>{ // get all appoints 
        fetch('http://localhost:3000/allAppointments', {
            headers : {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json'
            }
        })
        .then(res => res.json())
        .then((data) => {
            // setAppInfo(data);
            appInfo = data;
            // console.log(appInfo)
            appInfo.forEach((app)=>{
                if(app.student === curUser || app.tutor === curUser){
                    if(new Date(app.start).getTime() > new Date().getTime()){
                        searchedList.push(
                            // <div>
                            //     {new Date(app.start).toLocaleDateString("en-US", options)}
                            // </div>
                            <Card border="info" className="text-center" key={app.id}>
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
                                </Col>
                                </Row>
                                    <Button className="" id = {"cancelButton:"+`${app.id}`} onClick={cancel}>Cancel this appointment</Button>
                            </Card.Body>
                            </Card>
                        );
                        // console.log(new Date(v0.start).toLocaleDateString("en-US", options))
                    }
                    // console.log(new Date(v0.start).getTime())
                    // console.log(new Date().getTime())
                }
            })
            if(searchedList.length > 0){
                // setHasApp(true);
                // setDisplay(searchedList)
                setDisplay1(searchedList)
            }else{
                setDisplay("No upcoming appointments")
            }
        })
        .catch(console.log)
    },[])

    if(props.isTutor){
        countPath = "allTutorsList/getByEmail/" + props.userEmail;
    }else{
        countPath = "users/"+props.userEmail;
    }



    useEffect(() => {
        fetch('http://localhost:3000/' + countPath, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(res => res.json())
        .then((users) => {
            // console.log(countPath)
            // console.log(users[0].username);
            fetch('http://localhost:3000/allAppointments', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then(res => res.json())
            .then((response) => {
                // console.log(response)
                for (let i = 0; i < response.length; i++) {
                    if (new Date(response[i].end).getTime() < new Date().getTime()) {
                        if(response[i].student == users[0].username || response[i].tutor === users[0].username ){
                            count += 1
                        }
                    }
                }
                // console.log(count)
                updateCountDisplay();
            })
            .catch((error) => {
                console.log(error.message);
            })
        })
        .catch((error) => {
            console.log(error.message);
        })
    }, []);



    function cancel(e){
        // e.preventDefault()
        var curTime = new Date().getTime()
        // console.log(curTime+" : "+ 24*3600*1000+" : " + new Date(curTime+24*3600*1000))
        // console.log(e.target.id.split(":").pop())
        var appId = e.target.id.split(":").pop()
        var appTime = null;
        fetch('http://localhost:3000/allAppointments/'+appId, {
            headers : {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json'
            }
        })
        .then(res => res.json())
        .then(res=>{
            // console.log(res[0].start)
            appTime = new Date(res[0].start).getTime()
            if(appTime - curTime > 24*3600*1000){
                alert("Appointment cancelled!")
                fetch("http://localhost:3000/allAppointments/" + appId, {
                    method:"DELETE",
                    headers:{
                        "Content-type":"application/json"
                    }
                })
                .catch(err => {
                    console.log(err)
                })
                window.location.reload(false);//refresh page
            }else{
                alert("You cannot cancel appointments starting within 24 hours")
            }
        })
    }

    if(props.isTutor && props.rating){
        ratingDisplay.push(
            <div>
                <h3>current rating: {props.rating}</h3>
            </div>
        )
    }

    function setDisplay1(searchedList){
        // console.log(searchedList)
        setDisplay(searchedList)
    }

    function updateCountDisplay(){
        setCountDisplay(
            <div>
                <h3>Total hours completed: {count}</h3>
            </div>

        )
    }
    return(
        <div>
        <h1>Upcoming Appointments</h1>
            {ratingDisplay}
            {countDisplay}
            {display}
        </div>
    )
}

export default UpcomingAppointments;