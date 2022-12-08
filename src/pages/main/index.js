import "./style.scss";

import logoImageSrc from "../../images/logo.svg";
import cartLogoSrc from "../../images/cart.svg";
import intoImageSrc from "../../images/book-image.png";

import cardDataJSON from "../../utils/data.json";

let cart = [];

const documentFragment = new DocumentFragment();
const body = document.querySelector(".page");

// -- HEADER--
const renderHeader = () => {
  const header = document.createElement("header");
  const headerContainer = document.createElement("div");
  const logo = document.createElement("h1");
  const logoLink = document.createElement("a");
  const logoImg = document.createElement("img");
  const logoText = document.createElement("p");
  const cartCounterWrapper = document.createElement("div");
  const cartLogo = document.createElement("img");
  const cartCounter = document.createElement("span");

  header.classList.add("header");
  headerContainer.classList.add("container");
  logo.classList.add("logo");
  logoLink.classList.add("logo__link");
  logoLink.setAttribute("href", "#");
  logoLink.setAttribute("aria-label", "main page");
  logoImg.classList.add("logo__img");
  logoImg.setAttribute("src", logoImageSrc);
  logoImg.setAttribute("alt", "book logo");
  logoText.classList.add("logo__text");
  logoText.textContent = "Page";
  cartCounterWrapper.classList.add("header__cart-wrapper");
  cartLogo.setAttribute("src", cartLogoSrc);
  cartLogo.setAttribute("alt", "cart logo");
  cartLogo.classList.add("header__cart-logo");
  cartCounter.textContent = "";
  cartCounter.classList.add("header__cart-counter");

  header.appendChild(headerContainer);
  headerContainer.appendChild(logo);
  logo.appendChild(logoLink);
  logoLink.appendChild(logoImg);
  logoLink.appendChild(logoText);
  headerContainer.appendChild(cartCounterWrapper);
  cartCounterWrapper.appendChild(cartLogo);
  cartCounterWrapper.appendChild(cartCounter);

  documentFragment.append(header);
};

renderHeader();

// -- MAIN
const main = document.createElement("main");
const sectionIntro = document.createElement("section");
const sectionBookShelf = document.createElement("section");
const introTextContainer = document.createElement("div");
const introImg = document.createElement("img");
const introTitle = document.createElement("p");
const introSubtitle = document.createElement("p");
const introText = document.createElement("p");
const bookShelfTitle = document.createElement("h2");
const booksContainer = document.createElement("div");
const cardsContainer = document.createElement("div");
const sectionCart = document.createElement("section");
const cartTitle = document.createElement("h2");
const cartContainer = document.createElement("div");
const cartBooksContainer = document.createElement("div");
const cartTolalContainer = document.createElement("div");

main.classList.add("main");
// -- sectionIntro
sectionIntro.classList.add("section", "intro");

introTextContainer.classList.add("intro-text-container");
introTitle.textContent = "Welcome to Pages!!!";
introTitle.classList.add("intro__title");
introSubtitle.textContent = "Your Books From The Best Writers.";
introSubtitle.classList.add("intro__subtitle");
introText.textContent =
  "We believe that reading books are essential to a healthy culture. They’re where authors can connect with readers.";
introText.classList.add("intro__text");
introImg.classList.add("intro__image");
introImg.setAttribute("src", intoImageSrc);
introImg.setAttribute("alt", "book image");
// --section Book-Shelf
sectionBookShelf.classList.add("book-shelf");
bookShelfTitle.textContent = "Catalogue";
bookShelfTitle.classList.add("book-shelf__title");
booksContainer.classList.add("book-shelf__container");
cardsContainer.classList.add("book-shelf__cards-container");
// --section Cart
sectionCart.classList.add("cart");
cartTitle.textContent = "Your Cart";
cartTitle.classList.add("cart__title");
cartContainer.classList.add("cart__container");
cartBooksContainer.classList.add("cart__cards-container");
cartTolalContainer.classList.add("cart__total-container");
// -- sectionIntro
main.appendChild(sectionIntro);
sectionIntro.appendChild(introTextContainer);
introTextContainer.appendChild(introTitle);
introTextContainer.appendChild(introSubtitle);
introTextContainer.appendChild(introText);
sectionIntro.appendChild(introImg);
// --section Book-Shelf
main.appendChild(sectionBookShelf);
sectionBookShelf.appendChild(booksContainer);
booksContainer.appendChild(bookShelfTitle);
booksContainer.appendChild(cardsContainer);
// --section Cart
main.appendChild(sectionCart);
sectionCart.appendChild(cartContainer);
cartContainer.appendChild(cartTitle);
cartContainer.appendChild(cartBooksContainer);
sectionCart.appendChild(cartTolalContainer);

