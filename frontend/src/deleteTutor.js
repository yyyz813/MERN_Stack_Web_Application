import { Form, Button } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";

function DeleteTutor(e){
    let navigate = useNavigate();
    function deleteTutor(e){
        e.preventDefault();// cannot be in a promise
        fetch("http://localhost:3000/allTutorsList/" + document.getElementById("name").value, {
            method:"DELETE",
            headers:{
                "Content-type":"application/json"
            }
        })
        // .then(res => {
        //     console.log(res)
        //     console.log(res.body)
        //     if(!res.n){//n = 0 means not found
        //         alert('tutor not found, delete failed')
        //         // document.forms['myDelete'].submit();
        //     }else{
        //         alert("successfully deleted a tutor " + document.getElementById("name").value);
        //         // document.forms['myDelete'].submit();
        //     }
        // })
        .catch(err => {
            console.log(err)
            alert("no such tutor in file");
            document.forms['myDelete'].submit();
        })
        document.forms['myDelete'].submit();
        // navigate("/addTutor");
    }

    return(
        <Form id='myDelete'>
        
        {/* contents */}
        <Form.Group className="w-50"  >
            <Form.Label>Delete a Tutor by Name</Form.Label>
            <Form.Control type="text" id='name' placeholder="Please enter the name of the tutor"/>
        </Form.Group>
            
        {/* Button */}
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Make sure you want to delete." />
        </Form.Group>
        <Button type='submit' variant="primary" id="delete" onClick={deleteTutor}>
            Delete
        </Button>
        
        </Form>
    )
}


export default DeleteTutor;