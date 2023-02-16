import React from 'react';
import { Button, Container, ListGroup } from 'react-bootstrap';


class Books extends React.Component {

    render(){
        console.log(this.props.books, 'thispropsbooks');
        let books = this.props.books.map((book) => (
            <Book book={book} key={book._id} deleteBooks={this.props.deleteBooks}/>
        ));
        return(
            <Container>
                <ListGroup>{books}</ListGroup>
            </Container>
        );
    }
}

class Book extends Books {

    render(){
        return(
            <ListGroup.Item>
                {this.props.book.title}
                <Button
                variant="success"
                onClick={() => this.props.deleteBooks(this.props.book._id)}>Delete Book</Button>
            </ListGroup.Item>
        )
    }
}

export default Books;