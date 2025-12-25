let phones = JSON.parse(localStorage.getItem("phones")) || [
  { name: "iPhone", price: 400, qty: 10 },
  { name: "iPhone 11 Pro", price: 550, qty: 2 },
  { name: "iPhone 12", price: 650, qty: 5 },
];

let tbody = document.querySelector("tbody");

let phoneName = document.querySelector("#phoneName");
let phonePrice = document.querySelector("#phonePrice");
let phoneQty = document.querySelector("#phoneQty");

let updatePhoneName = document.querySelector("#updatePhoneName");
let updatePhonePrice = document.querySelector("#updatePhonePrice");
let updatePhoneQty = document.querySelector("#updatePhoneQty");
let updatedIndex = null;

function savePhones() {
  localStorage.setItem("phones", JSON.stringify(phones));
}

function showPhones() {
  tbody.innerHTML = "";
  phones.forEach((phone, index) => {
    tbody.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${phone.name} <i class="fa-solid fa-pen-to-square text-secondary" onclick="editPhone(${index}, 'name')"></i></td>
        <td>${phone.price} <i class="fa-solid fa-pen-to-square text-secondary" onclick="editPhone(${index}, 'price')"></i></td>
        <td>${phone.qty} <i class="fa-solid fa-pen-to-square text-secondary" onclick="editPhone(${index}, 'qty')"></i></td>
        <td>${phone.price * phone.qty}</td>
        <td>
          <button onclick="removePhone(${index})" class="btn"><i class="fa-solid fa-trash-can text-danger"></i></button>
          <button class="btn" data-bs-toggle="modal" data-bs-target="#updateAll" onclick="sendPhoneInfo(${index})">
            <i class="fa-solid fa-pen-to-square text-primary"></i>
          </button>
        </td>
      </tr>
    `;
  });
  savePhones();
}

function addNewPhone() {
  if (!phoneName.value || !phonePrice.value || !phoneQty.value) return alert("Enter all values");
  phones.push({
    name: phoneName.value,
    price: +phonePrice.value,
    qty: +phoneQty.value,
  });
  phoneName.value = "";
  phonePrice.value = "";
  phoneQty.value = "";
  showPhones();
}

function removePhone(index) {
  if (confirm("Are you sure?")) {
    phones.splice(index, 1);
    showPhones();
  }
}

function sendPhoneInfo(index) {
  updatedIndex = index;
  updatePhoneName.value = phones[index].name;
  updatePhonePrice.value = phones[index].price;
  updatePhoneQty.value = phones[index].qty;
}

function updatePhone() {
  if (updatedIndex === null) return;
  phones[updatedIndex].name = updatePhoneName.value;
  phones[updatedIndex].price = +updatePhonePrice.value;
  phones[updatedIndex].qty = +updatePhoneQty.value;
  updatedIndex = null;
  showPhones();
}

function editPhone(index, field) {
  let newValue = prompt(`Enter new ${field}:`, phones[index][field]);
  if (newValue === null) return;
  if (field === "price" || field === "qty") newValue = +newValue;
  phones[index][field] = newValue;
  showPhones();
}

showPhones();
