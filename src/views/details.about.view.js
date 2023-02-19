export default class ResturantDetailsAboutView {
  _data;
  _parentElement;

  constructor(data) {
    this._data = data;

    // Sets execution context for methods
    this._setParentElement.bind(this);
    this.render.bind(this);
    this._clearParent.bind(this);
    this._parseTimeTable.bind(this);
    this._renderOffersTab.bind(this);
    this._renderDescriptions.bind(this);
    this._renderTimetable.bind(this);
    this._renderTransportation.bind(this);
    this._renderMenuPreview.bind(this);

    // Select parent
    this._setParentElement();
  }

  _setParentElement() {
    let containerElement = document.querySelector(".main-content");
    for (let i = 0; i < containerElement.children.length; i++) {
      let temp = containerElement.children[i];
      if (
        temp.classList.contains("card-container") ||
        temp.classList.contains("about-tab") ||
        temp.classList.contains("menu-tab") ||
        temp.classList.contains("review-tab")
      ) {
        temp.className = "about-tab";
        this._parentElement = temp;
        break;
      }
    }
  }

  render() {
    console.log("ok inside:", this);
    this._clearParent();

    this._renderOffersTab();
    this._renderMenuPreview();
    this._renderTimetable();
    this._renderDescriptions();
    this._renderTransportation();
  }

  _clearParent() {
    this._parentElement.innerHTML = "";
  }

  _parseTimeTable() {
    let OpeningHoursArray = this._data.openingHours
      .split("\r\n")
      .filter((item) => item.length > 0)
      .map((item) => {
        let day,
          tokens = item.split(",").map((item) => item.trim()),
          times = tokens.map((item) =>
            item.split("-").map((item) => {
              return item.trim();
            })
          );

        let final = times
          .map((item, index) => {
            let start,
              end = item[1];

            if (item[0].includes(" ") && index === 0) {
              day = item[0].split(" ")[0];
              start = item[0].split(" ")[1];
            } else if (index === 0 && !item[0].includes(" ")) {
              day = item[0];
              return;
            } else {
              start = item[0];
            }
            return {
              start: this.convert12HrTimeFormat(start),
              end: this.convert12HrTimeFormat(end),
            };
          })
          .filter((item) => item !== undefined);
        return { day, time: final };
      });
    return OpeningHoursArray;
  }

  convert12HrTimeFormat(timeString) {
    let [hr, min] = timeString.split(":").map((item) => parseInt(item)),
      tailingStr = ``;
    if (hr > 11) tailingStr = "PM";
    else tailingStr = "AM";

    if (hr > 12) hr -= 12;
    else if (hr === 0) hr = 12;

    return `${`${hr}`.padStart(2, "0")}:${`${min}`.padStart(
      2,
      "0"
    )} ${tailingStr}`;
  }

  _renderTimetable() {
    if (!this._data.openingHours) return;

    let timeTable = this._parseTimeTable();
    let markup = `
    <div class="time-table">
      <h2 class="time-table-heading">Opening Hours</h2>
      <div class="time-table-list">`;
    timeTable.map((item) => {
      markup += `
        <div class="time-table-row">
          <div style="min-width: 8rem;">${item.day}</div>
          <div class="time-row">`;
      let len = item.time.length;
      item.time.map((t, index) => {
        markup += `
        <div> ${t.start} - ${t.end} </div>`;
        if (index < len - 1)
          markup += `
            <div>
              <span>•</span>
            </div>`;
      });
      if (len === 0) markup += `<div> Closed </div>`;
      markup += `
          </div>
        </div>`;
    });
    markup += `
      </div>
    </div>`;

    this._parentElement.insertAdjacentHTML("beforeend", markup);
  }

  _renderOffersTab() {
    let markup = `
  <div class="offers">
    <h2 class="offers-title">Offers</h2>
    <div class="offers-box shadow">`;
    this._data.offers.map((item) => {
      markup += `
      <div class="offer-card shadow">
        <div>
          <span class="offer-tag">${item.label}</span>
          <span>${item.name}</span>
        </div>
        <p>${item.description}</p>
        <button class="offer-card-button">Book this menu</button>
      </div>`;
    });
    markup += `
    </div>
  </div>
  `;

    if (this._data.offers.length > 0)
      this._parentElement.insertAdjacentHTML("beforeend", markup);
  }

  _renderDescriptions() {
    let markup = `
  <div class="about-description">
    <h2>About Us</h2>
    <p>${this._data.description}</p>`;
    markup += `
  </div>`;
    if (this._data.description)
      this._parentElement.insertAdjacentHTML("beforeend", markup);
  }

  _renderTransportation() {
    let markup = `
    <div class="about-transport">`;
    if (this._data.additionalProperty.transport) {
      markup += `
      <h2>Transportation</h2>
        <div>${this._data.additionalProperty.transport}</div>`;
    }
    if (this._data.additionalProperty.parking) {
      markup += `
      <h2>Parking</h2>
        <div>${this._data.additionalProperty.parking}</div>`;
    }
    markup += `</div>`;
    this._parentElement.insertAdjacentHTML("beforeend", markup);
  }

  _renderMenuPreview() {
    let markup = `<div class="about-menu-preview">`;
    markup += `<h1>Resturant Menu</h1>`;
    if (this._data.chef)
      markup += `<h3 class="menu-chef-name">Chef name: ${this._data.chef}</h3>`;

    this._data.menus.map((item) => {
      markup += this._generateMenuItemPreviewMarkup(item);
    });
    markup += `</div>`;
    this._parentElement.insertAdjacentHTML("beforeend", markup);
  }

  _generateMenuItemPreviewMarkup(item) {
    let markup = `
    <div class="preview-menu-item">`;
    markup += `
      <p>${item.name}</p>
      <p>${item.price}</p>`;
    markup += `
    </div>`;
    return markup;
  }
}
