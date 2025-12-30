import { luhnCheck } from "./luhn.js";
import { getCardType } from "./getCardType.js";

import visa from "./img/icons8-виза-50.png";
import amex from "./img/icons8-amex-50.png";
import discover from "./img/icons8-discover-50.png";
import diners from "./img/icons8-diners-club-50.png";
import mir from "./img/icons8-мир-50.png";

export default class CardWidget {
  constructor(container) {
    this.container = container;
  }

  render() {
    this.container.innerHTML = `
      <div class="card-list">
          <img data-type="visa" class="card-img" src="${visa}">
          <img data-type="amex" class="card-img" src="${amex}">
          <img data-type="discover" class="card-img" src="${discover}">
          <img data-type="diners" class="card-img" src="${diners}">
          <img data-type="mir" class="card-img" src="${mir}">
      </div>

      <input type="text" class="card-input" placeholder="Введите номер карты">
      <button id="validate">Click to Validate</button>
  `;

    this.input = this.container.querySelector(".card-input");
    this.images = this.container.querySelectorAll(".card-img");
    this.button = this.container.querySelector("#validate");

    this.button.addEventListener("click", () => this.validate());
    this.input.addEventListener("input", () => this.highlight());
  }

  highlight() {
    const type = getCardType(this.input.value);

    this.images.forEach((img) => {
      img.classList.toggle("active", img.dataset.type === type);
    });
  }

  validate() {
    const number = this.input.value;

    if (luhnCheck(number)) {
      this.input.classList.remove("invalid");
      this.input.classList.add("valid");
    } else {
      this.input.classList.remove("valid");
      this.input.classList.add("invalid");
    }
  }
}
