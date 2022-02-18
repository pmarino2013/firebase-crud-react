import React, { useEffect, useState } from "react";
import BookDataService from "../services/book.service";

import { Alert } from "react-bootstrap";
import FormBook from "./FormBook";

const AddBook = ({ id, setBookId, getBooks }) => {
  //Para el formulario
  const [formValue, setFormValue] = useState({
    title: "",
    author: "",
    status: "Available",
  });

  //mensaje cuando creo o actualizo libro
  const [message, setMessage] = useState({ error: false, msg: "" });

  //bandera para el status del libro
  const [flag, setFlag] = useState(true);

  //Cambio el status del libro si cambia la bandera
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

  //Ejecuto editHandle si cambia el valor de id
  useEffect(() => {
    if (id) {
      editHandler();
    }
  }, [id]);

  //traigo los datos del libro según su id y los cargo en el formulario
  const editHandler = async () => {
    setMessage("");
    try {
      const datosEditar = await BookDataService.getBook(id);
      console.log(datosEditar.data());
      setFormValue({
        title: datosEditar.data().title,
        author: datosEditar.data().author,
        status: datosEditar.data().status,
      });
    } catch (error) {
      setMessage({ error: true, msg: error.message });
    }
  };

  //Función que limpia el formulario e inicializa los estados
  const clearForm = () => {
    setFormValue({
      title: "",
      author: "",
      status: "Available",
    });
    setFlag(true);
    setBookId("");
    setMessage("");
  };

  //Función para guardar datos creados o actualizados
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
      if (id) {
        await BookDataService.updateBook(id, formValue);
        setBookId("");
        setMessage({ error: false, msg: "Updated Successfully" });
        getBooks();
      } else {
        await BookDataService.addBooks(newBook);
        setMessage({ error: false, msg: "New Book added" });
        getBooks();
      }
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
      <FormBook
        handleSubmit={handleSubmit}
        formValue={formValue}
        setFormValue={setFormValue}
        flag={flag}
        setFlag={setFlag}
        clearForm={clearForm}
      />
      {/* <Form onSubmit={handleSubmit}>
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
            }}
          />
        </InputGroup>
        <Button
          className="me-2"
          variant="secondary"
          onClick={clearForm}
          type="button"
        >
          Clear
        </Button>
        <Button variant="primary" type="submit">
          Add | Update
        </Button>
      </Form> */}
    </>
  );
};

export default AddBook;
