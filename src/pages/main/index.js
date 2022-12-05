import "./style.scss";
//import Api from "../../components/Api";
//import { fetchParams } from "../../utils/variables";
import logoImageSrc from "../../images/logo.svg";
import cartLogoSrc from "../../images/cart.svg";
import intoImageSrc from "../../images/book-image.png";
import cardDataJSON from "../../utils/data.json";

console.log("cardDataJSON", cardDataJSON);

let book = null;
//let cart = JSON.parse(localStorage.getItem("cart")) || [];
let cart = [];
console.log(cart);

//const api = new Api(fetchParams);

//console.log(api);

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
  const cartLogo = document.createElement("img");

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
  cartLogo.setAttribute("src", cartLogoSrc);
  cartLogo.setAttribute("alt", "cart logo");

  header.appendChild(headerContainer);
  headerContainer.appendChild(logo);
  logo.appendChild(logoLink);
  logoLink.appendChild(logoImg);
  logoLink.appendChild(logoText);
  headerContainer.appendChild(cartLogo);
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

main.classList.add("main");
// -- sectionIntro
sectionIntro.classList.add("section", "intro");

introTextContainer.classList.add("intro-text-container");
introTitle.textContent = "Welcome to Pages!!!";
introSubtitle.textContent = "Your Books From The Best Writer.";
introText.textContent =
  "We believe that reading books are essential to a healthy culture. They’re where authors can connect with readers.";
introImg.classList.add("intro__image");
introImg.setAttribute("src", intoImageSrc);
introImg.setAttribute("alt", "book image");
// --section Book-Shelf
sectionBookShelf.classList.add("book-shelf");
bookShelfTitle.textContent = "The Author’s Book";
bookShelfTitle.classList.add("book-shelf__title");
booksContainer.classList.add("book-shelf__container");
cardsContainer.classList.add("book-shelf__cards-container");
// --section Cart
sectionCart.classList.add("cart");
cartTitle.textContent = "Your Cart";
cartTitle.classList.add("cart__title");
cartContainer.classList.add("cart__container");
cartBooksContainer.classList.add("cart__cards-container");

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
    const popupCloseBtn = document.createElement("button");
    popupCloseBtn.textContent = "x";
    popupCloseBtn.addEventListener("click", () => {
      const popup = document.querySelector(`#popup${i + 1}`);
      popup.classList.remove("popup_visible");
    });

    const addToBagBtn = document.createElement("button");
    addToBagBtn.classList.add("card__btn");
    addToBagBtn.textContent = "Add to cart";

    addToBagBtn.addEventListener("click", () => {
      console.log("cart add", cart);
      if (cart.find((el) => el.id === item.id)) {
        console.log("You have alredy added this book to the cart");
        return;
      }
      cart.push(item);
      localStorage.setItem("cart", JSON.stringify(cart));
      console.log(cart);
      renderCart();
    });

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

function renderCart() {
  console.log("start");
  const documentFragment = new DocumentFragment();
  const cartBooksContainer = document.querySelector(".cart__cards-container");

  if (!cart.length) {
    cartBooksContainer.textContent = "Your cart is empty. Add some books";
    return;
  }

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

renderCart();
