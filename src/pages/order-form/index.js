import "./style.scss";

const formSection = document.querySelector(".order__container");
const form = document.getElementById("order-form");
const cart = JSON.parse(localStorage.getItem("cart")) || [];
console.log("cart", cart);
const formSubmitBtn = document.getElementById("submit");

if (cart.length === 0) {
  formSubmitBtn.setAttribute("disabled", "true");
}

function checkboxValidation() {
  const checkBoxes = form.querySelectorAll(".order__check");
  const giftLimit = 2;
  function check(event) {
    let checkedBoxes = form.querySelectorAll(".order__check:checked");
    if (checkedBoxes.length >= giftLimit + 1) return false;
  }

  for (let i = 0; i < checkBoxes.length; i++) {
    checkBoxes[i].onclick = check;
  }
}

checkboxValidation();

function saveFormData() {
  const username = document.getElementById("username");
  const usersurname = document.getElementById("usersurname");
  const street = document.getElementById("street");
  const house = document.getElementById("house");
  const flat = document.getElementById("flat");
  const deliverydate = document.getElementById("deliverydate");

  let formData = {
    username: username.value,
    usersurname: usersurname.value,
    street: street.value,
    house: house.value,
    flat: flat.value,
    deliverydate: deliverydate.value,
  };

  //clear form
  const inputsData = document.querySelectorAll(".order__input");
  inputsData.forEach((input) => {
    input.value = "";
  });

  return formData;
}

function orderInfoRender(formData) {
  const documentFragment = new DocumentFragment();

  const orderInfoHeader = document.createElement("h2");
  orderInfoHeader.classList.add("order__title");
  orderInfoHeader.textContent = "Your Order Details";

  const orderInfo = document.createElement("div");
  orderInfo.innerHTML = `
    <div>
    <p>Dear ${formData.username} ${formData.username}!</p>
    <p>Your order will be shiped by ${formData.deliverydate} 
    to Adress: ${formData.street}, house №${formData.house}, flat №${formData.flat}.</p>
    <p>Enjoy your reading!</p>
    </div>`;

  documentFragment.appendChild(orderInfoHeader);
  documentFragment.appendChild(orderInfo);
  formSection.appendChild(documentFragment);
}

function clearCartData() {
  console.log("cart", cart);
  cart.length = 0;
  localStorage.removeItem("cart");
}

formSubmitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const formData = saveFormData();
  orderInfoRender(formData);
  clearCartData();
});
