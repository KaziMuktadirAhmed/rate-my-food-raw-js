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

export const setCurrentContent = function (type) {
  if (type === "tab-about") {
    currentContent = {
      type: "About",
      description: data.description,
      exchangeRates: data.exchangeRates,
      openingHours: data.openingHours,
      additionalProperty: data.additionalProperty,
    };
  } else if (type === "tab-menu") {
    console.log("in tab-menu");
    currentContent = {
      type: "Menu",
      chef: data.chefName,
      menus: data.menus,
      payAtTheTable: data.payAtTheTable,
      safetyMeasures: data.safetyMeasures,
    };
  } else if (type === "tab-review") {
    console.log("in tab-review");
    currentContent = {
      type: "Reviews",
      bestRating: data.bestRating,
    };
  }
};

export const getContentData = function () {
  return currentContent;
};
