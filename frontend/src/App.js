import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AllTutors from './allTutors.js';
import NavBar from './navbar.js';
import "./App.css"
import MyCarousel from './carousel.js';
import SideList from './sidelist.js';
import FooterPage from './Footer.js';
import HomePage from './homepage.js';
import TutorDetails from './tutorDetails.js';
import TutorDetailsName from './tutorDetailsName.js';
import AddTutorForm from './addTutorForm.js';
import DeleteTutor from './deleteTutor.js';
import AllAppointments from './appointments.js';
import AppointmentDetails from './appointmentDetails.js';
import Login from './login';
import Signup from './signup';
import UpcomingAppointments from './upcomingAppointments.js';
import Feedbacks from './feedbacks';
import Tutors from './tutor.js';
import AddFavorite from './addFavorite.js';


const App = () => {
    var logged = false;
    var curUser = null;
    var curEmail = null;
    var isTutor = false;
    const [tutorInfo, setTutorInfo] = useState([]);
    // console.log(localStorage)
    if(localStorage.length != 0){
      // console.log(JSON.parse(localStorage.getItem("user")).username)
      logged = true;
      curUser = JSON.parse(localStorage.getItem("user")).username;
      curEmail = JSON.parse(localStorage.getItem("user")).email;
      var rating = JSON.parse(localStorage.getItem("user")).rating;
      if(rating || rating === 0){
        isTutor = true
        // console.log(rating)
      }
    }
    return (
      <Router>
      <NavBar isLogged = {logged}  userName = {curUser} setTutor = {setTutorInfo}/>
      <Routes>
          <Route path='/' element={<MyCarousel /> }></Route> 
      </Routes>
        <div className='row' style={{paddingTop:'125px'}}>
          <div className='col-md-1'></div>
          <div className='col-md-2'>
            <SideList isTutor = {isTutor} />
          </div>
          <div className='col-md-8'>
          <Routes>
            <Route path='/' element={<HomePage /> }></Route> 
            <Route path='/allTutors' element={<AllTutors />}></Route>
            <Route path='/allTutorsList' element={<TutorDetails />}></Route>
            <Route path='/allTutorsList/:name' element={<TutorDetailsName />}></Route>
            <Route path='/addTutor' element={<AddTutorForm />}></Route>
            <Route path='/deleteTutor' element={<DeleteTutor />}></Route>
            <Route path='/allAppointments' element={<AllAppointments />}></Route>
            <Route path='/allAppointments/:id' element={<AppointmentDetails />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/signup' element={<Signup entryPath = "register"/>}></Route>
            <Route path='/upcomingAppointments' element={<UpcomingAppointments userName = {curUser} rating = {rating} isTutor = {isTutor} userEmail = {curEmail}/>}></Route>
            <Route path='/feedbacks' element={<Feedbacks userEmail = {curEmail} userName = {curUser} />}></Route>
            <Route path='/searchedTutors' element={<Tutors tutorlist = {tutorInfo}/>}></Route>
            <Route path='/addFavorite' element={<AddFavorite userEmail={curEmail}/>}></Route>
          </Routes>
          </div>
          <div className='col-md-1'></div>
        </div>
      <FooterPage/>
      </Router>
  );
}

export default App;
