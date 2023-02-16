import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';

class CreateBook extends React.Component {

    render() {
        return (
            <Container>
                <Form onSubmit={this.props.handleBookSubmit}>
                    <Form.Group controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" />
                    </Form.Group>
                    <Form.Group controlId='description'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text"/>
                    </Form.Group>
                    <Form.Group controlId="available">
                        <Form.Check type="checkbox" label="available" />
                    </Form.Group>
                    <Button type="submit">Add Book</Button>
                </Form>
            </Container>
        )
    }
}

export default CreateBook;
