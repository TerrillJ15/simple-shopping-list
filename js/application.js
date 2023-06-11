/**
 * Formats the row value into a dollar format.
 *
 * @param {Row} row Current row with values.
 * @param {String} key The key of the value to use.
 * @returns The formatted dollar string.
 */
const formatDollar = (row, key) => {
  return `$${row[key]}`;
};

/**
 * Calculate the subtotal based on the price and the quantity
 * and returns a formatted dollar string.
 *
 * @param {Row} row Current row with the values.
 * @returns The subtotal as a formatted dollar string.
 */
const getSubtotal = row => {
  return `$${row.price * row.quantity}`;
};

/**
 * The array of column objects.
 */
const COLUMNS = [
  {
    title: 'Item',
    value: 'item',
  },
  {
    title: 'Price',
    value: 'price',
    format: formatDollar,
  },
  {
    title: 'Quantity',
    value: 'quantity',
  },
  {
    title: 'Sub Total',
    value: 'subTotal',
    format: getSubtotal,
  },
];

/**
 * Array of stored row items. Each row item is a @type {Row} object.
 */
let data = [
  {
    id: 0,
    item: 'Cheese',
    price: 5,
    quantity: 2,
  },
  {
    id: 1,
    item: 'Eggs',
    price: 3,
    quantity: 3,
  },
  {
    id: 2,
    item: 'Steak',
    price: 25,
    quantity: 1,
  },
];

/**
 * Called is when the page is loaded.
 * Renders the table.
 */
window.onload = function () {
  renderTable();
};

/**
 * Renders the dynamic aspects of the table which includes the data and footer tables.
 */
function renderTable() {
  renderData();
  updateTotals();
}

/**
 * Renders all the data as table rows.
 */
function renderData() {
  for (let i = 0; i < data.length; i++) {
    renderRow(data[i]);
  }
}

/**
 * Renders each row with the proper cells.
 * Each cell is render for it's data value and
 * will be formatted if desired. Each row
 * will have a delete button at the end.
 *
 * @param {Row} row Current row with the values.
 */
function renderRow(row) {
  const rowId = `row-${row.id}`;
  $('#row-add').before(`<tr id="${rowId}"></tr>`);
  for (let i = 0; i < COLUMNS.length; i++) {
    $(`#row-${row.id}`).append(
      `<td id="cell-${row.id}-${COLUMNS[i].value}" class="${
        COLUMNS[i].value
      }">${
        // data value; use format function if provided, otherwise return data as is
        COLUMNS[i].format
          ? COLUMNS[i].format(row, [COLUMNS[i].value])
          : row[COLUMNS[i].value] ?? ''
      }</td>`,
    );
  }
  $(`#row-${row.id}`).append(`
    <td>
        <button
            id="cell-${row.id}-delete"
            type="button"
            class="btn btn-sm btn-danger"
            onclick="deleteRow(${row.id})"
        >
            Delete
        </button>
    </td>
  `);
}

/**
 * Gets the inputs and adds a row when valid.
 * If invalid then the inputs are highlighted red.
 * When an add is successful then inputs are reset.
 */
function addRow() {
  // get values from the inputs
  const item = $('#add-input').val();
  const price = $('#price-input').val();
  const quantity = $('#quantity-input').val();

  // if any of the values are invalid, then do not add
  if (!item || isNaN(price) || isNaN(quantity)) {
    $('#row-add > td').css('background-color', 'red');
    return;
  }
  $('#row-add > td').css('background-color', 'white');

  const row = {
    id: Date.now(),
    item,
    price: Number.parseFloat(price),
    quantity: Number.parseFloat(quantity),
  };
  data.push(row);
  renderRow(row);
  updateTotals();

  $('#add-input').val('');
  $('#price-input').val('');
  $('#quantity-input').val('');
}

/**
 * Remove the row for the provided rowId.
 *
 * @param {Number} rowId ID of the row.
 */
function deleteRow(rowId) {
  $(`#row-${rowId}`).remove();
  data = data.filter(r => r.id !== rowId);
  updateTotals();
}

/**
 * Calculate and updates the values on the view.
 */
function updateTotals() {
  let price = 0;
  let quantity = 0;
  let subTotal = 0;
  for (let i = 0; i < data.length; i++) {
    price += data[i].price;
    quantity += data[i].quantity;
    subTotal += data[i].price * data[i].quantity;
  }
  $('#price-total').text(`$${price}`);
  $('#quantity-total').text(quantity);
  $('#total').text(`$${subTotal}`);
}
