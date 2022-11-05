import React from 'react';
import Button from 'react-bootstrap/Button';

function AddBook() {

    return (
      <>
       <Button variant="light" onClick={ this.props.onClick }>+ Add New Book</Button>{' '}
      </>
    );
  }
  
  export default AddBook;