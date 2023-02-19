import { requestRestuarentDetails } from "../helpers/query";
import ResturantDetailsView from "../views/details.view";
import * as model from "../models/details.model";

export const setDetailsData = async function (
  resturant_id,
  resturant_data = undefined
) {
  let data;
  if (resturant_data === undefined) {
    console.log("get resturant data with id", resturant_id);
    let response_data = await requestRestuarentDetails(resturant_id);
    let {
      data: { restaurant },
    } = response_data;
    data = restaurant;
  } else data = resturant_data;
  model.setData(data);
  console.log(data);
  ResturantDetailsView.render();
};

export const setContentData = function (content_type) {
  model.setCurrentContent(content_type);
};

export const controlContents = function (content_type) {
  setContentData(content_type);
  ResturantDetailsView.setContent();
};
