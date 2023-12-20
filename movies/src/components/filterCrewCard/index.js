import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import CardMedia from "@mui/material/CardMedia";
import img from '../../images/Search-Image.jpg'

const formControl = 
  {
    margin: 1,
    minWidth: 150,
    backgroundColor: "rgb(255, 255, 255)"
  };

export default function FilterCrewCard(props) {

  const handleChange = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value); 
  };

  const handleTextChange = (e, props) => {
    handleChange(e, "name", e.target.value);
  };

  return (
    <Card 
      sx={{
        maxWidth: 1000,
        backgroundColor: "rgb(220, 199, 225)"
      }} 
      variant="outlined">
      <CardContent>
        <Typography variant="h6" component="h1">
          <SearchIcon fontSize="large" />
          Search In Crew
        </Typography>
        <TextField
          sx={{...formControl}}
          id="filled-search"
          label="Input Crew Name"
          type="search"
          variant="filled"
          value={props.actorFilter}
          onChange={handleTextChange}
        />
      </CardContent>
      <CardMedia
        sx={{ height: 150 }}
        image={img}
        title="Filter"
      />
    </Card>
  );
}