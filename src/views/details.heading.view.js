import { setContentData } from "../controllers/details.controller";

export default class ResturantDetailsHeadingView {
  _data;
  _parentElement = document.querySelector(".heading");

  constructor(data) {
    this._data = data;

    // Sets execution context for function.
    this.render.bind(this);
    this._addsEventHandler.bind(this);
  }

  render() {
    this._renderTags();
    this._renderTitle();
    this._renderAdditionalHeadingInfo();
    this._renderTabsMenu();

    // Adds event handlers
    this._addsEventHandler();
  }

  _renderTags() {
    let tagMarkup = ``;
    this._data.tags.map((item) => {
      tagMarkup += `<span class="card-tag-${item.highlightType}">${item.text}</span>`;
    });
    tagMarkup = `<p class="card-tags">` + tagMarkup + `</p>`;
    this._parentElement.insertAdjacentHTML("afterbegin", tagMarkup);
  }

  _renderTitle() {
    let headingTitleMarkup = `<h1 class="heading-name">${this._data.name}</h1>`;
    headingTitleMarkup += `
<div>
  <p>
    <span class="heading-rating">${this._data.rating.ratingValue}</span>
    /10
  </p>
  <div>
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" focusable="false" mr="xs" alt="" class="css-igdmea e125e8xs0"><path fill-rule="evenodd" d="M10.5 3C6.365 3 3 6.365 3 10.5S6.365 18 10.5 18h3c.131 0 .26.033.372.098L18 20.458v-3.593c0-.224.1-.437.272-.579A7.478 7.478 0 0 0 21 10.5C21 6.365 17.635 3 13.5 3h-3Zm8.25 19.5a.747.747 0 0 1-.372-.098L13.301 19.5H10.5c-4.963 0-9-4.037-9-9s4.037-9 9-9h3c4.963 0 9 4.037 9 9 0 2.575-1.088 5-3 6.709v4.541a.75.75 0 0 1-.75.75Z"></path></svg>
    ${this._data.rating.reviewCount}
  </div>
</div>`;
    headingTitleMarkup =
      `<div class="heading-title">` + headingTitleMarkup + `</div>`;
    this._parentElement.insertAdjacentHTML("beforeend", headingTitleMarkup);
  }

  _renderAdditionalHeadingInfo() {
    this._parentElement.insertAdjacentHTML(
      "beforeend",
      `<h4 class="card-address">
        ${this._data.address.street}, ${this._data.address.zipCode}, ${this._data.address.locality}
      </h4>
      <p class="card-address">
        Avarage price range: ${this._data.currency} ${this._data.averagePrice}
      </p>`
    );
  }

  _renderTabsMenu() {
    let tabsMarkup = `
<div class="menu-tabs">
  <button class="tab tab-about">
    <span>About</span>
  </button>
  <button class="tab tab-menu">
    <span>Menu</span>
  </button>
  <button class="tab tab-review">
    <span>Review</span>
  </button>
</div>`;
    this._parentElement.classList.toggle("heading-no-padding-bottom");
    this._parentElement.insertAdjacentHTML("beforeend", tabsMarkup);
  }

  _addsEventHandler() {
    let btns = document.querySelectorAll(".tab");
    btns.forEach((btn) =>
      btn.addEventListener("click", this._handelClick.bind(this))
    );
  }

  _handelClick(event) {
    event.preventDefault();
    let btn = event.target.closest(".tab");

    if (btn.classList.contains("tab-about")) {
      setContentData("tab-about");
    } else if (btn.classList.contains("tab-menu")) {
      setContentData("tab-menu");
    } else if (btn.classList.contains("tab-review")) {
      setContentData("tab-review");
    }
  }
}
