import axios from 'axios'
import { Card, Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const AuthorList = (props) => {
  const deleteHandler = (id) => {
    axios.delete(`http://localhost:8000/api/authors/delete/${id}`)
      .then(res => {
        console.log(res.data);
        props.setLoaded(false);
      })
      .catch(err => console.log(err))
  }

  return (
    <Card>
      <Card.Header as='h3'>All Authors</Card.Header>
      <Card.Body>
        <Table>
          <thead>
            <tr>
              <th>Author Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {props.authors.sort((a, b) => {
              const nameA = a.name.toUpperCase();
              const nameB = b.name.toUpperCase();
              if (nameA < nameB) return -1;
              if (nameA > nameB) return 1;
              return 0;
              }).map((author) => (
              <tr key={author._id}>
                <td className='align-middle'><Link to={`/${author._id}`}>{author.name}</Link></td>
                <td className='align-middle'>
                  <Link className='btn btn-primary me-2' to={`/edit/${author._id}`}>Edit</Link>
                  <Button variant='danger' onClick={() => deleteHandler(author._id)} >Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  )
}

export default AuthorList