// imported from https://react-bootstrap.github.io/components/navbar/
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();

  return (
    <Navbar className='p-2' bg="dark" variant='dark' expand="lg">
      <Container>
        <Link className='navbar-brand' to='/'>Favorite authors</Link>
        <Navbar.Toggle aria-controls="header" />
        <Navbar.Collapse id="header">
          <Nav as='ul' className="me-auto">
            {location.pathname === '/' ? (
            <li className="nav-item">
              <Link className='nav-link' to='/new'>Add Author</Link>
            </li>
            ) : (
              <li className="nav-item">
                <Link className='nav-link' to='/'>Home</Link>
              </li>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;