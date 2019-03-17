import React from 'react';
import {Form, Button, Container, Row, Col, Card} from 'react-bootstrap';

const Login = ({onInputChange, onLoginClick}) => {
    return (
        <div>
            <Container>
                <Row className="justify-content-md-center mx-auto">
                    <Col xs lg="6">
                        <Card className="card-signin my-5">
                            <Card.Body>    
                                <Card.Title className="text-left">LogIn</Card.Title>
                                <Card.Text>                
                                    <Form className="text-left">
                                        <Form.Group controlId="username">
                                            <Form.Label>Username</Form.Label>
                                            <Form.Control type="text" placeholder="Enter username" id="username" name="username" onInput = {onInputChange}/>
                                        </Form.Group>

                                        <Form.Group controlId="username">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type="password" placeholder="Password" id="password" name="password" onInput={onInputChange}/>
                                        </Form.Group>

                                        <Button variant="primary" type="button" id="signin" name="signin" onClick={onLoginClick}>
                                            Sign in
                                        </Button>
                                    </Form>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Login;