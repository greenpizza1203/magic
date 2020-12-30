import Fuse from "fuse.js";
import {card, set} from "./util";
import FuseResult = Fuse.FuseResult;

const limit = 3;

const db: { [key: string]: set } = {}
let fuse: Fuse<card>
// let options = {keys: ["wordPrepared", "definitionPrepared"]};
const options = {
    // isCaseSensitive: false,
    includeScore: true,
    // shouldSort: true,
    // includeMatches: false,
    // findAllMatches: false,
    // minMatchCharLength: 1,
    // location: 0,
    // threshold: 0.6,
    // distance: 100,
    // useExtendedSearch: false,
    ignoreLocation: true,
    // ignoreFieldNorm: false,
    keys: [
        "word",
        "definition"
    ]
};


export function prepareSearch(sets: any) {
    console.log("preparing fuse: ", sets)
    Object.assign(db, sets)
    let targets = Object.values(db).flatMap(set => set)
    fuse = new Fuse(targets, options);
}

export function searchFuzzy(question: string): FuseResult<card>[] {
    // const results = fuzzysort.go(question, prepared, options);
    // return results[0]?.obj
    let search = fuse?.search(question);
    if (!search) return;
    return search.slice(0, limit);
}


