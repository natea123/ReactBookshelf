import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react';


function Header() {
  return (
    <>
     <Navbar collapseOnSelect expand="xs" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>React Bookshelf</Navbar.Brand>
        <Navbar className="justify-content-end">
        </Navbar>
      </Container>
    </Navbar>
    </>
  );
}

export default Header;