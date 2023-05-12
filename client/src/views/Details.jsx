import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Card } from 'react-bootstrap'

const Detail = (props) => {
  const [author, setAuthor] = useState({})
  const { id } = useParams()

  useEffect(() => {
    axios.get(`http://localhost:8000/api/authors/${id}`)
      .then((res) => setAuthor(res.data.results))
      .catch((err) => console.log(err))
  }, [id]);

  return (
    author &&
    <Card className='shadow'>
      <Card.Header as='h1'>Author Details</Card.Header>
      <Card.Body>
        <Card.Title><strong>Author Name:</strong>  <em>{author.name}</em></Card.Title>
      </Card.Body>
    </Card>
  )
}

export default Detail