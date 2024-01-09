import { fetchApiCall } from "../data/fetch_api.js";
import {updateCartItemCount} from "./cart.js"

updateCartItemCount()

const productApiUrl = "https://squareeyes.stianlilleng.no/wp-json/wc/store/products/";

export async function getMovie(id) {
  const response = await fetch(productApiUrl + id);
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
  if (movie.on_sale) {
    price = movie.prices.sale_price/100;
  } else {
    price = movie.prices.regular_price/100;
  }

  container.innerHTML = `
  <div class="content-wrap">
    <div class="product-container firstMovieInfo">
      <div class="movieImage">
        <a href="#" id="backToLastPage"> <img
        src="/images/Back-icon.png"
        alt="back-icon"
        class="movie-back-icon"
        />Back to previous page</a>
        <img
          src="${movie.images[0].src
          }"
          alt="${movie.name}"
          />
          </div>
          <div class="movieInfo">
          <h1>${movie.name}</h1>
          <h2>Price: kr ${price.toFixed(2)}</h2>
          <a href="../cart.html">
            <h3 class="cta add-to-cart-button">Add to Cart</h3>
          </a>
          </div>
        </div>
        </div>`;

    const addToCartButton = container.querySelector(".add-to-cart-button");
    addToCartButton.addEventListener("click", function () {
      addToCart(movie);
    });
}

function addToCart(movie) {
  const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
  let found= false;

  for (let i = 0; i < existingCart.length; i++) {
    if (existingCart[i].id === movie.id){
      found=true;
      break;
    }
  }
  if (!found){
      existingCart.push(movie);
  }

  localStorage.setItem("cart", JSON.stringify(existingCart));

  updateCartPage();
}

produktHTML(productMovie)


function produktInfoHTML(movie){
  const infoContainer = document.querySelector("#film-info");
  infoContainer.innerHTML = `
  <div class="content-wrap">
  <div class="film-info">
  <div class="film-info-left">
  <h3>${movie.name}</h3>
  <h4>Year: ${movie.attributes[2].terms[0].name}</h4>
  <h4>Genre: ${movie.attributes[0].terms[0].name}</h4>
  <div class="star-rate">
    <img
      src="../images/Star_1.png"
      alt="star-icon"
      class="star_icon"
    />
    <h4>${movie.attributes[1].terms[0].name}/10 Imdb Ranking</h4>
  </div>
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
    src="${movies[i].images[0].src}"
    alt="${movies[i].name}"
            />
              </a>
    `;
  }
}
recommendedHTML(results);


const backToLastPageLink = document.getElementById("backToLastPage");

if (backToLastPageLink) {
  backToLastPageLink.addEventListener("click", () => {
    window.history.back();
  });
}