export default class CardView {
  _data;

  constructor(data = undefined) {
    this._data = data;

    // setting up execution context for methods
    this._generateMarkup.bind(this);
  }

  _generateMarkup() {
    let markup = ``;

    if (this._data.name === undefined) {
      let item = this._data !== undefined ? this._data : "none";

      markup += `
<div class="card">
    Card
    <h2 class="card-title">${item}</h2>
</div>`;

      return markup;
    }

    return markup;
  }
}
