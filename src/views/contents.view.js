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
  }

  render() {
    this.setPageContents();
    this.setPagination();
  }

  getCardsDataForCurrentPage() {
    this._data = getSearchResultsPage(this._currentPage);
  }

  clearCardContainer() {
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
    this.clearCardContainer();
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
