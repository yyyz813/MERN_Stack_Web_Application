import React from "react";
import { Container, Row, Col } from 'react-bootstrap'

const FooterPage = () => {
    return (

        <footer color="blue" className="font-small pt-4 mt-4">
            <hr className="border-dark border-40 border-top "></hr>
            <Container fluid className=" text-md-left">
                <Row>
                    <Col md="8">
                        <h5 className="title">Contact</h5>
                        <p>
                            For more information please contact us via the links and check out our operating time.
                        </p>
                    </Col>
                    <Col md="2">
                        <h5 className="title" mb="3">Links</h5>
                        <ul className="list-unstyled">
                            <li>
                                <a href="#!">Classes</a>
                            </li>
                            <li>
                                <a href="#!" >Pricing</a>
                            </li>
                            <li>
                                <a href="#!">Assistance</a>
                            </li>
                        </ul>
                    </Col>
                    <Col md="2">
                        <h5 className="title">opening hours</h5>
                        <ul className="list-unstyled">
                            <li>
                                Mon - Fri: 8am - 9pm
                            </li>
                            <li>
                                Sat - Sun: 8am - 1am
                            </li>
                        </ul>
                    </Col>
                </Row>
            </Container>
            <div className="footer-copyright text-center py-3">
                <Container fluid>
                    <Col className="text-center py-3 footer-text-color">Copyright &copy; Pokémon</Col>
                </Container>
            </div>
        </footer>

    );
}

export default FooterPage;