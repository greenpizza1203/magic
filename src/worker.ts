import {prepareSearch, searchFuzzy} from "./fuzzy";

const ctx: Worker = self as any;
onmessage = function (e) {
    if (typeof e.data === "object") {
        prepareSearch(e.data.prepare)
    } else {
        const response = searchFuzzy(e.data);
        console.log(`Search: "${e.data}"`, response);
        // console.log(response)
        ctx.postMessage(response);

    }

    // var workerResult = 'Result: ' + (e.data[0] * e.data[1]);
    // console.log('Posting message back to main script');
}
