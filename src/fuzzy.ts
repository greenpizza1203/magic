import Fuse from "fuse.js";

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
    // ignoreLocation: false,
    // ignoreFieldNorm: false,
    keys: [
        "word",
        "definition"
    ]
};


// Change the pattern
const pattern = ""

export function prepareSearch(sets: any) {
    Object.assign(db, sets)
    let targets = Object.values(db).flatMap(set => set)
    fuse = new Fuse(targets, options);

    // prepared = targets.map(t => ({
    //     ...t,
    //     wordPrepared: fuzzysort.prepare(t.word),
    //     definitionPrepared: fuzzysort.prepare(t.definition)
    // }))
    //
    // console.log(prepared)


}

export function searchFuzzy(question: string) {
    // if (!prepared) return
    // const results = fuzzysort.go(question, prepared, options);
    // return results[0]?.obj
    let search = fuse.search(question);
    console.log(search)
    return search

}
