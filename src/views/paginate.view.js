import { handelClick } from "../controllers/pagination.controller";

export default class PaginateView {
  _maxRange = 0;
  _currentPage = 1;

  _parentElement = document.querySelector(".paginate");

  constructor(range = 0, currentPage = 1) {
    this._maxRange = range;
    this._currentPage = currentPage;

    this.handelClickNext.bind(this);
    this.handelClickPrev.bind(this);
    this._addPageLinks.bind(this);
    this._clearParent.bind(this);

    this._clearParent();
    this._addPageLinks();
    this._addButtons();

    this._addClickHandler();
  }

  _clearParent() {
    this._parentElement.innerHTML = "";
  }

  _addPageLinks() {
    let pageLinkSpans = this._generateSpans();
    let markup = ``;

    if (pageLinkSpans.first)
      markup += `
        <span class="page_link">
            1
        </span>
        <span>...</span>
    `;

    markup += pageLinkSpans.middle.join("");

    if (pageLinkSpans.last)
      markup += `
      <span>...</span>
      <span class="page_link">
        ${this._maxRange}
      </span>
    `;

    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _generateSpans() {
    const windowSpan = 2;

    let first = true,
      middle = [],
      last = true;

    let start =
        this._currentPage - windowSpan > 2 ? this._currentPage - windowSpan : 1,
      end =
        this._currentPage + windowSpan < this._maxRange - 1
          ? this._currentPage + windowSpan
          : this._maxRange;

    for (let i = start; i <= end; i++) {
      let stylesStr = `page_link`;
      if (i === this._currentPage) stylesStr += ` page_link_active`;
      middle.push(
        `<span class="${stylesStr}">
          ${i}
        </span>
        `
      );
    }

    if (start === 1) first = false;
    if (end === this._maxRange) last = false;

    return { first, middle, last };
  }

  _addButtons() {
    let buttonHTML = `
            <span class="break"></span>
            <button class="buttons btn-prev">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    fillRule="evenodd"
                    d="M15.749 20.5c-.24 0-.48-.086-.673-.26l-8.249-7.496a1 1 0 0 1 0-1.479l8.249-7.504a1 1 0 0 1 1.346 1.478l-7.436 6.765 7.436 6.756a1.002 1.002 0 0 1-.673 1.74"
                  ></path>
                </svg>
              </button>
              <button class="buttons btn-next">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.25 20.5a1.002 1.002 0 0 1-.673-1.74l7.436-6.756-7.436-6.765a1 1 0 1 1 1.346-1.478l8.249 7.504a1 1 0 0 1 0 1.479L8.923 20.24c-.193.174-.433.26-.673.26"
                  ></path>
                </svg>
              </button>
    `;
    this._parentElement.insertAdjacentHTML("beforeend", buttonHTML);
  }

  _addClickHandler() {
    const pageLinks = document.querySelectorAll(".page_link");
    const btnNext = document.querySelector(".btn-next"),
      btnPrev = document.querySelector(".btn-prev");

    pageLinks.forEach((item) =>
      item.addEventListener("click", this.handelLinkClick)
    );

    btnNext.addEventListener("click", (event) => this.handelClickNext(event));
    btnPrev.addEventListener("click", (event) => this.handelClickPrev(event));
  }

  handelClickNext(event) {
    event.preventDefault();
    if (this._currentPage === this._maxRange) return;
    handelClick(this._currentPage + 1);
  }

  handelClickPrev(event) {
    event.preventDefault();
    if (this._currentPage === 1) return;
    handelClick(this._currentPage - 1);
  }

  handelLinkClick(event) {
    event.preventDefault();
    let gotoPage = parseInt(event.target.innerText);
    handelClick(gotoPage);
  }
}
