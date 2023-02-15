import * as model from "../models/details.model";
// import ResturantDetailsView from "../views/details.view";
import ResturantDetailsView from "../views/details.view";
import { requestRestuarentDetails } from "../helpers/query";

export const setDetailsData = async function (resturant_id) {
  let data = await requestRestuarentDetails(resturant_id);
  model.setData(data);
};

export const setContentData = function (content_type) {
  model.setCurrentContent(content_type);
};

export const controlContents = function (content_type) {
  setContentData(content_type);
  ResturantDetailsView.setContent();
};
// export const set