// -- FOOTER
const footer = document.createElement("footer");
const footerContainer = document.createElement("div");

footer.classList.add("footer");
footerContainer.classList.add("container");

footer.appendChild(footerContainer);

// --page render--

documentFragment.append(main);
documentFragment.append(footer);
body.appendChild(documentFragment);

async function renderCards() {
  const documentFragment = new DocumentFragment();
  const booksContainer = document.querySelector(".book-shelf__cards-container");

  cardDataJSON.forEach((item, i) => {
    item.id = i + 1;
    const card = document.createElement("div");
    card.classList.add("card");

    const cardImgWrapper = document.createElement("div");
    cardImgWrapper.classList.add("card__img");
    const cardImg = document.createElement("img");
    cardImg.setAttribute("src", item.imageLink);
    cardImg.setAttribute("alt", item.title);

    const cardInfo = document.createElement("div");
    cardInfo.classList.add("card__info");
    const author = document.createElement("p");
    author.classList.add("card__text-author");
    author.textContent = item.author;
    const title = document.createElement("p");
    title.classList.add("card__text-title");
    title.textContent = item.title;
    const price = document.createElement("p");
    price.classList.add("card__text-price");
    price.textContent = "$" + `${item.price}`;

    const btnContainer = document.createElement("div");
    btnContainer.classList.add("card__btn-container");

    const showMoreBtn = document.createElement("button");
    showMoreBtn.classList.add("card__btn");
    showMoreBtn.textContent = "Show more";
    showMoreBtn.addEventListener("click", () => {
      const popup = document.querySelector(`#popup${i + 1}`);
      popup.classList.toggle("popup_visible");
    });

    // -- ShowMore popup
    const popup = document.createElement("div");
    popup.classList.add("popup");
    popup.setAttribute("id", `popup${i + 1}`);
    const popupText = document.createElement("p");
    popupText.classList.add("popup__text");
    popupText.textContent = item.description;
    const popupCloseBtnWrapper = document.createElement("div");
    popupCloseBtnWrapper.classList.add("popup__btn-close-wrapper");
    const popupCloseBtn = document.createElement("button");
    popupCloseBtn.textContent = "x";
    popupCloseBtn.classList.add("popup__btn-close");
    popupCloseBtn.addEventListener("click", () => {
      const popup = document.querySelector(`#popup${i + 1}`);
      popup.classList.remove("popup_visible");
    });

    const addToBagBtn = document.createElement("button");
    addToBagBtn.classList.add("card__btn");
    addToBagBtn.textContent = "Add to cart";
    addToBagBtn.onclick = function () {
      addToCart(item.id);
    };

    card.appendChild(cardImgWrapper);
    cardImgWrapper.appendChild(cardImg);
    card.appendChild(cardInfo);
    cardInfo.appendChild(author);
    cardInfo.appendChild(title);
    cardInfo.appendChild(price);
    cardInfo.appendChild(btnContainer);
    btnContainer.appendChild(showMoreBtn);
    card.appendChild(popup);
    popup.appendChild(popupCloseBtnWrapper);
    popupCloseBtnWrapper.appendChild(popupCloseBtn);
    popup.appendChild(popupText);
    btnContainer.appendChild(addToBagBtn);

    documentFragment.appendChild(card);
  });

  booksContainer.appendChild(documentFragment);
}

renderCards();

function addToCart(id) {
  if (cart.some((book) => book.id === id)) {
    alert("You have alredy added this book to the cart");
  } else {
    const item = cardDataJSON.find((book) => book.id === id);
    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));
    //console.log("add cart", cart);
  }
  updateCart();
}

