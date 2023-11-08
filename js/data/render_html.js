export const movieHTML = (movie) => {
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


export function renderMovie(container, movie) {
  container.innerHTML += movieHTML(movie);
}