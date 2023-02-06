import { Form, Button } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";

function AddTutorForm(){
    let navigate = useNavigate();
    function submitForm(e){
        e.preventDefault();
        fetch("http://localhost:3000/allTutorsList", {
            method:"POST",
            body: JSON.stringify({
                username: document.getElementById("username") ? document.getElementById("username").value : null,
                email: document.getElementById("email") ? document.getElementById("email").value : null,
                password: document.getElementById("pwd") ? document.getElementById("pwd").value : null,
                name:document.getElementById("name").value,
                subject:document.getElementById("subject").value,
                description:document.getElementById("description").value,
                rating:0,
                available:true,
                img:"/img/" + document.getElementById("picture").value.split('\\').pop(),
                comment:[],
            }),
            headers:{
                "Content-type":"application/json"
            }
        })
        .then(res => res.json())
        // .then(console.log("/img/" + document.getElementById("picture").value.split('\\').pop()));
        alert("successfully added a new tutor " + document.getElementById("name").value);
        navigate("/login");
        window.location.reload(false);//refresh page
    }

    function updateForm(e){
        e.preventDefault();// cannot be in a promise
        fetch("http://localhost:3000/allTutorsList/selfUpdate/"+ document.getElementById("name").value, {
            method:"PUT",
            body: JSON.stringify({
                name:document.getElementById("name").value,
                subject:document.getElementById("subject").value,
                description:document.getElementById("description").value,
                // rating:0,
                available:true,
                img:"/img/" + document.getElementById("picture").value.split('\\').pop()
            }),
            headers:{
                "Content-type":"application/json"
            }
        })
        .then(res => res.json())
        .then(res => {
            // console.log(res)
            if(!res.n){//n = 0 means not found
                alert('tutor not found, update failed')
                document.forms['myForm1'].submit();
            }else{
                alert("successfully updated the infor of the tutor: " + document.getElementById("name").value);
                document.forms['myForm1'].submit();
            }
        })
        
        // navigate("/addTutor");
    }
    return(
        <Form id = 'myForm1'>
        {/* <Form.Group className="w-50" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Please enter your email" />
            <Form.Text className="text-muted">
            We'll never share your email with anyone else.
            </Form.Text>
        </Form.Group> */}
        {/* contents */}
        <Form.Group className="w-55"  >
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" id='name' placeholder="Please enter your name"/>
        </Form.Group>
        <Form.Group className="w-55"  >
            <Form.Label>Subjects</Form.Label>
            <Form.Control type="text" id='subject' placeholder="Please enter the subjects you want to teach"/>
        </Form.Group>
        <Form.Group className="w-55" >
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" id='description'  placeholder="Please enter a brief introduction of yourself"/>
        </Form.Group>
        <Form.Group className="w-55">
            <Form.Label>Upload a Picture</Form.Label>
            <Form.Control type="file" id='picture'/>
        </Form.Group>
    
        {/* Button */}
        <Form.Group className="w-55" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Agree to the conditions" />
        </Form.Group>
        <Button type='submit' variant="primary" id="submitForm" onClick={submitForm}>
            Apply
        </Button>
        {'  '}
        <Button type='submit' variant="secondary" id="update" onClick={updateForm}>
            Update
        </Button>
        </Form>
    )
}


export default AddTutorForm;