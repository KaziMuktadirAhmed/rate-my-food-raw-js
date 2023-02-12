export default class CardView {
  _data;

  constructor(data = undefined) {
    this._data = data;

    // setting up execution context for methods
    this._generateMarkup.bind(this);
    this.filterData.bind(this);
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

    let { name, address, photoSrc, servesCuisine, range, currency } =
      this.filterData();

    markup += `<div class="card">
    <img
      src=${photoSrc}
      alt="Resturant image"
      class="card-image_container"
    />
    <div class="card-description">
      <h3 class="card-title">${name}</h3>
      ${
        servesCuisine &&
        `<p>
          <span class="card-tag">${servesCuisine}</span>
        </p>`
      }
      <h4 class="card-address">${address.street}, ${address.postalCode}, ${
      address.locality
    }</h4>
      <p>Avarage price range: ${range} ${currency}</p>
    </div>
  </div>`;

    return markup;
  }

  filterData() {
    let currency,
      range,
      photoSrc,
      { name, address, servesCuisine } = this._data;

    if (this._data.mainPhotoSrc !== undefined)
      photoSrc = this._data.mainPhotoSrc;
    else if (this._data.photos !== undefined)
      photoSrc = this._data.photos[0].src;

    if (this._data.currenciesAccepted !== undefined)
      currency = this._data.currenciesAccepted;
    else if (this._data.acceptedCurrency !== undefined)
      currency = this._data.acceptedCurrency;

    if (this._data.averagePrice !== undefined) range = this._data.averagePrice;
    else if (this._data.priceRange !== undefined) range = this._data.priceRange;

    return { name, address, photoSrc, servesCuisine, range, currency };
  }
}
