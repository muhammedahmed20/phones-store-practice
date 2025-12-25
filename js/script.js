
let phones = JSON.parse(localStorage.getItem("phones")) || [
  { name: "iphone", price: 400, qty: 10 },
  { name: "iphone 11 pro", price: 550, qty: 2 },
  { name: "iphone 12", price: 650, qty: 5 },
];


function savePhones() {
  localStorage.setItem("phones", JSON.stringify(phones));
}


let tbody = document.querySelector("tbody");

function showPhones() {
  tbody.innerHTML = "";
  phones.forEach((phone, index) => {
    tbody.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${phone.name}</td>
        <td>${phone.price}</td>
        <td>${phone.qty}</td>
        <td>${phone.price * phone.qty}</td>
        <td>
          <button onclick="removePhone(${index})">Delete</button>
        </td>
      </tr>
    `;
  });
}


function addNewPhone() {
  let name = document.querySelector("#phoneName").value.trim();
  let price = +document.querySelector("#phonePrice").value.trim();
  let qty = +document.querySelector("#phoneQty").value.trim();

  if (!name || price <= 0 || qty <= 0) return;

  phones.push({ name, price, qty });
  savePhones();
  showPhones();

  document.querySelector("#phoneName").value = "";
  document.querySelector("#phonePrice").value = "";
  document.querySelector("#phoneQty").value = "";
}


function removePhone(index) {
  phones.splice(index, 1);
  savePhones();
  showPhones();
}


showPhones();
