import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { BiReceipt, BiUser, BiUserCheck, BiSliderAlt, BiCalendar } from 'react-icons/bi';
import InvoiceItem from './InvoiceItem';
import InvoiceModal from './InvoiceModal';

class InvoiceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      currency: '$',
      currentDate: '',
      invoiceNumber: 1,
      dateOfIssue: '',
      billTo: '',
      billToEmail: '',
      billToAddress: '',
      billFrom: '',
      billFromEmail: '',
      billFromAddress: '',
      notes: '',
      total: '0.00',
      subTotal: '0.00',
      taxRate: '',
      taxAmmount: '0.00',
      discountRate: '',
      discountAmmount: '0.00'
    };
    this.state.items = [
      {
        id: 0,
        name: '',
        description: '',
        price: '1.00',
        quantity: 1
      }
    ];
    this.editField = this.editField.bind(this);
  }

  componentDidMount() {
    this.handleCalculateTotal();
  }

  handleRowDel(items) {
    var index = this.state.items.indexOf(items);
    this.state.items.splice(index, 1);
    this.setState(this.state.items);
  }

  handleAddEvent() {
    var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
    var item = {
      id: id,
      name: '',
      price: '1.00',
      description: '',
      quantity: 1
    };
    this.state.items.push(item);
    this.setState(this.state.items);
  }

  handleCalculateTotal() {
    var items = this.state.items;
    var subTotal = 0;

    items.forEach(function(item) {
      subTotal = parseFloat(subTotal + (parseFloat(item.price || 0) * parseInt(item.quantity || 1))).toFixed(2);
    });

    this.setState({
      subTotal: parseFloat(subTotal).toFixed(2)
    }, () => {
      this.setState({
        taxAmmount: parseFloat(parseFloat(subTotal) * (this.state.taxRate / 100)).toFixed(2)
      }, () => {
        this.setState({
          discountAmmount: parseFloat(parseFloat(subTotal) * (this.state.discountRate / 100)).toFixed(2)
        }, () => {
          this.setState({
            total: ((subTotal - this.state.discountAmmount) + parseFloat(this.state.taxAmmount)).toFixed(2)
          });
        });
      });
    });
  }

  onItemizedItemEdit(evt) {
    var item = {
      id: evt.target.id,
      name: evt.target.name,
      value: evt.target.value
    };
    var items = this.state.items.slice();
    var newItems = items.map(function(items) {
      for (var key in items) {
        if (key === item.name && items.id === item.id) {
          items[key] = item.value;
        }
      }
      return items;
    });
    this.setState({items: newItems});
    this.handleCalculateTotal();
  }

  editField = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
    this.handleCalculateTotal();
  };

  onCurrencyChange = (selectedOption) => {
    this.setState(selectedOption);
  };

  openModal = (event) => {
    event.preventDefault();
    this.handleCalculateTotal();
    this.setState({isOpen: true});
  };

  closeModal = () => this.setState({isOpen: false});

  render() {
    return (
      <Form onSubmit={this.openModal}>
        {/* Dynamic Page Header */}
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-4">
          <div>
            <h2 className="fw-bold text-dark mb-1 d-flex align-items-center" style={{ letterSpacing: '-0.03em' }}>
              New Invoice
              <span className="badge bg-primary bg-opacity-10 text-primary ms-3 fs-6 fw-semibold px-2 py-1 border border-primary border-opacity-25">
                Draft
              </span>
            </h2>
            <p className="text-secondary small mb-0">Create, customize, and download itemized invoices in seconds.</p>
          </div>
          <div className="d-flex align-items-center gap-2 mt-3 mt-sm-0">
            <div className="bg-white px-3 py-2 rounded-3 border shadow-sm small text-secondary">
              <span className="fw-bold text-dark">{this.state.items.length}</span> {this.state.items.length === 1 ? 'item' : 'items'}
            </div>
            <div className="bg-white px-3 py-2 rounded-3 border shadow-sm fw-bold text-primary">
              {this.state.currency} {this.state.total}
            </div>
          </div>
        </div>

        <Row className="g-4">
          <Col md={8} lg={9}>
            <div className="main-invoice-card p-4 p-xl-5">
              {/* Card Header: Dates & Invoice Number */}
              <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between pb-4 border-bottom mb-4 gap-3">
                <div className="d-flex flex-wrap align-items-center gap-3">
                  <div className="bg-light p-2 px-3 rounded-3 border d-flex align-items-center">
                    <BiCalendar className="text-primary me-2" size={18} />
                    <div>
                      <span className="text-secondary small fw-bold d-block text-uppercase" style={{ fontSize: '0.68rem' }}>Issue Date</span>
                      <span className="fw-semibold text-dark small">
                        {new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  </div>
                  <div className="bg-light p-2 px-3 rounded-3 border d-flex align-items-center">
                    <div>
                      <span className="text-secondary small fw-bold d-block text-uppercase" style={{ fontSize: '0.68rem' }}>Due Date</span>
                      <Form.Control
                        type="date"
                        value={this.state.dateOfIssue}
                        name="dateOfIssue"
                        onChange={this.editField}
                        className="form-control-sm border-0 bg-transparent p-0 fw-semibold text-dark"
                        style={{ width: '130px', boxShadow: 'none' }}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-center justify-content-sm-end">
                  <div className="bg-light p-2 px-3 rounded-3 border d-flex align-items-center">
                    <span className="text-secondary small fw-bold text-uppercase me-2" style={{ fontSize: '0.68rem' }}>Invoice #</span>
                    <InputGroup size="sm" style={{ width: '90px' }}>
                      <InputGroup.Text className="text-primary fw-bold p-1 px-2 border-0 bg-white">#</InputGroup.Text>
                      <Form.Control
                        type="number"
                        value={this.state.invoiceNumber}
                        name="invoiceNumber"
                        onChange={this.editField}
                        min="1"
                        className="fw-bold p-1 border-0"
                        required
                      />
                    </InputGroup>
                  </div>
                </div>
              </div>

              {/* Bill To & Bill From Boxes */}
              <Row className="mb-4 g-3">
                <Col md={6}>
                  <div className="contact-box h-100">
                    <div className="contact-box-header">
                      <BiUserCheck size={18} className="text-primary me-2" />
                      <span>Bill To (Client)</span>
                    </div>
                    <Form.Control
                      placeholder="Client or Company Name"
                      value={this.state.billTo}
                      type="text"
                      name="billTo"
                      className="mb-2"
                      onChange={this.editField}
                      autoComplete="name"
                      required
                    />
                    <Form.Control
                      placeholder="client@company.com"
                      value={this.state.billToEmail}
                      type="email"
                      name="billToEmail"
                      className="mb-2"
                      onChange={this.editField}
                      autoComplete="email"
                      required
                    />
                    <Form.Control
                      placeholder="Billing Address (City, State, Zip)"
                      value={this.state.billToAddress}
                      type="text"
                      name="billToAddress"
                      autoComplete="address"
                      onChange={this.editField}
                      required
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="contact-box h-100">
                    <div className="contact-box-header">
                      <BiUser size={18} className="text-primary me-2" />
                      <span>Bill From (Your Business)</span>
                    </div>
                    <Form.Control
                      placeholder="Your Business or Full Name"
                      value={this.state.billFrom}
                      type="text"
                      name="billFrom"
                      className="mb-2"
                      onChange={this.editField}
                      autoComplete="name"
                      required
                    />
                    <Form.Control
                      placeholder="your@business.com"
                      value={this.state.billFromEmail}
                      type="email"
                      name="billFromEmail"
                      className="mb-2"
                      onChange={this.editField}
                      autoComplete="email"
                      required
                    />
                    <Form.Control
                      placeholder="Business Address (City, State, Zip)"
                      value={this.state.billFromAddress}
                      type="text"
                      name="billFromAddress"
                      autoComplete="address"
                      onChange={this.editField}
                      required
                    />
                  </div>
                </Col>
              </Row>

              {/* Items Section */}
              <InvoiceItem
                onItemizedItemEdit={this.onItemizedItemEdit.bind(this)}
                onRowAdd={this.handleAddEvent.bind(this)}
                onRowDel={this.handleRowDel.bind(this)}
                currency={this.state.currency}
                items={this.state.items}
              />

              {/* Totals Summary */}
              <Row className="mt-4 justify-content-end">
                <Col lg={6} md={7}>
                  <div className="totals-summary-box">
                    <div className="totals-row">
                      <span>Subtotal</span>
                      <span className="fw-semibold text-dark">{this.state.currency} {this.state.subTotal}</span>
                    </div>
                    <div className="totals-row">
                      <span>Discount ({this.state.discountRate || 0}%)</span>
                      <span className="fw-semibold text-danger">- {this.state.currency} {this.state.discountAmmount || 0}</span>
                    </div>
                    <div className="totals-row">
                      <span>Tax ({this.state.taxRate || 0}%)</span>
                      <span className="fw-semibold text-dark">+ {this.state.currency} {this.state.taxAmmount || 0}</span>
                    </div>
                    <div className="totals-row grand-total">
                      <span className="fw-bold fs-6">Grand Total</span>
                      <span className="fw-bold fs-4 text-primary">
                        {this.state.currency} {this.state.total || 0}
                      </span>
                    </div>
                  </div>
                </Col>
              </Row>

              {/* Notes */}
              <div className="mt-4 pt-4 border-top">
                <Form.Label className="fw-bold small text-uppercase text-secondary mb-2" style={{ letterSpacing: '0.04em' }}>
                  Notes & Payment Terms
                </Form.Label>
                <Form.Control
                  placeholder="Thanks for your business! Add payment terms, bank wiring details, or client notes..."
                  name="notes"
                  value={this.state.notes}
                  onChange={this.editField}
                  as="textarea"
                  rows={2}
                />
              </div>
            </div>
          </Col>

          {/* Right Action Sidebar */}
          <Col md={4} lg={3}>
            <div className="sticky-top" style={{ top: '90px' }}>
              <Button
                variant="primary"
                type="submit"
                className="btn-review-invoice d-flex align-items-center justify-content-center w-100 mb-3"
              >
                <BiReceipt size={22} className="me-2" />
                Review Invoice
              </Button>

              <InvoiceModal
                showModal={this.state.isOpen}
                closeModal={this.closeModal}
                info={this.state}
                items={this.state.items}
                currency={this.state.currency}
                subTotal={this.state.subTotal}
                taxAmmount={this.state.taxAmmount}
                discountAmmount={this.state.discountAmmount}
                total={this.state.total}
              />

              <div className="settings-card p-4">
                <div className="d-flex align-items-center mb-3 pb-2 border-bottom">
                  <BiSliderAlt size={18} className="text-primary me-2" />
                  <span className="fw-bold small text-uppercase text-secondary" style={{ letterSpacing: '0.05em' }}>
                    Invoice Settings
                  </span>
                </div>
                
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold text-secondary">Currency</Form.Label>
                  <Form.Select
                    onChange={event => this.onCurrencyChange({currency: event.target.value})}
                    className="form-select-sm"
                    aria-label="Change Currency"
                    value={this.state.currency}
                  >
                    <option value="$">USD ($ United States Dollar)</option>
                    <option value="£">GBP (£ British Pound)</option>
                    <option value="€">EUR (€ Euro)</option>
                    <option value="¥">JPY (¥ Japanese Yen)</option>
                    <option value="$">CAD ($ Canadian Dollar)</option>
                    <option value="$">AUD ($ Australian Dollar)</option>
                    <option value="$">SGD ($ Singapore Dollar)</option>
                    <option value="¥">CNY (¥ Chinese Renminbi)</option>
                    <option value="₿">BTC (₿ Bitcoin)</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold text-secondary">Tax Rate</Form.Label>
                  <InputGroup size="sm">
                    <Form.Control
                      name="taxRate"
                      type="number"
                      value={this.state.taxRate}
                      onChange={this.editField}
                      placeholder="0.0"
                      min="0.00"
                      step="0.01"
                      max="100.00"
                    />
                    <InputGroup.Text className="fw-bold">%</InputGroup.Text>
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label className="small fw-bold text-secondary">Discount Rate</Form.Label>
                  <InputGroup size="sm">
                    <Form.Control
                      name="discountRate"
                      type="number"
                      value={this.state.discountRate}
                      onChange={this.editField}
                      placeholder="0.0"
                      min="0.00"
                      step="0.01"
                      max="100.00"
                    />
                    <InputGroup.Text className="fw-bold">%</InputGroup.Text>
                  </InputGroup>
                </Form.Group>
              </div>
            </div>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default InvoiceForm;
