import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import BookShelf from './components/BookShelf';


function App() {

  return (
    <div className="App">
      <BookShelf colCount={2} md={6} />
    </div>
  );
}

export default App;
