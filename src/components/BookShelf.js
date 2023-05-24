import React, { useState, useEffect } from 'react';
import {
    Row,
    Col,
    Button,
    Modal,
    Form,
    Card
} from 'react-bootstrap'

const BookShelf = () => {

  const [books, addBook] = useState([])
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState(0);

  const getBooks = async () => {
    try {
      const response = await fetch('/api/books')
      const jsonData = await response.json()

      addBook(jsonData);
    } catch (err) {
      console.log(err.message);
    };
  };

  useEffect(() => {
    getBooks();
  }, [books]);

  const handleSubmit = async e => {
    e.preventDefault();
    handleClose();
    try {
      if (isbn !== 0) {

        const body = { isbn: isbn };
        const response = await fetch('/api/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });
        setIsbn(0);

      } else {

        const body = { author: author, title: title};
        const response = await fetch('/api/books', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });
        setTitle('');
        setAuthor('');
      }
      
    } catch (err) {
      console.error(err.message)
    }
    //setTitle('');
    //setAuthor('');
  }

    return (
        <>
  
        <Button variant="light" onClick={ handleShow }>+ Add New Book</Button>

        <Modal show={show} onHide={ handleClose }>

            <Modal.Header closeButton>
                <Modal.Title>Add book</Modal.Title>
            </Modal.Header>

            <Modal.Body>
            <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="War and Peace"
                autoFocus
                value={title}
                onChange={ (e) => setTitle(e.target.value) }
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Author</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Leo Tolstoy"
                value={author}
                onChange={ (e) => setAuthor(e.target.value) }
              />
            
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Optional: Add via ISBN</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="9780393966473"
                value={isbn}
                onChange={ (e) => setIsbn(e.target.value) }
              />
            
            </Form.Group>
          </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={ handleClose }>Close</Button>   
                <Button variant="primary" type="submit" onClick={ handleSubmit }>Add book</Button>
            </Modal.Footer>

        </Modal>

        <Row xs="auto">
        {books.map(book => (
          <Col>
            <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={book.img} />
            <Card.Body>
              <Card.Title>{ book.title }</Card.Title>
              <Card.Text>
                Author: { book.author }
              </Card.Text>
              <Button variant="primary">View Book</Button>
            </Card.Body>
          </Card>
        </Col>
        ))}
        </Row>
      </>
    );
};

export default BookShelf;

