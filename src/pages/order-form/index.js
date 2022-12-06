import "./style.scss";

const form = document.getElementById("order-form");
const cart = JSON.parse(localStorage.getItem("cart")) || [];
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
