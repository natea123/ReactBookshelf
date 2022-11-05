import React, { useState } from 'react';
import {
    Row,
    Col,
    Container,
    Button,
    Modal,
    Form
} from 'react-bootstrap'

const BookShelf = ({ colCount, md }) => {

  const booksTest = [
        {
          id: 0,
          title: 'The Horde: How the Mongols changed the world',
          author: 'Marie Favereau'
        },
        {
          id: 1,
          title: 'The Horde: How the Mongols changed the world',
          author: 'Marie'
        }
      ]

  const [books, addBook] = useState(booksTest);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("")

  const submitValue = (event) => {
    //event.preventDefault();
    handleClose();
    addBook({id: books.length, title: title, author: author});
    buildGrid();
  }



    //The UI for the items to be shown inside the grid
  const Item = props => {
    //destrcture the props
    const { title, author } = props

    return (
      <div className='book'>
        <h3>{title}</h3>
        <p>Author: {author}</p>
      </div>
    )
  }
    
    let rowCount = Math.floor(books.length / colCount) + 1

    //Index is needed to keep track of the current element that we are one.
    let index = 0

    //This is the driver function for building the grid system.
    const buildGrid = () => {
        return (
            renderRows()
        )
    }

    //Returns For example, we can have a row with 2 columns inside it.
    const renderRows = () => {
        let rows = []
        
        for(let row = 0; row < rowCount; row++) {
            rows.push(
                <Row className='Row'>
                    {
                        renderCols()
                    }
                </Row>
            )
        }
        
        return rows
    }

    //Returns an array of columns with the children inside.
    const renderCols = () => {
        let cols = []
        
        //loop over books array and push to column as Item component
        for(let col = 0; col < colCount; col++) {
            if(index < books.length) {
                let item = books[index];
                cols.push(
                    <Col className='Col' md={md}>
                        <Item key={item.id} id={item.id} title={item.title} author={item.author} />
                    </Col>
                )
                index++
            }
        }
        
        return cols
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
                onChange={(e) => setTitle(e.target.value)}
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
                onChange={(e) => setAuthor(e.target.value)}
              />
            </Form.Group>
          </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>   
                <Button variant="primary" type="submit" onClick={ submitValue }>Add book</Button>
            </Modal.Footer>

        </Modal>

        <Container className='Container'>
            { buildGrid() }
        </Container>
        </>
    );
};

export default BookShelf;

