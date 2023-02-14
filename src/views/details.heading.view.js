export default class ResturantDetailsHeadingView {
  _data;
  _parentElement = document.querySelector(".heading");

  constructor(data) {
    this._data = data;

    // Sets execution context for function.
    this.render.bind(this);
  }

  render() {
    this._renderTags();
  }

  _renderTags() {
    let tagMarkup = ``;

    this._data.tags.map((item) => {
      tagMarkup += `<span class="card-tag-${item.highlightType}">${item.text}</span>`;
    });
    tagMarkup = `<p class="card-tags">` + tagMarkup + `</p>`;
    console.log("set tag", this._parentElement);

    this._parentElement.insertAdjacentHTML("afterbegin", tagMarkup);
  }

  _renderTitle() {}
}