function updateCart() {
  renderCart();
  renderCartTotal();
}

// render cart items
function renderCart() {
  const documentFragment = new DocumentFragment();
  const cartBooksContainer = document.querySelector(".cart__cards-container");

  if (!cart.length) {
    cartBooksContainer.textContent = "Your cart is empty. Add some books";
    return;
  }

  cartBooksContainer.innerHTML = "";

  cart.forEach((item) => {
    const cartElement = document.createElement("div");
    cartElement.classList.add("cart__element");
    cartElement.setAttribute("id", item.id);

    const cartElImgWrapper = document.createElement("div");
    cartElImgWrapper.classList.add("cart__img");
    const cartImg = document.createElement("img");
    cartImg.setAttribute("src", item.imageLink);
    cartImg.setAttribute("alt", item.title);

    const cartInfo = document.createElement("div");
    cartInfo.classList.add("cart__info");
    const author = document.createElement("p");
    author.classList.add("cart__text-author");
    author.textContent = item.author;
    const title = document.createElement("p");
    title.classList.add("cart__text-title");
    title.textContent = item.title;
    const price = document.createElement("p");
    price.classList.add("cart__text-price");
    price.textContent = "$" + `${item.price}`;

    const delBtnWrapper = document.createElement("div");
    delBtnWrapper.classList.add("cart_btn-wrapper");
    const delBtn = document.createElement("button");
    delBtn.textContent = "x";

    delBtn.addEventListener("click", () => {
      //console.log("id", item.id);
      //console.log("el by id", document.getElementById(item.id));
      cartBooksContainer.removeChild(document.getElementById(item.id));
      cart = cart.filter((el) => el.id !== item.id);
      localStorage.setItem("cart", JSON.stringify(cart));
      console.log("cart after del", cart);
      renderCartTotal();
    });

    cartElement.appendChild(delBtnWrapper);
    delBtnWrapper.appendChild(delBtn);
    cartElement.appendChild(cartElImgWrapper);
    cartElImgWrapper.appendChild(cartImg);
    cartElement.appendChild(cartInfo);
    cartInfo.appendChild(author);
    cartInfo.appendChild(title);
    cartInfo.appendChild(price);

    documentFragment.appendChild(cartElement);
  });

  cartBooksContainer.appendChild(documentFragment);
}

function renderCartTotal() {
  // console.log("render total start");
  let totalPrice = 0;
  let totalItems = cart.length;

  cart.forEach((book) => {
    totalPrice += book.price;
  });

  const documentFragment = new DocumentFragment();
  const cartTolalContainer = document.querySelector(".cart__total-container");
  cartTolalContainer.innerHTML = "";
  const totalAmaunt = document.createElement("div");
  const btnContainer = document.createElement("div");
  const clearCartBtn = document.createElement("button");
  const orderBtn = document.createElement("button");
  const orderBtnLink = document.createElement("a");
  const headerCounter = document.querySelector(".header__cart-counter");
  headerCounter.textContent = `${cart.length}`;

  totalAmaunt.classList.add("cart__total-amount");
  totalAmaunt.textContent =
    "Subtotal (" + `${totalItems}` + " items): $" + `${totalPrice}`;
  btnContainer.classList.add("cart__btn-container");
  clearCartBtn.textContent = "Clear cart";
  clearCartBtn.classList.add("cart__btn");
  orderBtnLink.textContent = "Make order";
  orderBtn.classList.add("cart__btn");
  orderBtnLink.setAttribute("href", "./orderform.html");

  clearCartBtn.addEventListener("click", () => {
    cart = [];
    headerCounter.textContent = `${cart.length}`;
    renderCart();
  });

  //TODO doesnt work
  if (cart.length === 0) {
    clearCartBtn.setAttribute("disabled", "");
    orderBtn.setAttribute("disabled", "");
  }

  documentFragment.appendChild(totalAmaunt);
  documentFragment.appendChild(btnContainer);
  btnContainer.appendChild(clearCartBtn);
  btnContainer.appendChild(orderBtn);
  orderBtn.appendChild(orderBtnLink);

  cartTolalContainer.appendChild(documentFragment);
}

renderCart();
renderCartTotal();
