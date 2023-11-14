import { apiUrl } from "../data/fetch_api.js";
import { fetchApiCall } from "../data/fetch_api.js";

export async function getMovie(id) {
  const response = await fetch(apiUrl + id);
  const movie = await response.json()
  return movie;
}

export async function moviePage(){
  const url = new URL(location.href);
  const id = url.searchParams.get("id");
  const movie = await getMovie(id);
  return movie;
}

let results= await fetchApiCall();
let productMovie = await moviePage()


function produktHTML(movie){

  const container = document.querySelector("#movieProduct");
  let price;
  if (movie.onSale) {
    price = movie.discountedPrice;
  } else {
    price = movie.price;
  }

  container.innerHTML = `
  <div class="content-wrap">
    <div class="product-container firstMovieInfo">
      <div class="movieImage">
        <img
          src="${movie.image}"
          alt="${movie.title}"
        />
      </div>
      <div class="movieInfo">
        <h1>${movie.title}</h1>
        <h2>Price: $ ${price}</h2>
        <div class="star-rate">
          <img
            src="../images/Star_1.png"
            alt="star-icon"
            class="star_icon"
          />
          <h4>${movie.rating}/10 Imdb Ranking</h4>
        </div>
        <a href="../cart.html">
          <h3 class="cta add-to-cart-button">Add to Cart</h3>
        </a>
      </div>
    </div>
  </div>`;
}
produktHTML(productMovie)



function produktInfoHTML(movie){
  const infoContainer = document.querySelector("#film-info");
  infoContainer.innerHTML = `
  <div class="content-wrap">
  <div class="film-info">
    <div class="film-info-left">
      <h3>${movie.title}</h3>
      <h4>Year: ${movie.released}</h4>
      <h4>Genre: ${movie.genre}</h4>
    </div>
    <div class="film-info-right">
      <h3>Description</h3>
      <p>
      ${movie.description}
      </p>
    </div>
  </div>
</div>
`;
}
produktInfoHTML(productMovie)



//Get 5 movies for the recommended section.

function recommendedHTML(movies) {
  const recommendedMovies = document.querySelector(".rec-images");
  for (let i = 0; i < 5; i++) {
    recommendedMovies.innerHTML += `
    <a href="/products/movie.html?id=${movies[i].id}">
            <img
              src="${movies[i].image}"
              alt="${movies[i].title}"
            />
              </a>
    `;
  }
}

recommendedHTML(results);