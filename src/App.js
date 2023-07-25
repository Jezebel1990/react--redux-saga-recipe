import './App.css';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux';
import * as types from "./redux/actionTypes";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: "45ch",
    },
  },
}));


const App = () => {
const classes = useStyles();
const [search, setSearch] = useState("");
const [query, setQuery] = useState("bolo");

const  { recipes } = useSelector((state) => state.data);

const updateSearch = () => {
  setQuery(search);
  setSearch("");
};

const dispatch = useDispatch();

useEffect(() => {
  dispatch({ type: types.FETCH_RECIPE_START, query });
}, [query]);
  return (
    <div className='App'>
     <h2>Minhas Receitas</h2>
     <form className={classes.root} noValidate autoCapitalize='off'>
     <TextField
      id='outlined-basic' 
      variant='outlined' 
      type="text" 
      value={search} 
      onChange={(e) => setSearch(e.target.value)}
      />
     <Button 
        variant='contained'
        color='primary'
        style={{ width: "80px", height: "50px" }}
        onClick={updateSearch}
        >
        Buscar
     </Button>
     {recipes && 
        recipes.hits &&
        recipes.hits.map((item) => <h4>{item.recipe.label}</h4>)}
     </form>
    </div>
  );
}

export default App;
