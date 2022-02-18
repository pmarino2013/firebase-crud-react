import React, { useEffect, useState } from "react";
import BookDataService from "../services/book.service";
import { Table, Button } from "react-bootstrap";

const BookList = ({ getBookId, books, loading, getBooks }) => {
  // const [books, setBooks] = useState([]);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBooks();
  }, []);

  // const getBooks = async () => {
  //   const data = await BookDataService.getAllBooks();
  //   console.log(data.docs);
  //   setBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   setLoading(false);
  // };

  const deleteHandler = async (id) => {
    await BookDataService.deleteBook(id);
    getBooks();
  };

  return (
    <>
      {/* <pre>{JSON.stringify(books, undefined, 2)}</pre> */}
      {loading ? (
        <h3>Cargando tabla...</h3>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Book Title</th>
              <th>Book author</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {books.map((doc, index) => (
              <tr key={doc.id}>
                <td>{index + 1}</td>
                <td>{doc.title}</td>
                <td>{doc.author}</td>
                <td>{doc.status}</td>
                <td>
                  <Button
                    className="me-2"
                    variant="warning"
                    onClick={() => getBookId(doc.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => deleteHandler(doc.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default BookList;
