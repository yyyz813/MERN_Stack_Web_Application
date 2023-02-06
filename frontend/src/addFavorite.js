import React, { useState, useEffect } from 'react';
import Card from "react-bootstrap/Card";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default function AddFavorite(props) {
    const [favorites, setFavorites] = useState([]);
    const [name, setName] = useState([]);
    var name1 = name;

    // fetch data from tutors collection, acquire tutor names.
    useEffect(() => {

        // location could change to users database + ID
        fetch('http://localhost:3000/allTutorsList/', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then((response) => {
                setFavorites(response);
            })
            .catch((error) => {
                console.log(error.message);
            })


    }, []);

    function handleFavorite(name0) {

        const newFavorites = favorites.map(item => {

            if (item.name === name0) {

                setName(name.concat([item.name]));
                // console.log(name)
                // console.log(favorites)

                fetch("http://localhost:3000/users/"+props.userEmail, {

                    method: 'PUT',  // Update
                    body: JSON.stringify({
                        favlist: name
                    }),
                    headers: {
                        "Content-type": "application/json"
                    }

                })
                .then(response => response.json())
                    // .then(json => console.log(json));

            }

            return item.name === name0 ? { ...item, favorite: !item.favorite } : item;

        });

        setFavorites(newFavorites);
        alert("Successfully liked");
    }

    function handleDelete(name0) {

        const newFavorites = favorites.map(item => {
            // console.log(": "+ name0)
            // console.log(item.name)
            if (item.name === name0) {

                name1.pop([item.name]);
                //setName(name.pop([item.name]));
                // console.log(name1)

                fetch("http://localhost:3000/users/"+props.userEmail, {

                    method: 'PUT',  // Update
                    body: JSON.stringify({
                        favlist: name1
                    }),
                    headers: {
                        "Content-type": "application/json"
                    }

                })
                .then(response => response.json())
                    // .then(json => console.log(json));


            }

            return item.name === name0 ? { ...item, favorite: !item.favorite } : item;

        });
        setFavorites(newFavorites);
        alert("Successfully Disliked");
    }


    return (
        <div className="App">
            <h1>Tutor List</h1>
            <ul>
                {favorites.map((item, i) => (

                    <Card border="info" className="text-center" key={i}>
                        <Card.Header as="h5" className="bg-dark text-white"></Card.Header>
                        <Card.Body>
                            <Row>
                                <Col fluid sm={4}>
                                    <ul> Tutor Name : {item.name}</ul>
                                </Col>
                                <Col fluid sm={8} >

                                    <button className="bi bi-heart-fill" style={{ color: "rgb(255,0,0)" }}
                                        onClick={() => {
                                            handleFavorite(item.name);
                                        }}
                                    >
                                        {"Like"}
                                    </button>

                                    <button className="bi bi-heart-fill" style={{ color: "rgb(209,209,209)" }}
                                        onClick={() => {
                                            handleDelete(item.name);
                                        }}
                                    >
                                        {"Unlike"}
                                    </button>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>

                ))}
            </ul>

            <h1>Favorite list</h1>
            <ul>
                {favorites.map(item =>
                    item.favorite === true ? <Card.Img className="rounded img-fluid float-left" src={item.img}></Card.Img> : null
                )}
            </ul>
        </div>
    );
}