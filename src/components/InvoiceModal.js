import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import { BiPaperPlane, BiCloudDownload, BiX } from "react-icons/bi";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function GenerateInvoice() {
  html2canvas(document.querySelector("#invoiceCapture"), {
    scale: 2,
    useCORS: true
  }).then((canvas) => {
    const imgData = canvas.toDataURL('image/png', 1.0);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: [612, 792]
    });
    pdf.internal.scaleFactor = 1;
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('invoicy.pdf');
  });
}

class InvoiceModal extends React.Component {
  render() {
    return (
      <Modal show={this.props.showModal} onHide={this.props.closeModal} size="lg" centered>
        {/* Modal Top Control Bar */}
        <div className="d-flex align-items-center justify-content-between px-4 py-3 border-bottom bg-light">
          <span className="fw-bold small text-uppercase text-secondary" style={{ letterSpacing: '0.05em' }}>
            Invoice Preview
          </span>
          <button
            type="button"
            className="btn btn-sm btn-light border-0 p-1 rounded-circle"
            onClick={this.props.closeModal}
            aria-label="Close"
          >
            <BiX size={22} className="text-secondary" />
          </button>
        </div>

        {/* Printable / Downloadable Invoice Document */}
        <div id="invoiceCapture" className="p-4 p-md-5">
          {/* Document Header */}
          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start pb-4 border-bottom mb-4">
            <div>
              <span className="invoice-tag-badge text-uppercase d-inline-block mb-2">
                INVOICE
              </span>
              <h2 className="fw-bold text-dark mb-1" style={{ letterSpacing: '-0.02em' }}>
                {this.props.info.billFrom || 'Invoicy'}
              </h2>
              <span className="text-secondary small fw-medium">
                Invoice #{this.props.info.invoiceNumber || '1'}
              </span>
            </div>
            <div className="text-sm-end mt-3 mt-sm-0">
              <span className="text-secondary small fw-bold text-uppercase d-block mb-1" style={{ fontSize: '0.72rem' }}>
                Amount Due
              </span>
              <h2 className="fw-bold text-primary mb-0" style={{ letterSpacing: '-0.02em' }}>
                {this.props.currency} {this.props.total}
              </h2>
            </div>
          </div>

          {/* Client & Sender Details */}
          <Row className="mb-4 g-4">
            <Col sm={6}>
              <span className="text-secondary small fw-bold text-uppercase d-block mb-2" style={{ fontSize: '0.72rem' }}>
                Billed To
              </span>
              <div className="fw-bold text-dark fs-6">{this.props.info.billTo || 'Client Name'}</div>
              <div className="text-secondary small mt-1">{this.props.info.billToAddress || ''}</div>
              <div className="text-secondary small">{this.props.info.billToEmail || ''}</div>
            </Col>
            <Col sm={6} className="text-sm-end">
              <span className="text-secondary small fw-bold text-uppercase d-block mb-2" style={{ fontSize: '0.72rem' }}>
                Billed From
              </span>
              <div className="fw-bold text-dark fs-6">{this.props.info.billFrom || 'Invoicy'}</div>
              <div className="text-secondary small mt-1">{this.props.info.billFromAddress || ''}</div>
              <div className="text-secondary small">{this.props.info.billFromEmail || ''}</div>
              {this.props.info.dateOfIssue && (
                <div className="mt-2 text-secondary small">
                  <strong>Date:</strong> {this.props.info.dateOfIssue}
                </div>
              )}
            </Col>
          </Row>

          {/* Items Table */}
          <Table className="align-middle mb-0">
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                <th style={{ width: '10%' }} className="text-secondary small fw-bold">QTY</th>
                <th style={{ width: '50%' }} className="text-secondary small fw-bold">DESCRIPTION</th>
                <th className="text-end text-secondary small fw-bold" style={{ width: '20%' }}>PRICE</th>
                <th className="text-end text-secondary small fw-bold" style={{ width: '20%' }}>AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              {this.props.items.map((item, i) => {
                const itemTotal = (parseFloat(item.price || 0) * parseInt(item.quantity || 1)).toFixed(2);
                return (
                  <tr key={i} className="border-bottom">
                    <td className="fw-semibold text-dark">{item.quantity}</td>
                    <td>
                      <div className="fw-semibold text-dark">{item.name || 'Item'}</div>
                      {item.description && <div className="text-secondary small">{item.description}</div>}
                    </td>
                    <td className="text-end text-secondary">{this.props.currency} {parseFloat(item.price || 0).toFixed(2)}</td>
                    <td className="text-end fw-semibold text-dark">{this.props.currency} {itemTotal}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>

          {/* Breakdown Section */}
          <Row className="justify-content-end mt-4">
            <Col sm={6} md={5}>
              <div className="bg-light p-3 rounded-3 border">
                <div className="d-flex justify-content-between py-1 small">
                  <span className="text-secondary">Subtotal:</span>
                  <span className="fw-semibold text-dark">{this.props.currency} {this.props.subTotal}</span>
                </div>
                {this.props.taxAmmount !== '0.00' && this.props.taxAmmount !== 0 && (
                  <div className="d-flex justify-content-between py-1 small">
                    <span className="text-secondary">Tax:</span>
                    <span className="fw-semibold text-dark">+{this.props.currency} {this.props.taxAmmount}</span>
                  </div>
                )}
                {this.props.discountAmmount !== '0.00' && this.props.discountAmmount !== 0 && (
                  <div className="d-flex justify-content-between py-1 small">
                    <span className="text-secondary">Discount:</span>
                    <span className="fw-semibold text-danger">-{this.props.currency} {this.props.discountAmmount}</span>
                  </div>
                )}
                <div className="d-flex justify-content-between pt-2 border-top mt-2">
                  <span className="fw-bold">Total Due:</span>
                  <span className="fw-bold text-primary fs-5">{this.props.currency} {this.props.total}</span>
                </div>
              </div>
            </Col>
          </Row>

          {/* Notes */}
          {this.props.info.notes && (
            <div className="bg-light p-3 rounded-3 border mt-4">
              <span className="small fw-bold text-secondary text-uppercase d-block mb-1" style={{ fontSize: '0.7rem' }}>
                Terms & Notes:
              </span>
              <div className="small text-secondary">{this.props.info.notes}</div>
            </div>
          )}
        </div>

        {/* Modal Action Buttons */}
        <div className="p-4 bg-light border-top">
          <Row className="g-3">
            <Col sm={6}>
              <Button
                variant="primary"
                size="lg"
                className="btn-review-invoice d-flex align-items-center justify-content-center w-100 fw-bold"
                onClick={GenerateInvoice}
              >
                <BiCloudDownload size={22} className="me-2" />
                Download PDF
              </Button>
            </Col>
            <Col sm={6}>
              <Button
                variant="outline-primary"
                size="lg"
                className="d-flex align-items-center justify-content-center w-100 fw-bold py-2 border-2"
                onClick={GenerateInvoice}
              >
                <BiPaperPlane size={20} className="me-2" />
                Send Invoice
              </Button>
            </Col>
          </Row>
        </div>
      </Modal>
    );
  }
}

export default InvoiceModal;
