import {
  getPageRange,
  getSearchResultsPage,
  getTotalDataLength,
} from "../models/contents.model";
import CardView from "./card.view";
import PaginateView from "./paginate.view";

class ContentsView {
  _currentPage = 1;
  _data = undefined;
  _paginate = undefined;

  _parentElement = document.querySelector(".main-content");
  _headingElement = document.querySelector(".heading");
  _cardContainer = document.querySelector(".card-container");

  constructor() {
    // setting up execution context for methods
    this.getCardsDataForCurrentPage.bind(this);
    this.setCurrentPage.bind(this);
    this.setPageContents.bind(this);
    this.setHeading.bind(this);
    this.setPagination.bind(this);
    this.resetCardContainer.bind(this);
    this.resetPage.bind(this);
  }

  render() {
    this.resetPage();
    this.setPageContents();
    this.setPagination();
  }

  getCardsDataForCurrentPage() {
    this._data = getSearchResultsPage(this._currentPage);
  }

  resetPage() {
    // Reset banner
    let banner = document.querySelector(".page-banner");
    if (banner.classList.contains("page-banner-active"))
      banner.classList.remove("page-banner-active");
    this.resetCardContainer();
  }

  resetCardContainer() {
    for (let i = 0; i < this._parentElement.children.length; i++) {
      let temp = this._parentElement.children[i];
      if (
        temp.classList.contains("card-container") ||
        temp.classList.contains("about-tab") ||
        temp.classList.contains("menu-tab") ||
        temp.classList.contains("review-tab")
      ) {
        temp.className = "card-container";
        this._cardContainer = temp;
        break;
      }
    }
    this._cardContainer.innerHTML = "";
  }

  /**
   * @param {number} pageNo page no to transition to
   */
  setCurrentPage(pageNo) {
    this._currentPage = pageNo;
  }

  setPageContents() {
    this.getCardsDataForCurrentPage();
    this.resetCardContainer();
    let cards = this._data.map((item) => new CardView(item).render());
    this._parentElement.scrollIntoView({
      behavior: "smooth",
    });
    this.setHeading();
  }

  setPagination() {
    let maxPage = getPageRange();
    if (maxPage > 1) {
      this._paginate = new PaginateView(maxPage, this._currentPage);
    }
  }

  setHeading() {
    this._headingElement.innerHTML = "";
    let markup = `<h1 class="heading-name">Showing ${
      this._data.length
    } out of ${getTotalDataLength()} search results</h1>`;
    this._headingElement.innerHTML = markup;
  }
}

export default new ContentsView();
