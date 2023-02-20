import { resturantDetails } from "../../experiment/mockDB";
let {
  data: { restaurant },
} = resturantDetails;
let data = restaurant;
let currentContent;

export const setData = function (input) {
  data = input;
};

export const getData = function () {
  return data;
};

const getPreviewMenuData = function (menus_array) {
  let previewMenuItems = [];
  for (let i = 0; i < menus_array.length; i++) {
    if (menus_array[i].menuType.localeCompare("A_LA_CARTE") === 0) {
      previewMenuItems = menus_array[i].sections.map((element) => {
        return element.items[0];
      });
      break;
    }
  }
  return previewMenuItems;
};

export const setCurrentContent = function (type) {
  if (type === "tab-about") {
    currentContent = {
      type: "about",
      description: data.description,
      exchangeRates: data.exchangeRates,
      openingHours: data.openingHours,
      additionalProperty: data.additionalProperty,
      chef: data.chefName,
      menus: getPreviewMenuData(data.menus),
      currency: data.acceptedCurrency,
      offers: data.offers,
    };
  } else if (type === "tab-menu") {
    console.log("in tab-menu", data.chefName);
    currentContent = {
      type: "menu",
      chef: data.chefName,
      menus: data.menus,
      currency: data.acceptedCurrency,
      payAtTheTable: data.payAtTheTable,
      safetyMeasures: data.safetyMeasures,
    };
  } else if (type === "tab-review") {
    console.log("in tab-review");
    currentContent = {
      type: "review",
      bestRating: data.bestRating,
    };
  }
};

export const getContentData = function () {
  return currentContent;
};
