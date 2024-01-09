///Fetch API

export const apiUrl = "https://squareeyes.stianlilleng.no/wp-json/wc/store/products?per_page=50";

export const productApiUrl = "https://squareeyes.stianlilleng.no/wp-json/wc/store/products/";

export async function fetchApiCall() {
    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`API request failed with status: ${response.status}`);
        }

        const videos = await response.json();
        return videos;
    } catch (error) {
        console.error("Error fetching data from the API:", error);
        throw error;
    }
}