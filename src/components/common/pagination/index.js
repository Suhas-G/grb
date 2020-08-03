import React from "react";
import Pagination from "react-bootstrap/Pagination";
import { isViewportSmall } from "../../../utils/media";

const getCondensedPaginationView = (
  currentPage,
  totalPages,
  callback,
  context
) => {
  const items = [];
  if (currentPage > 2) {
    items.push(<Pagination.Ellipsis key={'ellipsisStart'}/>);
  }
  for (let page = 0; page < totalPages; page++) {
    if (page >= currentPage - 2 && page <= currentPage + 2) {
      items.push(
        <Pagination.Item
          key={page}
          active={page === currentPage}
          onClick={callback.bind(context, page)}
        >
          {page + 1}
        </Pagination.Item>
      );
    }
  }
  if (currentPage < totalPages - 3) {
    items.push(<Pagination.Ellipsis key={'ellipsisEnd'}/>);
  }

  return items;
};

const getExpandedPaginationView = (
  currentPage,
  totalPages,
  callback,
  context
) => {
  const items = [];

  for (let page = 0; page < totalPages; page++) {
    items.push(
      <Pagination.Item
        key={page}
        active={page === currentPage}
        onClick={callback.bind(context, page)}
      >
        {page + 1}
      </Pagination.Item>
    );
  }

  return items;
};

const PaginationComponent = (props) => {
  const FIRST = "FIRST";
  const LAST = "LAST";

  let PAGE_LIMIT = isViewportSmall() ? 5 : 15;

  const items = [];
  items.push(
    <Pagination.First
      key={FIRST}
      onClick={props.callback.bind(props.context, 0)}
    />
  );

  if (props.totalPages > PAGE_LIMIT) {
    items.push(
      ...getCondensedPaginationView(
        props.currentPage,
        props.totalPages,
        props.callback,
        props.context
      )
    );
  } else {
    items.push(
      ...getExpandedPaginationView(
        props.currentPage,
        props.totalPages,
        props.callback,
        props.context
      )
    );
  }

  items.push(
    <Pagination.Last
      key={LAST}
      onClick={props.callback.bind(props.context, props.totalPages - 1)}
    />
  );
  return (
    <div>
      <Pagination>{items}</Pagination>
    </div>
  );
};

export default PaginationComponent;
