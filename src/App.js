import React from "react";
import axios from "axios";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateBook from "./components/CreateBook.js"
import Books from "./components/Books.js";
import { Container } from "react-bootstrap";
let SERVER = process.env.REACT_APP_SERVER;

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
    this.postBooks(newBook);
  };

postBooks = async (newBookObject) => {
  console.log('hello can we post?', newBookObject)
  try {
    let url = `${SERVER}/books`;
    let createdBook = await axios.post(url, newBookObject);
    console.log(createdBook, 'createbook?');
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

updateBooks = async (bookToUpdate) => {
  try {
    let updateURL = `${SERVER}/books/${bookToUpdate._id}`;
    let newUpdatedBook = await axios.put(updateURL, bookToUpdate);
    console.log(newUpdatedBook);
    let updatedBook = this.state.books.map((existingBook) => {
      return existingBook._id === bookToUpdate._id
        ? newUpdatedBook.data
        : existingBook;
    });
    this.setState({
      books: updatedBookArray,
    });
  } catch (error) {}
};

  componentDidMount() {
    this.getBooks();
  }

  render() {
    return (
      <>
        <Container>
          <>
            <h1>Neat Books in our DB</h1>
            {this.state.books.length > 0 && (
              <>
                <Books
                books={this.state.books}
                deleteBooks={this.deleteBooks}
                updateBooks={this.updateBooks}
                />
           </>
        )}
        </>
        <CreateBook handleBookSubmit={this.handleBookSubmit} />
        </Container>
      </>
    );
  }
}

export default App;
