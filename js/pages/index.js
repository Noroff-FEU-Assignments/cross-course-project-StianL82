import { displayError } from "../components/display_error.js"
import { fetchApiCall } from "../data/fetch_api.js";
import {loadingIndicator, showLoadingIndicator, hideLoadingIndicator} from "../components/loading_indicator.js"
let results= await fetchApiCall();

export const favoriteContainer = document.querySelector(".favorites");
export const onSaleContainer = document.querySelector(".onSale");


export async function renderFavoritesHTML(movies) {
  showLoadingIndicator();
  try {
    const favoriteMovies = movies.filter(function(movie) {
      return movie.favorite === true;
    });
  
    for (let i = 0; i < Math.min(4, favoriteMovies.length); i++) {
      const movie = favoriteMovies[i];
      const price = movie.onSale ? movie.discountedPrice : movie.price;
  
      favoriteContainer.innerHTML += `
        <div class="movie">
          <div class="moviesImage">
            <a href="/products/movie.html?id=${favoriteMovies[i].id}">
              <img
                src="${favoriteMovies[i].image}"
                alt="${favoriteMovies[i].title}"
              />
            </a>
          </div>
          <p>${favoriteMovies[i].title}</p>
          <h3>$${price}</h3>
        </div>`;
    }
  }
  catch (error) {
    const errorMessage = await displayError("An error occured when calling the API" );
    favoriteContainer.innerHTML = errorMessage;
} finally {
  hideLoadingIndicator();
}
}
renderFavoritesHTML(results);


//On Sale sorted from movies with onSale=True

export async function renderOnSaleHTML(movies) {
  showLoadingIndicator();
  try {
    const moviesOnSale = movies.filter(function(movie) {
      return movie.onSale === true;
    });
  
    for (let i = 0; i < Math.min(4, moviesOnSale.length); i++) {
      onSaleContainer.innerHTML += `
        <div class="movie">
        <div class="moviesImage">
          <a href="/products/movie.html?id=${moviesOnSale[i].id}">
              <img
                src="${moviesOnSale[i].image}"
                alt="${moviesOnSale[i].title}"
              />
            </a>
          </div>
          <p>${moviesOnSale[i].title}</p>
          <h3>$${moviesOnSale[i].discountedPrice}</h3>
        </div>`;
    }
  }
  catch (error) {
    const errorMessage = await displayError("An error occured when calling the API" );
    onSaleContainer.innerHTML = errorMessage;
} finally {
  hideLoadingIndicator();
}
}
renderOnSaleHTML(results);