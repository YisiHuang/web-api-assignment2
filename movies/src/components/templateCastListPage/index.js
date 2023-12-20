import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterCastCard";
import PaginatedCast from "../castList";
import Grid from "@mui/material/Grid";

function CastListPageTemplate({ casts, title, action }) {
    const [nameFilter, setNameFilter] = useState("");
    const [isSorted, setIsSorted] = useState(false);

    let displayedCasts = isSorted
    ? [...casts].sort((a, b) => a.name.localeCompare(b.name))
    : casts;

  displayedCasts = displayedCasts.filter((c) => {
    return c.name.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
  });

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else if (type === "sort") setIsSorted(value);
  };

  return (
    <Grid container sx={{ padding: '20px' }}>
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>
      <Grid item container spacing={1}>
        <Grid key="find" item xs={10} sm={5} md={3} lg={2} xl={1}>
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            isSorted={isSorted}
            onSortChange={(value) => handleChange('sort', value)}
          />
        </Grid>
        <PaginatedCast action={action} casts={displayedCasts} castsPerPage={11} isSorted={isSorted}></PaginatedCast>
      </Grid>
    </Grid>
  );
}

export default CastListPageTemplate;