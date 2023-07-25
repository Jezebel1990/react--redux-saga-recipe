import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


import './App.css';

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
const [query, setQuery] = useState("frango")

const updateSearch = () => {
  setQuery(search);
  setSearch("");
};

  return (
    <div className='App'>
     <h2>Minhas Receitas</h2>
     <form className={classes.root} noValidate autoCapitalize='off'>
     <TextField id='outlined-basic' variant='outlined' type="text" value={search} onChange={(e) => setSearch(e.target.value)}/>
     <Button 
        variant='contained'
        color='primary'
        style={{ width: "80px", height: "50px" }}
        onClick={updateSearch}
  
        >
     Buscar

     </Button>
     
     </form>
    </div>
  );
}

export default App;
