import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import InvoiceForm from './components/InvoiceForm';

class App extends Component {
  render() {
    return (
      <div className="App d-flex flex-column align-items-center w-100">
        <Navbar bg="white" className="w-100 shadow-sm py-3 mb-3 border-bottom">
          <Container>
            <Navbar.Brand className="fw-bold fs-3 text-primary d-flex align-items-center">
              Invoicy
            </Navbar.Brand>
          </Container>
        </Navbar>
        <Container>
          <InvoiceForm/>
        </Container>
      </div>
    );
  }
}

export default App;
