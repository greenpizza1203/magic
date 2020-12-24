//@ts-ignore
// import {Page, SerpApiSearch} from "google-search-results-nodejs";

// const api = new SerpApiSearch("fe68d706a01dcb6804e5081d28982113d18c7e208b78c681fa66a699c884c06a")
//
// function json(string: string): Promise<Page> {
//     let query = {
//         q: `site:quizlet.com ${string}`
//     };
//     return new Promise(resolve => api.json(query, resolve))
// }

async function fetchJSON(query: string, api_key: string = "fe68d706a01dcb6804e5081d28982113d18c7e208b78c681fa66a699c884c06a", engine: string = "google") {
    const response = await fetch(`https://serpapi.com/search?api_key=${api_key}&q=${query}&engine=${engine}`);
    return response.json();
}

export default async function serp(query: string): Promise<{ link: string }[]> {
    const results = await fetchJSON(query);

    return results.organic_results
}
