import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import styled from 'styled-components';
import "./pagination.css"

const PaginateStyle = styled(ReactPaginate)` 
  color: white;
  list-style: none;
  margin: auto;
  width: 30%;
  display:flex;
  justify-content: space-between;
`;

const TableHeader = styled.th` 

`;



function Pagination({ itemsPerPage, items }) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  function Items({ currentItems }) {
    return (
      <table>
        <tr>
          <th>From Address</th>
          <th>To Address</th>
          <th>Amount</th>
          <th>Fees</th>
          <th>Block signed at</th>
          <th>Status</th>
          <th>TX Hash</th>
        </tr>
        {currentItems &&
          currentItems.map((item) => (
            <tr>
              <td>{item.from_address}</td>
              <td>{item.to_address}</td>
              <td>{item.value}</td>
              <td>{item.fees_paid}</td>
              <td>{item.block_signed_at}</td>
              <td>{item.successful.toString()}</td>
              <td>{item.tx_hash}</td>
            </tr>
          ))}
      </table>
    );
  }
  

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={currentItems} />
      <PaginateStyle
        breakLabel="..."
        nextLabel=" next "
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel=" prev "
        renderOnZeroPageCount={null}
        className="Page"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
      />
    </>
  );
}

export default Pagination;

// // Add a <div id="container"> to your HTML to see the componend rendered.
// ReactDOM.render(
//   <PaginatedItems itemsPerPage={4} />,
//   document.getElementById('container')
// );