let phones = JSON.parse(localStorage.getItem("phones")) || [
  { name: "iphone", price: 400, qty: 10 },
  { name: "iphone 11 pro", price: 550, qty: 2 },
  { name: "iphone 12", price: 650, qty: 5 },
];


let toggleBtn = document.querySelector(".toggle");
let isDark = false;
let body = document.querySelector("body");
let header = document.querySelector("header");
let mood = document.querySelector(".mood");
let tbody = document.querySelector("tbody");

let phoneName = document.querySelector("#phoneName");
let phonePrice = document.querySelector("#phonePrice");
let phoneQty = document.querySelector("#phoneQty");

let updatePhoneName = document.querySelector("#updatePhoneName");
let updatePhonePrice = document.querySelector("#updatePhonePrice");
let updatePhoneQty = document.querySelector("#updatePhoneQty");

let modalBody = document.querySelector(".modal-body");
let updateSelect = document.querySelector(".form-select");
let updateForm = document.querySelector("#updateForm");

let updatedIndex;

let toggle = () => {
  toggleBtn.classList.toggle("active");
  if (isDark == false) {
    body.style.backgroundColor = "#121212";
    body.style.color = "#fff";
    header.style.backgroundColor = "#121212";
    header.style.color = "#fff";
    mood.innerText = "Light ";
    isDark = true;
  } else {
    body.style.backgroundColor = "#fff";
    body.style.color = "#000";
    header.style.backgroundColor = "#fff";
    header.style.color = "#000";
    mood.innerText = "Dark ";
    isDark = false;
  }

  savePhones()
};

let showPhones = () => {
  tbody.innerHTML = "";
  phones.forEach((el, index) => {
    tbody.innerHTML += `
    <tr>
      <td class="col-1">${index + 1}</td>
      <td class="col-4">
        <div class=" d-flex justify-content-center align-items-center">
        <p class="changeName mb-0 col-8">${el.name}</p>
        <i type="button" id="editBtn" class="fa-solid fa-pen-to-square me-2 text-secondary" onclick="sendNameField(${index})"></i>
        
        </div>
      </td>
      <td class="col-2">
        <div class=" d-flex justify-content-center align-items-center">
        <p class="changePrice mb-0 col-8"> ${el.price}</p>
        <i type="button" id="editBtn1" class="fa-solid fa-pen-to-square me-2 text-secondary" onclick="sendPriceField(${index})"></i>
        </div>
      </td>
      <td class="col-2">
        <div class=" d-flex justify-content-center align-items-center">
        <p class="changeQty mb-0 col-8">${el.qty}</p>
        <i type="button" id="editBtn2" class="fa-solid fa-pen-to-square me-2 text-secondary" onclick="sendQtyField(${index})"></i>
        </div>
      </td>
      <td class="col-1">${el.qty * el.price}</td>
      <td class="col-2">
      <button onclick="removePhone(${index})" class="btn me-3">
      <i class="fa-solid fa-trash-can text-danger"></i>
      </button>
      <button
        type="button"
        class="btn "
        data-bs-toggle="modal"
        data-bs-target="#updateAll"
        onClick="sendPhoneInfo(${index})"
      >
          <i class="fa-solid fa-pen-to-square text-primary"></i>
      </button>

      </td>
    </tr>
    `;
  });
  savePhones()
};

let addNewPhone = () => {
  let newName = phoneName;
  let newPrice = phonePrice;
  let newQty = phoneQty;
  let newPhoneValue = {
    name: newName.value,
    price: +newPrice.value,
    qty: +newQty.value,
  };

  phones.push(newPhoneValue);
  showPhones();

  newName.value = "";
  newPrice.value = "";
  newQty.value = "";
  savePhones()
};

let removePhone = (index) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
      phones.splice(index, 1);
      showPhones();
    }
  });
  savePhones()
};

let sendPhoneInfo = (index) => {
  updatePhoneName.value = phones[index].name;
  updatePhonePrice.value = phones[index].price;
  updatePhoneQty.value = phones[index].qty;

  updatedIndex = index;

  savePhones()
};

let updatePhone = () => {
  phones[updatedIndex].name = updatePhoneName.value;
  phones[updatedIndex].price = updatePhonePrice.value;
  phones[updatedIndex].qty = updatePhoneQty.value;
  showPhones();
  savePhones()
};

let sendNameField = (index) => {
  hideEditButton()

  let changeName = document.querySelector(".changeName");
  changeName.innerHTML = `
  <div class="d-flex justify-content-center align-items-center">
  <input class="nameField col-10 me-2" type="text" value="${phones[index].name}">
  <i class="fa-solid fa-check text-success" type="button" onclick="updateName(${index}, this)"></i>
  </div>
  `;
  savePhones()
};
let updateName = (index) => {
  let nameField = document.querySelector(".nameField");
  phones[index].name = nameField.value;
  showPhones();
  savePhones()
};

let sendPriceField = (index) => {
  hideEditButton()

  let changePrice = document.querySelector(".changePrice");
  changePrice.innerHTML = `
  <div class="d-flex justify-content-center align-items-center">
  <input class="priceField col-10" type="number" value="${phones[index].price}">
  <i class="fa-solid fa-check text-success" type="button" onclick="updatePrice(${index}, this)"></i>
  </div>
  `;
  savePhones()
};
let updatePrice = (index) => {
  let priceField = document.querySelector(".priceField");
  phones[index].price = priceField.value;
  showPhones();
  savePhones()
};

let sendQtyField = (index) => {
  hideEditButton()
  let changeQty = document.querySelector(".changeQty");
  changeQty.innerHTML = `
  <div class="d-flex justify-content-center align-items-center">
  <input class="qtyField col-10" type="text" value="${phones[index].qty}">
  <i class="fa-solid fa-check text-success" type="button" onclick="updateQty(${index}, this)"></i>
  </div>
  `;
  savePhones()
};
let updateQty = (index) => {
  let qtyField = document.querySelector(".qtyField");
  phones[index].qty = qtyField.value;
  savePhones()
  showPhones();
};

let hideEditButton = () => {
  let editBtn = document.querySelector("#editBtn");
  let editBtn1 = document.querySelector("#editBtn1");
  let editBtn2 = document.querySelector("#editBtn2");
  editBtn.classList.add("d-none");
  editBtn1.classList.add("d-none");
  editBtn2.classList.add("d-none");
  savePhones()
};


function savePhones() {
  localStorage.setItem("phones", JSON.stringify(phones));
}

showPhones();
