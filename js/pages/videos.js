import { displayError } from "../components/display_error.js"
import { fetchApiCall } from "../data/fetch_api.js";
import {loadingIndicator, showLoadingIndicator, hideLoadingIndicator} from "../components/loading_indicator.js"

loadingIndicator.style.display = "block";

let results= await fetchApiCall();

const actionContainer = document.querySelector(".actionGenre");
const kidsContainer = document.querySelector(".kidsGenre");
const dramaContainer = document.querySelector(".dramaGenre");
const horrorContainer = document.querySelector(".horrorGenre");
const comedyContainer = document.querySelector(".comedyGenre");

const movieHTML = (movie) => {
  let price;
  if (movie.onSale) {
    price = movie.discountedPrice;
  } else {
    price = movie.price;
  }

  return `
    <div class="movie">
      <div class="moviesImage">
        <a href="/products/movie.html?id=${movie.id}">
          <img
            src="${movie.image}"
            alt="${movie.title}"
          />
        </a>
      </div>  
      <p>${movie.title}</p>
      <h3>$${price}</h3>
    </div>
  `;
};


function renderMovie(container, movie) {
  container.innerHTML += movieHTML(movie);
}


//RENDER ACTION MOVIES
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
    const errorMessage = await displayError("An error occured when calling the API" );
    actionContainer.innerHTML = errorMessage;
  } finally {
    hideLoadingIndicator();
  }
}
renderActionHTML(results);


// RENDER KIDS MOVIES
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
    const errorMessage = await displayError("An error occured when calling the API" );
    kidsContainer.innerHTML = errorMessage;
} finally {
  hideLoadingIndicator();
}
}
renderKidsHTML(results);


// RENDER DRAMA MOVIES
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
    const errorMessage = await displayError("An error occured when calling the API" );
    dramaContainer.innerHTML = errorMessage;
} finally {
  hideLoadingIndicator();
}
}
renderDramaHTML(results);


// RENDER HORROR MOVIES
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
    const errorMessage = await displayError("An error occured when calling the API" );
    horrorContainer.innerHTML = errorMessage;
} finally {
  hideLoadingIndicator();
}
}
renderHorrorHTML(results);


// RENDER COMEDY MOVIES
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
    const errorMessage = await displayError("An error occured when calling the API" );
    comedyContainer.innerHTML = errorMessage;
} finally {
  hideLoadingIndicator();
}
}
renderComedyHTML(results);
