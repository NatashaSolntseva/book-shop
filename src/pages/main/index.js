import "./style.scss";
//import Api from "../../components/Api";
//import { fetchParams } from "../../utils/variables";
import logoImageSrc from "../../images/logo.svg";
import intoImageSrc from "../../images/book-image.png";
import cardDataJSON from "../../utils/data.json";

console.log("cardDataJSON", cardDataJSON);

let book = null;

//const api = new Api(fetchParams);

//console.log(api);

const documentFragment = new DocumentFragment();
const body = document.querySelector(".page");

// -- HEADER--
const header = document.createElement("header");
const headerContainer = document.createElement("div");
const logo = document.createElement("h1");
const logoLink = document.createElement("a");
const logoImg = document.createElement("img");
const logoText = document.createElement("p");

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

header.appendChild(headerContainer);
headerContainer.appendChild(logo);
logo.appendChild(logoLink);
logoLink.appendChild(logoImg);
logoLink.appendChild(logoText);

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

main.classList.add("main");
// -- sectionIntro
sectionIntro.classList.add("section", "intro");
sectionBookShelf.classList.add("book-shelf");
introTextContainer.classList.add("intro-text-container");
introTitle.textContent = "Welcome to Pages!!!";
introSubtitle.textContent = "Your Books From The Best Writer.";
introText.textContent =
  "We believe that reading books are essential to a healthy culture. They’re where authors can connect with readers.";
introImg.classList.add("intro__image");
introImg.setAttribute("src", intoImageSrc);
introImg.setAttribute("alt", "book image");
// --section Book-Shelf
bookShelfTitle.textContent = "The Author’s Book";
bookShelfTitle.classList.add("book-shelf__title");
booksContainer.classList.add("book-shelf__container");
cardsContainer.classList.add("book-shelf__cards-container");

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
// -- FOOTER
const footer = document.createElement("footer");
const footerContainer = document.createElement("div");

footer.classList.add("footer");
footerContainer.classList.add("container");

footer.appendChild(footerContainer);

// --page render--
documentFragment.append(header);
documentFragment.append(main);
documentFragment.append(footer);
body.appendChild(documentFragment);

async function renderCards() {
  const documentFragment = new DocumentFragment();
  const booksContainer = document.querySelector(".book-shelf__cards-container");

  cardDataJSON.forEach((item, i) => {
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
    addToBagBtn.textContent = "Add to bag";

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
