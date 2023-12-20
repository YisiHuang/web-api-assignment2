import React from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import ManIcon from '@mui/icons-material/Man';
import WomanIcon from '@mui/icons-material/Woman';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FaceIcon from '@mui/icons-material/Face';
import Typography from "@mui/material/Typography";

const root = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 3,
    margin: 0,
};

const PersonDetails = ({ person }) => {


  return (
    <>
      <Typography variant="h4" component="h3"  style={{paddingBottom: '1em'}}>
      {person.biography ?
          person.name
        : `No Biography found for ${person.name}` }
      </Typography>

      <Typography variant="h6" component="p" style={{paddingBottom: '2em'}}>
        {person.biography}
      </Typography>
      <Paper component="ul" sx={{...root}}>
        
        {person.gender === 2 ?
            <Chip icon={<ManIcon />} label={`Male`} style={{margin:'0.25em'}} variant="outlined"/>
            : person.gender === 1 ?
              <Chip icon={<WomanIcon />} label={`Female`} style={{margin:'0.25em'}} variant="outlined"/> 
            : <Chip label={`Gender: N/B`} />}
        {person.place_of_birth ?
            <Chip
              icon={<LocationOnIcon />}
              label={`${person.place_of_birth}`}
              style={{margin:'0.25em'}}
              variant="outlined"
            />
            : <Chip
              icon={<LocationOnIcon />}
              label={`From: N/A`}
              style={{margin:'0.25em'}}
              variant="outlined"
        />}
        {person.birthday ?
            <Chip icon={<FaceIcon />} label={`${person.birthday}`} style={{margin:'0.25em'}} variant="outlined"/>
            : <Chip icon={<FaceIcon />} label={`Born: N/A`} style={{margin:'1em'}} variant="outlined"
        />}
      </Paper>
      </>
  );
};
export default PersonDetails;