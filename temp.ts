import * as fuzzysort from "fuzzysort";
import {responses} from "./temp.json"
function findClosest(question: string, data) {
    const stuff = data.flatMap(({word, definition}) => ({word, definition}))
    const results = fuzzysort.go(question, stuff, {keys: ['word', 'definition']})
    console.log(results)
    return results[0];
}

let result = findClosest("Psychologists are skeptical about the existence of ESP because", responses[0].models.term);

console.log(result)
