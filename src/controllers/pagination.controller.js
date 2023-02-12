import contentsView from "../views/contents.view";

export const handelClick = function (pageNo) {
  contentsView.setCurrentPage(pageNo);
  contentsView.setPageContents();
  contentsView.setPagination();
};
