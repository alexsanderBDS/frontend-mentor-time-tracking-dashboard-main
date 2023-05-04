import data from "./data.json" assert { type: "json" };

window.addEventListener("load", () => {
  addAnchorKeys();
  addCards();
  selectOption();
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
  const sessionOption = localStorage.getItem("option");

  if (sessionOption === null) {
    localStorage.setItem("option", "daily");
  }

  const elements = data.map((item) => {
    const cardEl = document.createElement("div");
    cardEl.classList.add("card");
    cardEl.setAttribute("data-img", item.title.toLowerCase().replace(" ", "-"));

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
    const previewTimeEl = document.createElement("p");
    previewTimeEl.classList.add("description");

    updateContent(
      currentTimeEl,
      item.timeframes[sessionOption].current,
      previewTimeEl,
      item.timeframes[sessionOption].previous
    );

    divItem2El.appendChild(currentTimeEl);
    divItem2El.appendChild(previewTimeEl);

    const divAllEl = document.createElement("div");
    divAllEl.classList.add("content");
    divAllEl.appendChild(divItem1El);
    divAllEl.appendChild(divItem2El);

    cardEl.appendChild(divAllEl);

    return cardEl;
  });

  elements.forEach((el) => {
    cardsEl.appendChild(el);
  });
}

function updateContent(
  currentTimeEl,
  currentTimeText,
  previewTimeEl,
  previewTimeText
) {
  const sessionOption = localStorage.getItem("option");

  if (sessionOption === null) {
    localStorage.setItem("option", "daily");
  }

  const textOption = {
    daily: "Last Day - ",
    weekly: "Last Week - ",
    monthly: "Last Month - ",
  };

  currentTimeEl.textContent = `${currentTimeText}hrs`;
  previewTimeEl.textContent = `${textOption[sessionOption]}${previewTimeText}hrs`;
}

function selectOption() {
  const optionsEl = document.querySelectorAll(".card-option");

  optionsEl.forEach((opEl) => {
    opEl.addEventListener("click", (e) => {
      optionsEl.forEach((elStyle) => {
        if (elStyle.classList.contains("active")) {
          elStyle.classList.remove("active");
        }
      });

      const cardEl = document.querySelectorAll(".card");
      e.preventDefault();
      e.target.classList.add("active");

      localStorage.setItem("option", e.target.textContent);

      cardEl.forEach((el) => {
        el.parentNode.removeChild(el);
      });

      addCards();
    });
  });
}
