"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.search = void 0;
//@ts-ignore
const google_search_results_nodejs_1 = require("google-search-results-nodejs");
const api = new google_search_results_nodejs_1.SerpApiSearch("fe68d706a01dcb6804e5081d28982113d18c7e208b78c681fa66a699c884c06a");
function json(string) {
    let query = {
        q: `site:quizlet.com ${string}`
    };
    return new Promise(resolve => api.json(query, resolve));
}
async function search(query) {
    const data = await json(query);
    return data.organic_results;
}
exports.search = search;
//# sourceMappingURL=search.js.map