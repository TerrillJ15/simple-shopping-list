const COLUMNS = [
  {
    title: 'Item',
    value: 'item',
  },
  {
    title: 'Price',
    value: 'price',
  },
  {
    title: 'Quantity',
    value: 'quantity',
  },
  {
    title: 'Sub Total',
    value: 'subTotal',
  },
  {
    title: '',
    value: 'button',
  },
];

let data = [
  {
    id: 0,
    item: 'Cheese',
    price: 5,
    quantity: undefined,
    subTotal: undefined,
    button: undefined,
  },
  {
    id: 1,
    item: 'Eggs',
    price: 3,
    quantity: undefined,
    subTotal: undefined,
    button: undefined,
  },
  {
    id: 2,
    item: 'Steak',
    price: 25,
    quantity: undefined,
    subTotal: undefined,
    button: undefined,
  },
];

window.onload = function () {
  renderTable();
};

function renderTable() {
  renderData();
}

function renderData() {
  for (let i = 0; i < data.length; i++) {
    renderRow(data[i]);
  }
}

function renderRow(row) {
  $('#row-add').before(`<tr id="row-${row.id}"></tr>`);
  for (let i = 0; i < COLUMNS.length; i++) {
    $(`#row-${row.id}`).append(
      `<td id="cell-${row.id}-${COLUMNS[i].value}" class="${
        COLUMNS[i].value
      }">${row[COLUMNS[i].value] ?? ''}</td>`,
    );
  }
}
