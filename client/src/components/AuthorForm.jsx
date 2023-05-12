import { useState, useEffect } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const AuthorForm = (props) => {
  const [author, setAuthor] = useState({
    name: ''
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState(null);

  const changeHandler = (e) => {
    setAuthor({
      ...author,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8000/api/authors/new', author)
      .then((res) => {
        console.log(res);
        setAuthor({
          name: ''
        });
        setErrors(null)
        props.setLoaded(false);
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
        setErrors(err?.response?.data?.errors);
      });
  };

  const cancelHandler = () => {
    navigate('/');
  };

  return (
    <Card className="mb-3">
      <Card.Header>
        <h1>Add a new author:</h1>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="name">Name:</Form.Label>
            <Form.Control
              type="text"
              onChange={changeHandler}
              value={author.name}
              name="name"
              id="name"
              className={`${errors?.name ? 'is-invalid' :''}`}
            />
            {errors?.name && <Form.Text className='text-danger'>{errors.name.message}</Form.Text>}
          </Form.Group>
          <Form.Group className="text-center">
            <Button type="button" onClick={cancelHandler}>Cancel</Button>
            <Button type="submit">Add Author</Button>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
};
export default AuthorForm;
