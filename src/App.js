import './App.css';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux';
import * as types from "./redux/actionTypes";
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun'
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';


const cardStyles = makeStyles((theme) => ({
  root: {
    width: 345,
  },

  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: "#ff83b2",
  },
}));



const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: "45ch",
    },
    backgroundImage: 'url(https://i.imgur.com/zQVlKKS.png)', 
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    minHeight: '30vh',
  },
  blueForm : {
    backgroundColor: 'blue',
  },
redIcon: {
  color: '#6a1e04',
},
headerText: {
  textAlign: 'center',
  justifyItems: 'center',
  color: 'white', 
  fontFamily: 'Roboto',
},
favoritesText: {
  textAlign: 'center',
  justifyItems: 'center',
  color: '#ff83b2', 
  fontFamily: 'Roboto',
},

}));

const gridStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  }
}));





const App = () => {

const classes = useStyles();
const gridClasses = gridStyles();
const cardClasses= cardStyles();
const [expanded, setExpanded] = useState(false);
const [cardValue, setCardValue] = useState("");
const [search, setSearch] = useState("");
const [query, setQuery] = useState("frango");
const [favorites, setFavorites] = useState([]);
const [showFavoritesText, setShowFavoritesText] = useState(false);
const  { recipes } = useSelector((state) => state.data);

const updateSearch = () => {
  setQuery(search);
  setSearch("");
};

const dispatch = useDispatch();

useEffect(() => {
  dispatch({ type: types.FETCH_RECIPE_START, query });
}, [query]);

const handleExpandClick = (index) => {
  setExpanded(!expanded);
  setCardValue(index);
};

const handleAddToFavorites = (index) => {
  if (!favorites.some((favRecipe) => favRecipe.recipe.label === recipes.hits[index].recipe.label)) {
    setFavorites([...favorites, recipes.hits[index]]);
    setShowFavoritesText(true);
  }
};

const handleShareClick =  (index) => {
  if (navigator.share && recipes && recipes.hits && recipes.hits[index] && recipes.hits[index].recipe) {
    const item = recipes.hits[index];

   navigator.share({
        title: item.recipe.label,
        text: item.recipe.ingredients,
        url: window.location.href

      })
      .then(() => {
        console.log('Conteúdo compartilhado com sucesso!');
      })
      .catch((error) => {
        console.error('Erro ao compartilhar:', error);
      });
  } else {

    alert('Compartilhamento não suportado neste navegador.');
  }
};


  return (

    <div className='App'>
     <form className={classes.root} noValidate autoCapitalize='on'>
     <TextField
      id='outlined-basic' 
      variant='outlined' 
      type="text" 
      value={search} 
      onChange={(e) => setSearch(e.target.value)}
      InputProps={{
        style: { color: '#363636' }
      }}
      />

      
     <Button 
       style={{
        backgroundColor: "#ff83b2",
        color: "white",
        width: "80px",
        height: "50px"
      }}
        onClick={updateSearch}
        >
        Buscar
     </Button>
     <h1 className={classes.headerText}>Minhas Receitas</h1>
     </form>
    
     <Grid container className={gridClasses.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={2} >
          {recipes && recipes.hits && recipes.hits.map((item, index) => (
            <Grid key={index} item >


         <Card className={cardClasses.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={cardClasses.avatar}>
            <DinnerDiningIcon/>
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={item.recipe.label}
        subheader={
         <span>
          <DirectionsRunIcon />
          {item.recipe.calories}
         </span>

        }
      />
      <CardMedia
        className={cardClasses.media}
        image={item.recipe.image}
        title={item.recipe.calories}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="Adicionar a favoritos" onClick={() => handleAddToFavorites(index)}>
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share" onClick={() => handleShareClick(index)}>
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(cardClasses.expand, {
            [cardClasses.expandOpen]: expanded,
          })}
          onClick={() => handleExpandClick(index)}
          aria-expanded={expanded}
          aria-label="Ver mais"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={index === cardValue && expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph variant='h5'>Ingredientes:</Typography>
          {item.recipe.ingredients.map((item) => (
     <Typography paragraph>{item.text}</Typography>

          ))}
     
        </CardContent>
      </Collapse>
      
    </Card>
    
            </Grid>
            
          ))}
          
        </Grid>



        <div style={{ margin:'160px' , paddingTop: '30px', justifyContent: 'center' }}>
          {showFavoritesText &&
        <h1 className={classes.favoritesText}>Receitas Favoritas</h1>
          }

      <Grid container className={gridClasses.root} spacing={2}>
        {favorites.map((favoriteRecipe, index) => (
          <Grid key={index} item xs={12} sm={6} md={4}>
            <Card className={cardClasses.root}>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={cardClasses.avatar}>
                    <DinnerDiningIcon />
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={favoriteRecipe.recipe.label}
                subheader={
                  <span>
                    <DirectionsRunIcon />
                    {favoriteRecipe.recipe.calories}
                  </span>
                }
              />
              <CardMedia
                className={cardClasses.media}
                image={favoriteRecipe.recipe.image}
                title={favoriteRecipe.recipe.calories}
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
       
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="Adicionar a favoritos" onClick={() => handleAddToFavorites(index)}>
                  <FavoriteIcon className={classes.redIcon}/>
                </IconButton>
                <IconButton aria-label="share" onClick={() => handleShareClick(index)}>
                  <ShareIcon />
                </IconButton>
                <IconButton
                  className={clsx(cardClasses.expand, {
                    [cardClasses.expandOpen]: expanded,
                  })}
                  onClick={() => handleExpandClick(index)}
                  aria-expanded={expanded}
                  aria-label="Ver mais"
                >
                  <ExpandMoreIcon />
                </IconButton>
              </CardActions>
              <Collapse in={index === cardValue && expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph variant="h5">
                    Ingredientes:
                  </Typography>
                  {favoriteRecipe.recipe.ingredients.map((ingredient, i) => (
                    <Typography key={i} paragraph>
                      {ingredient.text}
                    </Typography>
                  ))}
                </CardContent>
              </Collapse>
            </Card>
          </Grid>
        ))}
      </Grid>
      </div>
      
      </Grid>
     {/* {recipes && 
        recipes.hits &&
        recipes.hits.map((item) => <h4>{item.recipe.label}</h4>)} */}
   </Grid>
    </div>
    
  );
}

export default App;
