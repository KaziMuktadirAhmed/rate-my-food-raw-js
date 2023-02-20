export default class ResturantDetailsAboutView {
  _data;
  _parentElement;

  constructor(data) {
    // Set component data
    this._data = data;

    // Sets execution context for methods
    this._setParentElement.bind(this);
    this._clearParent.bind(this);
    this.render.bind(this);
    this._renderHeading.bind(this);
    this._renderMenuSections.bind(this);
    this._renderChefName.bind(this);

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
        temp.className = "menu-tab";
        this._parentElement = temp;
        break;
      }
    }
  }

  _generateMarkup() {}

  render() {
    console.log(this._data);
    this._clearParent();
    this._renderHeading();
    this._renderChefName();
    this._renderMenuSections();
  }

  _clearParent() {
    this._parentElement.innerHTML = "";
  }

  _renderHeading() {
    this._parentElement.insertAdjacentHTML(
      "beforeend",
      `<h1 class="menu-tab-heading">Resturant Menu</h1>`
    );
  }

  _renderChefName() {
    if (this._data.chef) {
      let markup = `<h3 class="menu-chef-name">Chef name: ${this._data.chef}</h3>`;
      this._parentElement.insertAdjacentHTML("beforeend", markup);
    }
  }

  _renderMenuSections() {
    let markup = `<div class="menu-details">`;
    this._data.menus.map((item) => {
      markup += `<div>`;
      markup += `<h2 class="menu-heading">${item.name}</h2>`;
      if (item.exclusion)
        markup += `<p class="menu-heading-additional-info">${item.exclusion}</p>`;
      markup += this._generateMarkupForMenuSection(item.sections);
      markup += `</div>`;
    });
    markup += `</div>`;
    this._parentElement.insertAdjacentHTML("beforeend", markup);
  }

  _generateMarkupForMenuSection(sections) {
    let markup = ``;
    sections.map((sec) => {
      markup += `<div class="menu-section">`;
      markup += `<h3 class="menu-section-heading">${sec.name}</h3>`;
      sec.items.map((menu_item) => {
        markup += this._generateMarkupForMenuItem(menu_item);
      });
      markup += `</div>`;
    });
    return markup;
  }

  _generateMarkupForMenuItem(menu_item) {
    let markup;
    if (menu_item.isMainDish) markup = `<div class="menu-item menu-item-main">`;
    else markup = `<div class="menu-item">`;
    markup += `<p class="menu-item-name">${menu_item.name}</p>`;
    markup += `<p>${menu_item.price} ${this._data.currency}</p>`;
    markup += `</div>`;
    return markup;
  }
}
