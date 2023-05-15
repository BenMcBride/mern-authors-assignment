import { useState, useEffect } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

const AuthorUpdate = (props) => {
  const [author, setAuthor] = useState(null);
  const { id } = useParams();
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
      .patch(`http://localhost:8000/api/authors/update/${id}`, author)
      .then((res) => {
        console.log(res);
        setAuthor({
          name: ''
        });
        setErrors(null)
        navigate('/');
      })
      .catch((err) => {
        console.log(err)
        setErrors(err?.response?.data?.errors)
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/authors/${id}`)
      .then((res) => {
        setAuthor(res.data.results);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const cancelHandler = () => {
    navigate('/');
  };

  return (
    author ? (
      <Card className="mb-3">
        <Card.Header>
          <h1>Edit this author:</h1>
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
              <Button type="submit">Update Author</Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    ) : <Card.Header><h3>We're sorry, but we could not find the author you are looking for. Would you like to add this author to our database?</h3><br/><Link to='/new'>Would you Like to add an Author?</Link></Card.Header>
  );
};
export default AuthorUpdate;
