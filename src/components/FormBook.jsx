import React from "react";
import { Form, Button, InputGroup, FormControl, Alert } from "react-bootstrap";

const FormBook = ({
  handleSubmit,
  formValue,
  setFormValue,
  flag,
  setFlag,
  clearForm,
}) => {
  return (
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
    </Form>
  );
};

export default FormBook;
