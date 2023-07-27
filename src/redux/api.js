import axios from "axios";

const YOUR_APP_KEY = "2c3c813a5b4d8fc91cb6833a6374fa88";
const YOUR_APP_ID = "eaae0a2c";



export const getRecipes = async (query) => {
    const url = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`;
    return await axios.get(url);
}



