import React, { useEffect, useState } from "react";
import BookDataService from "../services/book.service";

import { Form, Button, InputGroup, FormControl, Alert } from "react-bootstrap";

const AddBook = () => {
  const [formValue, setFormValue] = useState({
    title: "",
    author: "",
    status: "Available",
  });

  const [message, setMessage] = useState({ error: false, msg: "" });
  const [flag, setFlag] = useState(true);

  useEffect(() => {
    if (flag) {
      setFormValue({
        ...formValue,
        status: "Available",
      });
    } else {
      setFormValue({
        ...formValue,
        status: "Not available",
      });
    }
  }, [flag]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    if (formValue.title === "" || formValue.author === "") {
      setMessage({ error: true, msg: "All fields are mandatory!" });
      return;
    }

    const newBook = {
      title: formValue.title,
      author: formValue.author,
      status: formValue.status,
    };

    // console.log(newBook);

    try {
      await BookDataService.addBooks(newBook);
      setMessage({ error: false, msg: "New Book added" });
    } catch (error) {
      setMessage({ error: true, msg: error.message });
    }

    setFormValue({
      ...formValue,
      title: "",
      author: "",
    });
  };
  return (
    <>
      {message?.msg && (
        <Alert
          variant={message?.error ? "danger" : "success"}
          dismissible
          onClose={() => setMessage("")}
        >
          {message?.msg}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">A</InputGroup.Text>
          <FormControl
            placeholder="Title"
            aria-label="Title"
            aria-describedby="basic-addon1"
            name="title"
            value={formValue.title}
            onChange={({ target }) =>
              setFormValue({ ...formValue, [target.name]: target.value })
            }
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">B</InputGroup.Text>
          <FormControl
            placeholder="Author"
            aria-label="Author"
            aria-describedby="basic-addon1"
            name="author"
            value={formValue.author}
            onChange={({ target }) =>
              setFormValue({ ...formValue, [target.name]: target.value })
            }
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <Form.Check
            type="switch"
            id="custom-switch"
            label={formValue.status}
            checked={flag}
            onChange={({ target }) => {
              setFlag(target.checked);
              console.log(target.checked);
            }}
          />
        </InputGroup>
        <Button variant="primary" type="submit">
          Add Book
        </Button>
      </Form>
    </>
  );
};

export default AddBook;
