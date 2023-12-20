import React from "react";
import PersonHeader from "../headerPerson";
import Grid from "@mui/material/Grid";
import ImageOfMale from "../../images/ImageOfMale.png";
import ImageOfFemale from '../../images/ImageOfFemale.jpg';

const TemplatePersonPage = ({ person, children }) => {

  return (
    <>
      <PersonHeader person={person} />

      <Grid container spacing={5} sx={{ padding: "100px" }}>
        <Grid item xs={4}>
          <div sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
          >
        <img alt={person.name} style={{maxWidth:"250px"}}src={ person.profile_path
                ? `https://image.tmdb.org/t/p/w500/${person.profile_path}`
                : person.gender === 1 ? ImageOfFemale 
                : ImageOfMale
            }
        />
          </div>
        </Grid>

        <Grid item xs={8}>
          {children}
        </Grid>
      </Grid>
    </>
  );
};

export default TemplatePersonPage;