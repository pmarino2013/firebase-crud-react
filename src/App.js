import { useState } from "react";
import BookDataService from "./services/book.service";
import AddBook from "./components/AddBook";
import BookList from "./components/BookList";

function App() {
  const [bookId, setBookId] = useState("");

  // para Lista de la tabla
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const getBooks = async () => {
    const data = await BookDataService.getAllBooks();
    console.log(data.docs);
    setBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setLoading(false);
  };

  //--------------------------------------------------

  const getBookIdHandler = (id) => {
    console.log("El id del libro es", id);
    setBookId(id);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-6 offset-md-3">
          <h1>Lista de LIbros</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-6 offset-md-3">
          <AddBook id={bookId} setBookId={setBookId} getBooks={getBooks} />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-12 col-md-8 offset-md-2">
          <BookList
            getBookId={getBookIdHandler}
            books={books}
            loading={loading}
            getBooks={getBooks}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
