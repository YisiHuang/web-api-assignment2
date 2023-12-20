import React, { useState, useEffect } from "react";
import Cast from "../castCard";
import Grid from "@mui/material/Grid";
import ReactPaginate from 'react-paginate';
import '../movieList/index.css';

const CastList = ( {casts, action }) => {
  let castCards = casts.map((c) => (
    <Grid key={c.credit_id} item xs={10} sm={5} md={3} lg={2} xl={1}>
      <Cast key={c.credit_id} cast={c} action={action} />
    </Grid>
  ));
  return castCards;
};

const PaginatedCast = ({ casts, castsPerPage, action, isSorted })  => {
    const [castOffset, setCastOffset] = useState(0);
    const [sortedCasts, setSortedCasts] = useState([]);

    useEffect(() => {
      if (isSorted) {
        setSortedCasts([...casts].sort((a, b) => a.name.localeCompare(b.name)));
      } else {
        setSortedCasts(casts);
      }
    }, [casts, isSorted]);
  
    const endOffset = castOffset + castsPerPage;
    const currentCast = isSorted ? sortedCasts.slice(castOffset, endOffset) : casts.slice(castOffset, endOffset);
    const pageCount = Math.ceil((isSorted ? sortedCasts : casts).length / castsPerPage);
  
    const handlePageClick = (event) => {
      const newOffset = (event.selected * castsPerPage) % (isSorted ? sortedCasts.length : casts.length);
      setCastOffset(newOffset);
    };
  
    return (
      <>
        <CastList casts={currentCast} action={action} />
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< Previous"
          renderOnZeroPageCount={null}
          containerClassName={"pagination"}
          previousLinkClassName={"pagination__link"}
          nextLinkClassName={"pagination__link"}
          disabledClassName={"pagination__link--disabled"}
          activeClassName={"pagination__link--active"}
        />
      </>
    );
  }
  
export default PaginatedCast;