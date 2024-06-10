import {Container, Nav, Navbar, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';


const NavbarBook = () => {


  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="#">EpicBooks</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Link className='nav-link' to="/">Home</Link>
          <Link className='nav-link' to="/pubblica">Pubblica Articolo</Link>
          </Nav>

          <Nav className="justify-content-end align-items-center">
          <Link className='nav-link' to="/registrazione">Registrati</Link>
          <Link className='nav-link' to="/login"><Button className='btn btn-primary px-3'>Login</Button></Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarBook;