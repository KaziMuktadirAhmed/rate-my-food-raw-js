class ContentsView {
  _componentState = undefined;

  _parentElement = document.querySelector(".main-content");
  _cardContainer = document.querySelector(".card-container");

  constructor(props) {
    this._componentState = props;
  }

  _generateMarkup() {
    markup = ``;

    if (this._componentState.item.name === undefined) {
      let item =
        this._componentState.item !== undefined
          ? this._componentState.item
          : "none";

      markup += `<div class="card">
                    Card
                <h2>${item}</h2>
                </div>`;

      return markup;
    }

    return markup;
  }
}
