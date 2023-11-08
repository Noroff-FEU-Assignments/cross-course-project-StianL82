///Fetch API

export const apiUrl = "https://api.noroff.dev/api/v1/square-eyes/";

export async function fetchApiCall() {
    try {
    const response = await fetch(apiUrl);
    const videos = await response.json()
    return videos;
    }
    catch (error) {
    const errorMessage = await displayError("An error occured when calling the API" );
    console.log(error);
    }
}
fetchApiCall();