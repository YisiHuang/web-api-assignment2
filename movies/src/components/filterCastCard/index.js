import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import img from '../../images/Search-Image.jpg'
import CardMedia from "@mui/material/CardMedia";
import Switch from "@mui/material/Switch"; 
import FormControlLabel from "@mui/material/FormControlLabel";

const formControl = 
  {
    margin: 1,
    minWidth: 150,
    backgroundColor: "rgb(255, 255, 255)"
  };

export default function FilterCastCard(props) {
  const [isSorted, setIsSorted] = useState(false);

  const handleChange = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value);
  };

  const handleTextChange = (e, props) => {
    handleChange(e, "name", e.target.value);
  };

  const toggleSort = (event) => {
    setIsSorted(event.target.checked); 
    if (typeof props.onSortChange === 'function') {
      props.onSortChange(event.target.checked);
    }
  }

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
          Search In Cast
        </Typography>
        <TextField
          sx={{...formControl}}
          id="filled-search"
          label="Input Actor Name"
          type="search"
          variant="filled"
          value={props.actorFilter}
          onChange={handleTextChange}
        />
      </CardContent>
      <FormControlLabel
          control={<Switch checked={isSorted} onChange={toggleSort} />}
          label="Sort Alphabetically" 
        />
      <CardMedia
        sx={{ height: 150 }}
        image={img}
        title="Filter"
      />
      
    </Card>
  );
}