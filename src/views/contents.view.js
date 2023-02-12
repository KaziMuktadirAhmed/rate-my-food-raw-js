import { getPageRange, getSearchResultsPage } from "../models/contents.model";
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
    let cards = this._data
      .map((item) => new CardView(item)._generateMarkup())
      .join("");
    this.clearCardContainer();
    this._cardContainer.insertAdjacentHTML("afterbegin", cards);
    this._parentElement.scrollIntoView({
      behavior: "smooth",
    });
  }

  setPagination() {
    let maxPage = getPageRange();
    if (maxPage > 1) {
      this._paginate = new PaginateView(maxPage, this._currentPage);
    }
  }
}

export default new ContentsView();
