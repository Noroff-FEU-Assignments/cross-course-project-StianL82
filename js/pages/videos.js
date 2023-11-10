import { displayError } from "../components/display_error.js"
import { fetchApiCall } from "../data/fetch_api.js";
import {loadingIndicator, showLoadingIndicator, hideLoadingIndicator} from "../components/loading_indicator.js"
import { renderMovie } from "../data/render_html.js"

loadingIndicator.style.display = "block";

let results= await fetchApiCall();

const actionContainer = document.querySelector(".actionGenre");
const kidsContainer = document.querySelector(".kidsGenre");
const dramaContainer = document.querySelector(".dramaGenre");
const horrorContainer = document.querySelector(".horrorGenre");
const comedyContainer = document.querySelector(".comedyGenre");


//Render Action Movies
async function renderActionHTML(movies) {
  showLoadingIndicator();
  try {
    const actionMovies = movies.filter(function(movie) {
      return movie.genre === "Action";
    });
  
    for (let i = 0; i < Math.min(5, actionMovies.length); i++) {
      const movie = actionMovies[i];
      renderMovie(actionContainer, movie);
  }
}
  catch (error) {
    const errorMessage = await displayError("We are having trouble fetching the information from the API" );
    actionContainer.innerHTML = errorMessage;
  } finally {
    hideLoadingIndicator();
  }
}
renderActionHTML(results);


// Render Kids movies
async function renderKidsHTML(movies) {
  showLoadingIndicator();
  try {
    const kidsMovies = movies.filter(function(movie) {
      return movie.genre === "Kids";
    });
  
    for (let i = 0; i < Math.min(5, kidsMovies.length); i++) {
      const movie = kidsMovies[i];
      renderMovie(kidsContainer, movie);
    }
  }
  catch (error) {
    const errorMessage = await displayError("We are having trouble fetching the information from the API" );
    kidsContainer.innerHTML = errorMessage;
} finally {
  hideLoadingIndicator();
}
}
renderKidsHTML(results);


// Render Drama movies
async function renderDramaHTML(movies) {
  showLoadingIndicator();
  try {  const dramaMovies = movies.filter(function(movie) {
    return movie.genre === "Drama";
  });

  for (let i = 0; i < Math.min(5, dramaMovies.length); i++) {
    const movie = dramaMovies[i];
    renderMovie(dramaContainer, movie);
  }}
  catch (error) {
    const errorMessage = await displayError("We are having trouble fetching the information from the API" );
    dramaContainer.innerHTML = errorMessage;
} finally {
  hideLoadingIndicator();
}
}
renderDramaHTML(results);


// Render Horror movies
async function renderHorrorHTML(movies) {
  showLoadingIndicator();
  try {
    const horrorMovies = movies.filter(function(movie) {
      return movie.genre === "Horror";
    });
  
    for (let i = 0; i < Math.min(5, horrorMovies.length); i++) {
      const movie = horrorMovies[i];
      renderMovie(horrorContainer, movie);
    }
  }
  catch (error) {
    const errorMessage = await displayError("We are having trouble fetching the information from the API" );
    horrorContainer.innerHTML = errorMessage;
} finally {
  hideLoadingIndicator();
}
}
renderHorrorHTML(results);


// Render Comedy movies
async function renderComedyHTML(movies) {
  showLoadingIndicator();
  try {
    const comedyMovies = movies.filter(function(movie) {
      return movie.genre === "Comedy";
    });
  
    for (let i = 0; i < Math.min(5, comedyMovies.length); i++) {
      const movie = comedyMovies[i];
      renderMovie(comedyContainer, movie);
    }
  }
  catch (error) {
    const errorMessage = await displayError("We are having trouble fetching the information from the API" );
    comedyContainer.innerHTML = errorMessage;
} finally {
  hideLoadingIndicator();
}
}
renderComedyHTML(results);
