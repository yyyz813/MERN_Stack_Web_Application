import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
import { Link, useNavigate} from 'react-router-dom';
import './navbar.css'

const NavBar = (props) =>{
    let navigate = useNavigate();
    const [tutorInfo, setTutorInfo] = useState([]);
    var topRight = null;
    if(!props.isLogged){
        topRight = ( 
            <>
            <div className="text-end1" >
                <Link to="/login">
                <button id="login" type="button" className="btn btn-outline-light me-2" >Login</button>
                </Link>
            </div>
            <div className="text-end2" >
                <Link to="/signup">
                <button id="signup" type="button" className="btn btn-warning" >Sign-up</button>
                </Link>
            </div>
            </>
        )
    }else{
        topRight = (
            <div style={{marginLeft:"5%", marginRight:"5%"}}>
                {"Welcome, " + props.userName +' '}
                <button id="logOut" type="button" className="btn btn-warning" onClick={setLogOut}>Log Out</button>
            </div>
        )
    }

    useEffect(()=>{ // get all tutors 
        fetch('http://localhost:3000/allTutorsList', {
            headers : {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json'
            }
        })
        .then(res => res.json())
        .then((data) => {
            setTutorInfo(data);
        })
        .catch(console.log)
    },[])

    function searchFor(){
        var searchedList = [];
        var t = document.getElementById('searchText').value
        // console.log(t)
        tutorInfo.forEach((v0)=>{
            if(v0.name.toLowerCase().indexOf(t.toLowerCase()) === -1 && v0.subject.toLowerCase().indexOf(t.toLowerCase()) === -1){
              return
            }
            searchedList.push(v0);
        })
        // console.log(searchedList)
        props.setTutor(searchedList)
        navigate('/searchedTutors')
    }



    function setLogOut(){
        // props.setLogIn(false)
        localStorage.clear();
        navigate('/login');
        window.location.reload(false);//refresh page
    }

    return(
    <header className="p-3 bg-dark text-white fixed-top">
        <div className="container-fluid">       
        <Navbar className='myNavbar' bg="dark" expand="lg" variant="dark">
        <Container fluid>
            {/* <!--Insert Logo--> */}
            <Navbar.Brand>
                <img className="img-responsive" width="50px" height="50px" src="/img/masterball.png"/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
            <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
            >
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="#action1">FAQ</Nav.Link>
                <Nav.Link href="#action2">About</Nav.Link>
                <NavDropdown title="Link" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Navigate</NavDropdown.Item>
                <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                    Something else here
                </NavDropdown.Item>
                </NavDropdown>
            </Nav>
            <Form className="d-flex">
                <FormControl
                type="search"
                placeholder="Search..."
                className="me-2"
                aria-label="Search"
                id = "searchText"
                />
                <Button variant="outline-success" onClick={searchFor}>Search</Button>
            </Form>
            {/* <!--Sign in and log out--> */}
            
            {/* <div className="text-end1">
                <Link to="/login">
                <button id="login" type="button" className="btn btn-outline-light me-2"  >Login</button>
                </Link>
            </div>
            <div className="text-end2">
                <Link to="/signup">
                <button id="signup" type="button" className="btn btn-warning" >Sign-up</button>
                </Link>
            </div> */}
            
            {topRight}
            

            </Navbar.Collapse>
        </Container>
        </Navbar>
        </div>
    </header>
    )
}
export default NavBar