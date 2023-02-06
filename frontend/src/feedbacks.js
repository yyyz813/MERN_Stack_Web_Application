import { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";

function Feedbacks(props){
    let navigate = useNavigate();
    const [tutorInfo, setTutorInfo] = useState([]);
    const [tutorList, setTutorList] = useState([]);
    var curUser = null;
    // console.log(localStorage)
    useEffect(()=>{ // get all tutors in dropdown select
        fetch('http://localhost:3000/allTutorsList', {
            headers : {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json'
            }
        })
        .then(res => res.json())
        .then((data) => {
            setTutorInfo(data);
            getList(data);
        })
        .catch(console.log)
    },[])
    
    useEffect(()=>{
        fetch('http://localhost:3000/users/' + props.userEmail, {
            headers : {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json'
            }
        })
        .then(res => res.json())
        .then((data) => {
            // console.log(data)
            if(data.length == 0){
                alert("Please login first!")
                navigate('/login')
            }else{
                curUser = data[0].username
                // console.log(curUser)
            }
        })
        .catch(console.log)
    },[])

    // console.log(tutorInfo)
    function getList(t){
        var tutorL = [];
        for(let i = 0; i < t.length; i++){
            // console.log(t[i])
            tutorL.push(
                <option key = {i}>{t[i].name}</option>
            )
        }
        setTutorList(tutorL)
        return tutorL;
    }

    function updateForm(e){
        e.preventDefault();// cannot be in a promise
        var curComment = [];
        
        fetch('http://localhost:3000/allTutorsList/' + document.getElementById("name").value, {
            headers : {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json'
            }
        })
        .then(res => res.json())
        .then((data) => {
            // console.log(data)
            if(data.length == 0){
                alert("Please login first!")
                navigate('/login')
            }else{
                curComment = data[0].comment
                // console.log(curComment)
                var curLen = data[0].comment.length
                var curRating = data[0].rating
                var curWeightTol = curLen * curRating
                // console.log(parseFloat(document.getElementById("rate").value))
                curComment.push(props.userName + ": " + document.getElementById("comment").value)
                // console.log(curComment)
                fetch("http://localhost:3000/allTutorsList/comments/"+ document.getElementById("name").value , {
                    method:"PUT",
                    body: JSON.stringify({
                        comment: curComment,
                        rating: (curWeightTol + parseFloat(document.getElementById("rate").value)) / (curLen + 1)
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
                        document.forms['feedbackForm'].submit();
                    }else{
                        alert("successfully updated the infor of the tutor: " + document.getElementById("name").value);
                        document.forms['feedbackForm'].submit();
                    }
                })
            }
        })
        .catch(console.log)
        
        
        
    }

    return(
        <Form id = 'feedbackForm'>
        {/* contents */}
        <Form.Group >
            <Form.Label>Select the Tutor</Form.Label>
            <Form.Select style={{width:"30%"}} id = "name">
                {tutorList}
            </Form.Select>
        </Form.Group>
        <Form.Group  >
            <Form.Label>Rate the Tutor</Form.Label>
            <Form.Select style={{width:"10%"}} id = "rate">
                <option>5</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
                <option>1</option>
            </Form.Select>
        </Form.Group>
        <Form.Group className="w-55" >
            <Form.Label>Comment</Form.Label>
            <Form.Control as="textarea" rows={3} id='comment'  placeholder="Please type your comment here."/>
        </Form.Group>

        {/* Button */}
        <Button type='submit' variant="primary" id="submitForm" style={{marginTop:'2%'}} onClick={updateForm}>
            Submit
        </Button>
        </Form>
    )
}
export default Feedbacks