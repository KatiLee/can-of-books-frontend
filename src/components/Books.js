import React from 'react';
import { Button, Container, ListGroup } from 'react-bootstrap';
import UpdateBookForm from './UpdateBookForm';

class Books extends React.Component {

constructor(props) {
    super(props);
    this.state ={
        showUpdateForm: false,
    };
}

    render(){
        console.log(this.props.books, 'thispropsbooks');
        let books = this.props.books.map((book) => (
            <Book 
            book={book} 
            key={book._id} 
            deleteBooks={this.props.deleteBooks}
            updateBooks={this.props.updateBooks}/>
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
            <>
            <ListGroup.Item>
                {this.props.book.title}
                <Button
                variant="warning"
                onClick={() => this.props.deleteBooks(this.props.book._id)}>Delete Book
                </Button>
                <Button
                variant="success"
                onClick={()=> this.setState({ showUpdateForm: true })}
                >
                    Update
                </Button>
            </ListGroup.Item>
            {this.state.showUpdateForm &&
            <UpdateBookForm
            updateBooks={this.props.updateBooks}
            book={this.props.cat}
            />
            }
         </>
        );
    }
}

export default Books;