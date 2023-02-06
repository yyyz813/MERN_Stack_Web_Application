import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import AddTutorForm from "./addTutorForm";

function Signup(props) {
    let navigate = useNavigate();
    const [asTutor, setAsTutor] = useState(false);

    function submitForm(e){

        //there will be one span element for each input field
        // when the page is loaded, we create them and append them to corresponding input elements 
        // they are initially empty and hidden
        //------------------------------------------
        //email
        var email = document.getElementById("email");
        var span1 = document.createElement("span");
        span1.style.display = "none"; //hide the span element
        email.parentNode.appendChild(span1);
        var span1Text = "Email should be in such format: '<prefix>@<domain_part1>.<domain_part2>' ";
        appendMessage(span1, span1Text);
        //pwd
        var pwd = document.getElementById("pwd");
        var span2 = document.createElement("span");
        span2.style.display = "none"; 
        pwd.parentNode.appendChild(span2);
        var span2Text = "Password should contain at least six characters, one uppercase letter, one number and one special character (!,@,#,$,%,^,&,*,+)";
        appendMessage(span2, span2Text);
        //confirm pwd
        var confirm = document.getElementById("confirm");
        var span3 = document.createElement("span");
        span3.style.display = "none"; 
        confirm.parentNode.appendChild(span3);
        var span3Text = "Password should match";
        appendMessage(span3, span3Text);
        //---functions-----
        //hint messages
        function appendMessage(span0, textMessage){
            var textNode = document.createTextNode(textMessage);
            span0.appendChild(textNode);
        }
        //email
        email.onfocus = function(){
            span1.style.display = "block";
            span1.textContent = span1Text;
        }
        email.onblur = function(){
            span1.style.display = "none";
            email.classList.remove("error");
        }
        //pwd
        pwd.onfocus = function(){
            span2.style.display = "block";
            span2.textContent = span2Text;
        }
        pwd.onblur = function(){
            span2.style.display = "none";
            pwd.classList.remove("error");
        }
        //confirm
        confirm.onfocus = function(){
            span3.style.display = "block";
            span3.textContent = span3Text;
        }
        confirm.onblur = function(){
            span3.style.display = "none";
            confirm.classList.remove("error");
        }
    
        //---submission validation---
        var form = document.getElementById("myForm");
        form.onsubmit = function(e){
            var flag = true;

            if(!email.value.match(/^(\w|\w\w|\w[-.\w]+\w)@(\w|\w\w|\w[-.\w]+\w)\.[a-zA-Z]+$/)){
                span1.style.display = "block";
                span1.textContent = "Please enter a valid email address!"
                email.classList.add("error");
                flag = false;
                e.preventDefault();
            }
            if(!pwd.value.match(/^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[!@#$%^&*+]).{6,}$/)){
                span2.style.display = "block";
                span2.textContent = "Please enter a valid password!"
                pwd.classList.add("error");
                flag = false;
                e.preventDefault();
            }
            if(pwd.value != confirm.value){
                span3.style.display = "block";
                span3.textContent = "Password does not match!"
                span2.style.display = "none";
                pwd.classList.add("error");
                confirm.classList.add("error");
                flag = false;
                e.preventDefault();
            }
            if (flag) {

                email.classList.remove('error');
                pwd.classList.remove('error');
                confirm.classList.remove('error');
                // username.classList.remove('error');

                var isTutor = document.getElementById("becomeTutor").checked;
                if(!isTutor){
                    // document.getElementById("myForm").submit();
                    
                    e.preventDefault();
                    
                    fetch("http://localhost:3000/" + props.entryPath, {

                        method: 'POST',
                        body: JSON.stringify({
                            username: document.getElementById("username").value,
                            email: document.getElementById("email").value,
                            password: document.getElementById("pwd").value
                        }),
                        headers: {
                            "Content-type": "application/json"
                        }  
                    })           
                    // .then(response => response.json())
                    .then(
                        fetch('http://localhost:3000/users/'+ document.getElementById("email").value, {
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            }
                        })
                        .then(res => res.json())
                        .then((res)=>{
                            // console.log(res)
                            if(res.length > 0){
                                alert("User already exist! Please login.")
                            }else{
                                alert("Suceessfully registered. Please login");
                            }
                        })
                    );
                    navigate("/login");
                    window.location.reload(false);//refresh page
                }
                
            }

            return flag;
        }
    
    
    }
    
    function toggleForm(){
        setAsTutor(!asTutor);
        // console.log(asTutor);
        // console.log(1)
    }

    var addTutor = null;
    var subButton = <input type="submit" className="btn btn-warning" value="Submit" onClick={submitForm} />

    if(asTutor){
        addTutor = <AddTutorForm/>
        subButton= null;
    }

    return (
        <div>
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6"> <h1>User Signup</h1>

                    <form id="myForm">
                        <div className="form-group">
                            <label for="username">UserName:</label>
                            <input type="text" className="form-control" placeholder="Name" id="username" />
                        </div>

                        <div className="form-group">
                            <label for="email">Email:</label>
                            <input type="text" className="form-control" placeholder="Email" id="email" />
                        </div>


                        <div className="form-group">
                            <label for="pwd">Password:</label>
                            <input type="password" className="form-control" placeholder="Password" id="pwd" />
                        </div>

                        <div className="form-group">
                            <label for="pwd">Confirm Password:</label>
                            <input type="password" className="form-control" placeholder="Password" id="confirm" />
                        </div>

                        <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input"  id="becomeTutor" onClick={toggleForm} />
                            <h5>I want to register as a tutor.</h5>
                        </div>

                        <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input" checked  id="agree"  />
                            <h5>I agree to the terms of service and privacy policy.</h5>
                        </div>

                        {addTutor}
                        {subButton}
                        {/* <input type="submit" className="btn btn-warning" value="Submit" onClick={submitForm} /> */}
                    </form>
                </div>
                <div className="col-md-3"></div>
            </div>
        </div>
    )
}

export default Signup;