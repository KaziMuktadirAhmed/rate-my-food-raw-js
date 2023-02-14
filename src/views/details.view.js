import { resturantDetails } from "../../experiment/mockDB";

class ResturantDetails {
  _data;

  _parentElement = document.querySelector(".main-content");
  _bannerElement = document.querySelector(".page-banner");

  constructor() {
    this.setData.bind(this);
    this.render.bind(this);
    this.setData();
  }

  setData() {
    let {
      data: { restaurant },
    } = resturantDetails;
    this._data = restaurant;
  }

  render() {
    console.log(this._data);
    this._clearImmidieateChildsOfParentElement();
    this._addImageReel();
  }

  _addImageReel() {
    // Clear reel and showing the div on screen
    this._clearImageReel();
    this._bannerElement.classList.toggle("page-banner-active");

    // Generating markup for image reel
    let markup = ``;
    this._data.photos.map((item) => {
      markup += `<img src="${item.src}" class="banner-image">`;
      this._bannerElement.insertAdjacentHTML("beforeend", markup);
    });
  }

  _clearImageReel() {
    this._bannerElement.innerHTML = "";
  }

  _clearImmidieateChildsOfParentElement() {
    let len = this._parentElement.children.length;
    for (let i = 0; i < len; i++) {
      this._parentElement.children[i].innerHTML = "";
    }
  }
}

export default new ResturantDetails();
