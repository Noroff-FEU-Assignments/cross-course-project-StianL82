///Fetch API

export const apiUrl = "https://api.noroff.dev/api/v1/square-eyes/";

export async function fetchApiCall() {
    try {
    const response = await fetch(apiUrl);
    const videos = await response.json()
    return videos;
    }
    catch (error) {
    }
}
fetchApiCall();