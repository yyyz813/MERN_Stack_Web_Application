import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";


function Login(props) {
    let navigate = useNavigate();
    const [asTutor, setAsTutor] = useState(false);

    var tutorPath = "";
    
    function submitForm(e) {
        e.preventDefault();
        if(asTutor){
            tutorPath = "allTutorsList/"
        }
        fetch('http://localhost:3000/'+tutorPath+'login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({  // you will get user information from login form
                email: document.getElementById("email").value,
                password: document.getElementById("pwd").value,
            })

        })
        .then(res => res.json())
        .then((data) => {
            // console.log(data);
            let inMemoryToken = data.token;
            // console.log(inMemoryToken);
            localStorage.setItem('user', JSON.stringify(data));
            // console.log(localStorage)
            navigate("/upcomingAppointments");
            window.location.reload(false);//refresh page
        })
        .catch((error) => {
            alert("User does not exist or password does not match. Please check your password or register!")
            console.log(error.message);
            document.forms['myForm'].submit();
        });

        //request to a protected route
        // const localstorage_user = JSON.parse(localStorage.getItem('user'))
        // fetch("http://localhost:3000/welcome/", {
        //     method: 'get',
        //     headers: {
        //         'Content-Type': 'application/x-www-form-urlencoded',
        //         'Accept': 'application/json',
        //         'x-access-token' : localstorage_user.token,
        //     }

        // })
        // .then(res => res.json())
        // .then((res)=>{
        //     alert('test')
        //     console.log(res)
        //     }
        // )
        // .then(res => console.log(res))
    }
    
    function toggleForm(){
        setAsTutor(!asTutor);
        // console.log(asTutor);
        // console.log(1)
    }

    return (
        <div>
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6"> <h1>User Login</h1>
                    <form id="myForm">
                        <div className="form-group">
                            <label for="email">Email:</label>
                            <input type="text" className="form-control" placeholder="Email" id="email" />
                        </div>
                        <div className="form-group">
                            <label for="pwd">Password:</label>
                            <input type="password" className="form-control" placeholder="Password" id="pwd" />
                        </div>
                        <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input"  id="becomeTutor" onClick={toggleForm} />
                            <h5>I want to login as a tutor.</h5>
                        </div>
                        <input type="submit" className="btn btn-warning" value="Login" style={{ margin: 20 }} onClick={submitForm}/>
                    </form>
                </div>
                <div className="col-md-3"></div>
            </div>
        </div>
    );
    
}

export default Login;
