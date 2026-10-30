import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { BiTrash, BiPlus } from "react-icons/bi";
import EditableField from './EditableField';

class InvoiceItem extends React.Component {
  render() {
    var onItemizedItemEdit = this.props.onItemizedItemEdit;
    var currency = this.props.currency;
    var rowDel = this.props.onRowDel;
    var itemTable = this.props.items.map(function(item) {
      return (
        <ItemRow
          onItemizedItemEdit={onItemizedItemEdit}
          item={item}
          onDelEvent={rowDel.bind(this)}
          key={item.id}
          currency={currency}
        />
      );
    });
    return (
      <div className="table-responsive my-4">
        <table className="invoice-table">
          <thead>
            <tr>
              <th style={{ width: '50%' }}>Item Description</th>
              <th style={{ width: '15%' }}>Qty</th>
              <th style={{ width: '25%' }}>Price / Rate</th>
              <th style={{ width: '10%' }} className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {itemTable}
          </tbody>
        </table>
        <div className="pt-3">
          <Button
            type="button"
            className="btn-add-item d-inline-flex align-items-center"
            onClick={this.props.onRowAdd}
          >
            <BiPlus size={18} className="me-1" /> Add Line Item
          </Button>
        </div>
      </div>
    );
  }
}

class ItemRow extends React.Component {
  onDelEvent() {
    this.props.onDelEvent(this.props.item);
  }
  render() {
    return (
      <tr>
        <td style={{ width: '50%' }}>
          <EditableField
            onItemizedItemEdit={this.props.onItemizedItemEdit}
            cellData={{
              type: "text",
              name: "name",
              placeholder: "Item or Service Name",
              value: this.props.item.name,
              id: this.props.item.id,
            }}
          />
          <EditableField
            onItemizedItemEdit={this.props.onItemizedItemEdit}
            cellData={{
              type: "text",
              name: "description",
              placeholder: "Detailed description (optional)",
              value: this.props.item.description,
              id: this.props.item.id,
            }}
          />
        </td>
        <td style={{ width: '15%' }}>
          <EditableField
            onItemizedItemEdit={this.props.onItemizedItemEdit}
            cellData={{
              type: "number",
              name: "quantity",
              min: 1,
              step: "1",
              value: this.props.item.quantity,
              id: this.props.item.id,
            }}
          />
        </td>
        <td style={{ width: '25%' }}>
          <EditableField
            onItemizedItemEdit={this.props.onItemizedItemEdit}
            cellData={{
              leading: this.props.currency,
              type: "number",
              name: "price",
              min: 0,
              step: "0.01",
              textAlign: "text-end",
              value: this.props.item.price,
              id: this.props.item.id,
            }}
          />
        </td>
        <td style={{ width: '10%' }} className="text-center">
          <button
            type="button"
            onClick={this.onDelEvent.bind(this)}
            className="btn-delete-item mx-auto"
            title="Remove line item"
          >
            <BiTrash size={16} />
          </button>
        </td>
      </tr>
    );
  }
}

export default InvoiceItem;
