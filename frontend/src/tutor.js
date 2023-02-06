import React, { useState, useEffect } from 'react';
import StarRating from "./starRating.js";
import "./tutor.css"

const Tutors = (props) => {
    function toggleHeartColor(e){
        var heartObj = document.getElementById(e.target.id);
        // console.log(e.target.id)
        if(heartObj.style.color == 'red'){
            heartObj.style.color = "rgb(209,209,209)"
        }else{
            heartObj.style.color = "red";
        }
    }

    function setStar(rating){
        curRating = rating;
        console.log(curRating)
        return curRating;        
    }
    var curRating = 0;
    function expandCard(e){
        var heartId = "name" + e.target.id.substring(6);
        var curHeartColor = document.getElementById(heartId).style.color;
        var cardId = "card" +  e.target.id.substring(6);
        var cardSequence = document.querySelector("#"+cardId).getAttribute("seq");
        var content = props.tutorlist[cardSequence];

        curRating = setStar(content.rating);
        // console.log(content.rating)
        // console.log(curRating)
        setOpen(false)
        setExpand(true)
        var tempList = []
        tempList.push(
            <div className='col-md-8' key = '-1' style={{marginTop: "4.5%", marginLeft:"6%"}}>
                <div className="card" >
                <div className="card-body">
                    <h5 className="card-title">Name: {content.name} { }
                    <i id = {"name"+`${content.name}`} className="bi bi-heart-fill" style={{color:curHeartColor}} onClick={toggleHeartColor}></i>
                    </h5>
                    {/* <img className="card-img" src={"/img/"+`${content.name}`+".jpg"} alt="Card image cap" ></img> */}
                    <img className="card-img" src={`${content.img}`} alt="Card image cap" ></img>
                    <h6 className="card-subtitle mb-2 text-muted">Subject: {content.subject}</h6>
                    <p className="card-text">Description: {content.description}</p>
                    <div className="card-text">Rate this tutor: 
                    <div className='row justify-content-around'>
                        <div className='col-md-5' style={{padding:"0"}}><StarRating rating = {content.rating} dynamic = {true} returnStar = {setStar}/></div>
                        <div className='col-md-3' style={{padding:"0"}}>{setStar(curRating).toFixed(1)}</div>
                        <div className='col-md-2'></div>
                    </div>
                </div>
                </div>
                <div  className="card-footer" style={{background: "transparent", borderTop : "0%" } }>
                    <button type="button" className="btn btn-primary" onClick = {collapseCard}>Go back</button>
                </div>
                </div>
            </div> 
        )
        setTutorList1(tempList)

        
        // console.log(document.querySelector("#"+cardId).getAttribute("seq"))
        // console.log(content)
    }

    function collapseCard(){
        setOpen(true)
        setExpand(false)
    }

    const [open, setOpen] = useState(true);
    const [expand, setExpand] = useState(false);
    const [tutorList1, setTutorList1] = useState([]);
    var tutorList = [];
    let tutorRow = [];
    let _id = 0;
    props.tutorlist.forEach((v) => {
        let name = v.available ? v.name : 
        <span style={{color : 'red'}}>
            {v.name}
        </span>;
        tutorRow.push(
            <div className='col-md-4' id ={"card"+ `${v.name}`} seq = {_id} key = {_id} style={{marginTop: "2.5%"}}>
            <div className="card" >
            <div className="card-body">
                <h5 className="card-title">Name: {name} { }
                <i id = {"name"+`${v.name}`} className="bi bi-heart-fill" style={{color:"rgb(209,209,209)"}} onClick={toggleHeartColor}></i>
                </h5>
                {/* <img className="card-img-top" src={"/img/"+`${v.name}`+".jpg"} alt="Card image cap" ></img> */}
                <img className="card-img-top" src={`${v.img}`} alt="Card image cap" ></img>
                <h6 className="card-subtitle mb-2 text-muted">Subject: {v.subject}</h6>
                <div className="card-text">Overall Rating: 
                    <div className='row justify-content-around'>
                        <div className='col-md-5' style={{padding:"0"}}><StarRating rating = {v.rating} dynamic = {false} /></div>
                        <div className='col-md-3' style={{padding:"0"}}>{parseFloat(v.rating).toFixed(1)}</div>
                        <div className='col-md-2'></div>
                    </div>
                </div>
            </div>
            <div  className="card-footer" style={{background: "transparent", borderTop : "0%" } }>
                <button id = {"button"+`${v.name}`} type="button" className="btn btn-primary" onClick = {expandCard}>Details</button>
                
            </div>
            </div>
            </div> 
        );
        // console.log(tutorRow);
        if(_id % 3 == 2 || _id == props.tutorlist.length - 1){ // split into rows, each row 3 cols, reset each row at right
            tutorList.push(
                <div className='row justify-content-around' key={props.tutorlist.length + _id}  style={{marginLeft: "2%", marginRight: "0%", marginTop:"0%"}}>
                    {tutorRow}
                </div>            
            );
            tutorRow = [];
        }
        _id++;
    });
    // console.log(tutorList , _id)
    // const [tutorListNow, setTutorListNow] = useState([]);

    // function changeState(){
    //     setTutorListNow(tutorList);
    // }
    // useEffect(changeState(),tutorList);
    
    // tutorListNow = tutorList
    // console.log(tutorListNow , _id)
    
    return (
    <div>
        {open && tutorList}
        {expand && tutorList1}
    </div>
    );
}

export default Tutors;
