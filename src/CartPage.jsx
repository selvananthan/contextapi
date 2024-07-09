import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import { Container, Row, Col, Button, Card, Form } from 'react-bootstrap';

const CartPage = () => {
    const { state, dispatch } = useContext(CartContext);

    const increaseQuantity = (id) => {
        dispatch({ type: 'INCREASE_QUANTITY', payload: { id } });
    };

    const decreaseQuantity = (id) => {
        dispatch({ type: 'DECREASE_QUANTITY', payload: { id } });
    };

    const removeItem = (id) => {
        dispatch({ type: 'REMOVE_ITEM', payload: { id } });
    };

    const totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
    const totalAmount = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <Container>
            <h1 className="my-4">Cart</h1>
            {state.items.map(item => (
                <Card className="mb-4" key={item.id}>
                    <Card.Body>
                        <Row className="align-items-center">
                            <Col md={2}>
                                <Card.Img variant="top" src={item.image} alt={item.name} />
                            </Col>
                            <Col md={4}>
                                <Card.Title>{item.name}</Card.Title>
                                <Card.Text>Details & Care</Card.Text>
                                <Card.Text>Sustainability</Card.Text>
                            </Col>
                            <Col md={2} className="d-flex align-items-center">
                                <Button variant="secondary" onClick={() => decreaseQuantity(item.id)}>-</Button>
                                <Form.Control 
                                    type="text" 
                                    value={item.quantity} 
                                    readOnly 
                                    style={{ width: '50px', textAlign: 'center', margin: '0 10px' }} 
                                />
                                <Button variant="secondary" onClick={() => increaseQuantity(item.id)}>+</Button>
                            </Col>
                            <Col md={2}>
                                <h5>${(item.price * item.quantity).toFixed(2)}</h5>
                            </Col>
                            <Col md={2}>
                                <Button variant="link" onClick={() => removeItem(item.id)}>Remove</Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            ))}
            <Card className="mt-5">
                <Card.Body>
                    <Row>
                        <Col md={{ span: 2, offset: 8 }}>
                            <h5>Subtotal: ${totalAmount.toFixed(2)}</h5>
                            <h5>Shipping: FREE</h5>
                            <h5>Total: ${totalAmount.toFixed(2)}</h5>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default CartPage;
