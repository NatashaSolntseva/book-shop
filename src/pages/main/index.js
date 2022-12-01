import "./style.scss";
import Api from "../../components/Api";
import { fetchParams } from "../../utils/variables";
import logoImageSrc from "../../images/logo.svg";

let book = null;

const api = new Api(fetchParams);

console.log(api);

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
const mainContainer = document.createElement("div");

main.classList.add("main");
mainContainer.classList.add("container");

main.appendChild(mainContainer);

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
