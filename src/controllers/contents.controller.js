import {
  getAllRestuarentForALocation,
  getAllRestuarentForAName,
} from "../helpers/get.response";

import { setData } from "../models/contents.model";
import contentsView from "../views/contents.view";

export const setLocationSearchResult = async function (searchQuery) {
  console.log(`searching resturants in ${searchQuery} ........`);
  try {
    const result = await getAllRestuarentForALocation(searchQuery);
    console.log(result);
    setData(result);
    contentsView.setCurrentPage(1);
    contentsView.render();
  } catch (error) {
    console.error("Error in making API request", error);
  }
};

export const setResutarantNameSearchResult = async function (searchQuery) {
  console.log(
    `searching resturants with containing '${searchQuery}' in it's title ........`
  );
  try {
    const result = await getAllRestuarentForAName(searchQuery);
    const resultToSet = result
      .filter((item) => item.restaurant !== undefined)
      .map((item) => item.restaurant);
    console.log(resultToSet);
    setData(resultToSet);
    contentsView.setCurrentPage(1);
    contentsView.render();
  } catch (error) {
    throw error;
  }
};

export const setBothSearchResult = async function (itemQuery, locationQuery) {
  console.log(
    `searching resturants with containing '${itemQuery}' in it's title and inside ${locationQuery} ........`
  );

  try {
    const resultLocation = await getAllRestuarentForALocation(locationQuery);
    const resultItem = await getAllRestuarentForAName(itemQuery);
    console.log("location:", resultLocation);
    console.log("resturant:", resultItem);

    const filtredItemResult = resultItem
      .filter((item) => item.restaurant !== undefined)
      .map((item) => item.restaurant);

    const finalResult = filtredItemResult.concat(resultLocation);
    setData(finalResult);
    contentsView.setCurrentPage(1);
    contentsView.render();
  } catch (error) {
    throw error;
  }
};
