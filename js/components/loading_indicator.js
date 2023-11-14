export const loadingIndicator = document.querySelector(".loading-indicator");

export function showLoadingIndicator() {
  loadingIndicator.style.display = "block";
}

export function hideLoadingIndicator() {
  loadingIndicator.style.display = "none";
}