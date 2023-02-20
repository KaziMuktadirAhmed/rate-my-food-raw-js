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
    this._clearParent();
    this._renderChefName();
    console.log(this._data);
  }

  _clearParent() {
    this._parentElement.innerHTML = "";
  }

  _renderChefName() {
    if (this._data.chef) {
      let markup = `<h3 class="menu-chef-name">Chef name: ${this._data.chef}</h3>`;
      this._parentElement.insertAdjacentHTML("beforeend", markup);
    }
  }

  _renderMenuSections() {}
}
