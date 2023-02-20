export default class ResturantDetailsReviewView {
  _data;
  _parentElement;

  constructor(data) {
    // Sets component data
    this._data = data;

    // Sets execution context for methods
    this._setParentElement.bind(this);
    this.render.bind(this);
    this._clearParent.bind(this);

    // Sets parent element
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
        temp.className = "review-tab";
        this._parentElement = temp;
        break;
      }
    }
  }

  render() {
    console.log("ok inside:", this._data);
    this._clearParent();
    this._renderHeadingTitle();
  }

  _clearParent() {
    this._parentElement.innerHTML = "";
  }

  _renderHeadingTitle() {
    console.log(this._parentElement);
    this._parentElement.insertAdjacentHTML(
      "beforeend",
      `<h2 class="review-tab-heading">Reviews</h2>`
    );
  }
}
