import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ReactPaginate from "react-paginate";
import styled from "styled-components";
import "./pagination.css";

const PaginateStyle = styled(ReactPaginate)`
  color: white;
  list-style: none;
  margin: auto;
  width: 30%;
  display: flex;
  justify-content: space-between;
`;

const TableHeader = styled.th`
  text-align: center;
`;
const TableRow = styled.tr`
  background-color: black;
  padding-left: 2vw;
  height: 3vh;
  margin-bottom: 2vh;
  /* outline: thin solid; */
`;
const Table = styled.table`
  width: 95%;
  margin: auto;
  font-size: 1vh;
  border-collapse: separate;
  border-spacing: 0 1vh;
`;
const TableElement = styled.td`
  padding-left: 1vw;
  padding-right: 1vw;
  /* border-radius: 10px; */
`;

const FromAddress = styled(TableElement)`
  max-width: 12vw;
  word-wrap: break-word;
  /* border-radius: 10px; */
`;
const ToAddress = styled(TableElement)`
  max-width: 12vw;
  word-wrap: break-word;
`;
const TxHash = styled(TableElement)`
  max-width: 12vw;
  word-wrap: break-word;
`;

function Pagination({ itemsPerPage, items }) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  function Items({ currentItems }) {
    return (
      <Table>
        <tbody>
          <tr>
            <TableHeader>From Address</TableHeader>
            <TableHeader>To Address</TableHeader>
            <TableHeader>Amount</TableHeader>
            <TableHeader>Fees</TableHeader>
            <TableHeader>Block signed at</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader>TX Hash</TableHeader>
          </tr>
          {currentItems &&
            currentItems.map((item) => (
              <TableRow>
                <FromAddress>{item.from_address}</FromAddress>
                <ToAddress>{item.to_address}</ToAddress>
                <TableElement>{item.value}</TableElement>
                <TableElement>{item.fees_paid}</TableElement>
                <TableElement>{item.block_signed_at}</TableElement>
                <TableElement>{item.successful.toString()}</TableElement>
                <TxHash>{item.tx_hash}</TxHash>
              </TableRow>
            ))}
        </tbody>
      </Table>
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
        activeClassName="cur-item"
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
