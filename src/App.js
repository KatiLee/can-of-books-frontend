import React from "react";
import axios from "axios";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import CreateBook from "./components/CreateBook"
import Carousel from 'react-bootstrap/Carousel';
import Books from "./components/Books";
import { Container } from "react-bootstrap";
let SERVER = process.env.REACT_APP_SERVER;
// add to env

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
  }

  getBooks = async () => {
    try {
      let results = await axios.get(`${SERVER}/books`);
      console.log("results frokm apiu", results);
      this.setState({
        books: results.data,
      });
    } catch (error) {
      console.log("error:", error.response.data);
    }
  };

  handleBookSubmit = async (event) => {
    event.preventDefault();
    let newBook = {
      title: event.target.title.value,
      description: event.target.description.value,
      available: event.target.available.checked
    };
    console.log(newBook);
    this.postBook(newBook);
  };
postBook = async (newBookObject) => {
  try {
    let url = `${SERVER}/books`;
    let createdBook = await axios.post(url, newBookObject);
    console.log(createdBook);
    this.setState({
      books: [...this.state.books, createdBook.data],
    });
  } catch (error){
    console.log('error: ', error.response.data);
  }
};
deleteBooks = async (id) => {
  try {
    let url = `${SERVER}/books/${id}`;
    await axios.delete(url);
    let updatedBooks = this.state.books.filter((book) => book._id !== id);
    this.setState({
      books: updatedBooks,
    })
  } catch (error) {
    console.log('we have errors: ', error.response.data);
  }
};


  componentDidMount() {
    this.getBooks();
  }

  render() {
    let books = this.state.books.map((book) => (
      <Carousel.Item key={book._id}>
        <img
        className="d-block w-100"
        src={'http://via.placeholder.com/840x360'}
        alt="First slide"
      />
      <Carousel.Caption>
        <p>
          {book.title} is about {book.description}
        </p>
        </Carousel.Caption>
      </Carousel.Item>
    ));
    return (
      <>
        
        <Container>

          <h1>Neat Books in our DB</h1>
          {this.state.books.length > 0 && (
            <>
              <Books
              books={this.state.books}
              deleteBooks={this.deleteBooks}
              />
            </>
           /* <Carousel>{books}</Carousel> */
         /* ) : ( */
          /* <p>The book collection is empty.</p> */
        )}
        <CreateBook handleBookSubmit={this.handleBookSubmit} />
        </Container>
      </>
    );
  }
}

export default App;
