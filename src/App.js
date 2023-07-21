import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './App.css';

function App() {
  return (
    <Box 
      component="form"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      '& > :': { 
         m: 1,
         width: '45ch',
         
    },
    textAlign: 'center',
  }}
    noValidate
    autoComplete="off"
    >
    <div className="App">
      <h2>Minhas Receitas</h2>
      <TextField id="outlined-basic"  variant="outlined" />
      <Button 
      variant="contained"
       color="primary"
       sx={{
        width:"80px",
        marginLeft:'10px',
        height: '55px',
      }}
       >
       Buscar
      </Button>
    </div>
    </Box>
  );
}

export default App;
