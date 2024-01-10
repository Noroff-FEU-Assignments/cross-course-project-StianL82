import { displayError } from "../components/display_error.js"
import { fetchApiCall } from "../data/fetch_api.js";
import {loadingIndicator, showLoadingIndicator, hideLoadingIndicator} from "../components/loading_indicator.js"
import { renderMovie } from "../data/render_html.js"
import {updateCartItemCount} from "./cart.js"

updateCartItemCount()

loadingIndicator.style.display = "block";

let results= await fetchApiCall();

const actionContainer = document.querySelector(".actionGenre");
const kidsContainer = document.querySelector(".kidsGenre");
const fantasyContainer = document.querySelector(".fantasyGenre");
const horrorContainer = document.querySelector(".horrorGenre");
const comedyContainer = document.querySelector(".comedyGenre");

//Render Action Movies
export async function renderActionHTML(movies) {
  showLoadingIndicator();
  try {
    const actionMovies = movies.filter(function (movie) {
      return (
        movie.attributes.some(attr => attr.name === 'genre' && attr.terms.some(term => term.name === 'Action'))
      );
    });

    for (let i = 0; i < Math.min(5, actionMovies.length); i++) {
      const movie = actionMovies[i];
      renderMovie(actionContainer, movie);
    }
  } catch (error) {
    const errorMessage = await displayError("We are having trouble fetching the information from the API");
    actionContainer.innerHTML = errorMessage;
  } finally {
    hideLoadingIndicator();
  }
}

renderActionHTML(results);


//Render Kids Movies
export async function renderKidsHTML(movies) {
  showLoadingIndicator();
  try {
    const kidsMovies = movies.filter(function (movie) {
      return (
        movie.attributes.some(attr => attr.name === 'genre' && attr.terms.some(term => term.name === 'Kids'))
      );
    });

    for (let i = 0; i < Math.min(5, kidsMovies.length); i++) {
      const movie = kidsMovies[i];
      renderMovie(kidsContainer, movie);
    }
  } catch (error) {
    const errorMessage = await displayError("We are having trouble fetching the information from the API");
    kidsContainer.innerHTML = errorMessage;
  } finally {
    hideLoadingIndicator();
  }
}

renderKidsHTML(results);


// Render Fantasy Movies
export async function renderFantasyHTML(movies) {
  showLoadingIndicator();
  try {
    const fantasyMovies = movies.filter(function (movie) {
      return (
        movie.attributes.some(attr => attr.name === 'genre' && attr.terms.some(term => term.name === 'Fantasy'))
      );
    });

    for (let i = 0; i < Math.min(5, fantasyMovies.length); i++) {
      const movie = fantasyMovies[i];
      renderMovie(fantasyContainer, movie); 
    }
  } catch (error) {
    const errorMessage = await displayError("We are having trouble fetching the information from the API");
    fantasyContainer.innerHTML = errorMessage; 
  } finally {
    hideLoadingIndicator();
  }
}

renderFantasyHTML(results);


//Render Horror Movies
export async function renderHorrorHTML(movies) {
  showLoadingIndicator();
  try {
    const horrorMovies = movies.filter(function (movie) {
      return (
        movie.attributes.some(attr => attr.name === 'genre' && attr.terms.some(term => term.name === 'Horror'))
      );
    });

    for (let i = 0; i < Math.min(5, horrorMovies.length); i++) {
      const movie = horrorMovies[i];
      renderMovie(horrorContainer, movie); 
    }
  } catch (error) {
    const errorMessage = await displayError("We are having trouble fetching the information from the API");
    horrorContainer.innerHTML = errorMessage; 
  } finally {
    hideLoadingIndicator();
  }
}

renderHorrorHTML(results);


//Render Comedy Movies
export async function renderComedyHTML(movies) {
  showLoadingIndicator();
  try {
    const comedyMovies = movies.filter(function (movie) {
      return (
        movie.attributes.some(attr => attr.name === 'genre' && attr.terms.some(term => term.name === 'Comedy'))
      );
    });

    for (let i = 0; i < Math.min(5, comedyMovies.length); i++) {
      const movie = comedyMovies[i];
      renderMovie(comedyContainer, movie); 
    }
  } catch (error) {
    const errorMessage = await displayError("We are having trouble fetching the information from the API");
    comedyContainer.innerHTML = errorMessage;
  } finally {
    hideLoadingIndicator();
  }
}

renderComedyHTML(results);