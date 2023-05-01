import data from "./data.json" assert { type: "json" };

window.addEventListener("load", () => {
  addAnchorKeys();
  addCards();
});

function addAnchorKeys() {
  const cardOpEl = document.querySelector(".card-options");
  const keys = Object.keys(data[0].timeframes);

  keys.forEach((key) => {
    const opEl = document.createElement("a");
    opEl.setAttribute("href", `#${key}`);
    opEl.classList.add("card-option");
    opEl.textContent = key;
    cardOpEl.appendChild(opEl);
  });
}

function addCards() {
  const cardsEl = document.querySelector(".cards");

  const elements = data.map((item) => {
    const cardEl = document.createElement("div");
    cardEl.classList.add("card");

    const divItem1El = document.createElement("div");
    divItem1El.classList.add("card-item");
    const h2El = document.createElement("h2");
    h2El.classList.add("title");
    h2El.textContent = item.title;
    divItem1El.appendChild(h2El);

    const dotsEl = document.createElement("div");
    dotsEl.classList.add("dots");
    const dotEl = document.createElement("div");
    dotEl.classList.add("dot");
    dotsEl.appendChild(dotEl);
    divItem1El.appendChild(dotsEl);

    cardEl.appendChild(divItem1El);

    const divItem2El = document.createElement("div");
    divItem2El.classList.add("card-item");
    const currentTimeEl = document.createElement("h2");
    currentTimeEl.classList.add("time");
    currentTimeEl.textContent = `${item.timeframes.daily.current}hrs`;
    divItem2El.appendChild(currentTimeEl);

    const previewTimeEl = document.createElement("p");
    previewTimeEl.classList.add("description");
    previewTimeEl.textContent = `${item.timeframes.daily.previous}hrs`;
    divItem2El.appendChild(previewTimeEl);

    const divAllEl = document.createElement("div");
    divAllEl.classList.add("content");
    divAllEl.appendChild(divItem1El);
    divAllEl.appendChild(divItem2El);

    const divImg = document.createElement("div");
    divImg.classList.add("content-img");

    cardEl.appendChild(divImg);
    cardEl.appendChild(divAllEl);

    return cardEl;
  });

  elements.forEach((el) => {
    cardsEl.appendChild(el);
  });
}
