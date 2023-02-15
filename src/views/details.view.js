import { setContentData } from "../controllers/details.controller";
import { getContentData, getData } from "../models/details.model";
import ResturantDetailsAboutView from "./details.about.view";
import ResturantDetailsHeadingView from "./details.heading.view";

class ResturantDetailsView {
  _data;

  _parentElement = document.querySelector(".main-content");
  _bannerElement = document.querySelector(".page-banner");

  constructor() {
    // Sets the execution context for functions
    this.setData.bind(this);
    this.setContent.bind(this);
    this.render.bind(this);
    this._setHeading.bind(this);

    // Sets component data
    this.setData();

    // Set initial content data
    setContentData("tab-about");
  }

  render() {
    this._clearImmidieateChildsOfParentElement();
    this._addImageReel();
    this._setHeading();
    this.setContent();
  }

  setData() {
    this._data = getData();
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

  _setHeading() {
    let {
      aggregateRatings: {
        thefork: { ratingValue, reviewCount },
      },
    } = this._data;
    let heading = new ResturantDetailsHeadingView({
      tags: this._data.highlightedTag,
      name: this._data.name,
      rating: { ratingValue, reviewCount },
      address: this._data.address,
      currency: this._data.acceptedCurrency,
      averagePrice: this._data.averagePrice,
    });

    heading.render();
  }

  setContent() {
    // initializes content class
    let contentData = getContentData();
    let contentView;

    if (contentData.type === "about") {
      contentView = new ResturantDetailsAboutView(contentData);
      // document.querySelector(".tab-about").classList.add("tab-active");
    } else if (contentData.type === "menu") {
      // document.querySelector(".tab-menu").classList.add("tab-active");
    } else if (contentData.type === "rqeview") {
      // document.querySelector(".tab-reviews").classList.add("tab-active");
    }

    let activeTab = document.querySelector(".tab-active");
    if (activeTab) activeTab.classList.remove("tab-active");
    document
      .querySelector(`.tab-${contentData.type}`)
      .classList.add("tab-active");

    contentView.render();
  }
}

export default new ResturantDetailsView();
