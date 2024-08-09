import { FC } from "react";

import ReactPaginate from "react-paginate";
import Styles from "./Pagination.module.css";

export interface PaginationProps {
  pageCount: number;
  currentPage: number;
  pageSize: number;
}

export const Pagination: FC<PaginationProps> = () => {
  return (
    <ReactPaginate
      className={Styles.root}
      forcePage={0}
      pageCount={5}
      pageRangeDisplayed={5}
      disableInitialCallback
      breakLabel="..."
      nextLabel="next >"
      previousLabel="< prev"
      onPageChange={(selectedItem) => {
        console.log("Page clicked", selectedItem);
      }}
      hrefBuilder={(pageIndex, pageCount, selectedPage) => {
        return pageIndex === selectedPage + 1 ? undefined : "#";
      }}
    />
  );
};
