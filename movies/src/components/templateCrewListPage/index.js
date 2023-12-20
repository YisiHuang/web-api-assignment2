import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterCrewCard";
import PaginatedCrew from "../crewList";
import Grid from "@mui/material/Grid";

function CrewListPageTemplate({ crews, title, action }) {
    const [nameFilter, setNameFilter] = useState("");
  
    let displayedCrews = crews
      .filter((c) => {
        return c.name.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
      })
  
    const handleChange = (type, value) => {
      if (type === "name") setNameFilter(value);
    };
  
    return (
      <Grid container sx={{ padding: '20px' }}>
        <Grid item xs={12}>
          <Header title={title} />
        </Grid>
        <Grid item container spacing={1}>
          <Grid key="find" item xs={10} sm={5} md={3} lg={2} xl={1.5}>
            <FilterCard
              onUserInput={handleChange}
              crewFilter={nameFilter}
            />
          </Grid>
          <PaginatedCrew action={action} crews={displayedCrews} crewsPerPage={11}></PaginatedCrew>
        </Grid>
      </Grid>
    );
}
export default CrewListPageTemplate;