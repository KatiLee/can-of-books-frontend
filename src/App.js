import React from "react";
import axios from "axios";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import Carousel from 'react-bootstrap/Carousel';
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
        <header>
          <h1>Neat Books in our DB</h1>
        </header>
        <main>
          {this.state.books.length > 0 ? (
          <Carousel>{books}</Carousel>
        ) : (
          <p>The book collection is empty.</p>
        )}
        </main>
      </>
    );
  }

}

export default App;
