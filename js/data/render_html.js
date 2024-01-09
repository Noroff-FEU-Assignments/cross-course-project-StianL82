
export const movieHTML = (movie) => {
  let price;
  if (movie.on_sale) {
    price = movie.prices.sale_price;
  } else {
    price = movie.prices.price;
  }

  return `
    <div class="movie">
      <div class="moviesImage">
        <a href="/products/movie.html?id=${movie.id.toString()}">
          <img
            src="${movie.images[0].src}"
            alt="${movie.name}"
          />
        </a>
      </div>  
      <p>${movie.name}</p>
      <h3>kr ${ (price / 100).toFixed(2) }</h3>
    </div>
  `;
};

export function renderMovie(container, movie) {
  container.innerHTML += movieHTML(movie);
}
