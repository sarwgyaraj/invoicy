import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { BiReceipt } from 'react-icons/bi';
import InvoiceForm from './components/InvoiceForm';

class App extends Component {
  render() {
    return (
      <div className="App d-flex flex-column align-items-center w-100">
        <Navbar className="glass-navbar w-100 py-3 mb-4 sticky-top">
          <Container className="d-flex align-items-center justify-content-between">
            <Navbar.Brand className="fw-bold fs-4 text-primary d-flex align-items-center m-0">
              <div className="brand-icon-wrapper me-2">
                <BiReceipt size={22} />
              </div>
              <span className="fw-bold" style={{ letterSpacing: '-0.02em' }}>Invoicy</span>
              <span className="badge bg-primary bg-opacity-10 text-primary ms-3 border border-primary border-opacity-25 fw-semibold py-1 px-2" style={{ fontSize: '0.72rem' }}>
                Generator
              </span>
            </Navbar.Brand>
            <div className="d-none d-sm-flex align-items-center text-secondary small">
              <span className="d-inline-block rounded-circle bg-success me-2" style={{ width: '8px', height: '8px' }}></span>
              Ready
            </div>
          </Container>
        </Navbar>
        <Container className="mb-5" style={{ maxWidth: '1200px' }}>
          <InvoiceForm />
        </Container>
      </div>
    );
  }
}

export default App;
