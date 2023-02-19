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

  render() {
    this._clearParent();
  }

  _clearParent() {
    this._parentElement.innerHTML = "";
  }
}
