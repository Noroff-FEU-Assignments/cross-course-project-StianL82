import { displayError } from "../components/display_error.js";
import { fetchApiCall } from "../data/fetch_api.js";
import {loadingIndicator, showLoadingIndicator, hideLoadingIndicator} from "../components/loading_indicator.js";
import { renderMovie } from "../data/render_html.js"
import {updateCartItemCount} from "./cart.js"

updateCartItemCount()

let results= await fetchApiCall();
const favoriteContainer = document.querySelector(".favorites");
const onSaleContainer = document.querySelector(".onSale");

loadingIndicator.style.display = "block";


// Render movies marked as Favorite
async function renderFavoriteMoviesHTML(movies) {
  showLoadingIndicator();
  try {
    const favoriteMovies = movies.filter(function (movie) {
      return movie.categories.some(category => category.name === 'Favorite');
    });

    for (let i = 0; i < Math.min(4, favoriteMovies.length); i++) {
      const movie = favoriteMovies[i];
      renderMovie(favoriteContainer, movie);
    }
  } catch (error) {
    const errorMessage = await displayError("We are having trouble fetching the information from the API");
    favoriteContainer.innerHTML = errorMessage;
  } finally {
    hideLoadingIndicator();
  }
}

renderFavoriteMoviesHTML(results);


// On Sale sorted from movies with on_sale=true
async function renderOnSaleHTML(movies) {
  showLoadingIndicator();
  try {
    const moviesOnSale = movies.filter(function(movie) {
      return movie.on_sale === true; 
    });
  
    for (let i = 0; i < Math.min(4, moviesOnSale.length); i++) {
      const movie = moviesOnSale[i];
      renderMovie(onSaleContainer, movie);
    }
  } catch (error) {
    const errorMessage = await displayError("We are having trouble fetching the information from the API");
    onSaleContainer.innerHTML = errorMessage;
  } finally {
    hideLoadingIndicator();
  }
}

renderOnSaleHTML(results);