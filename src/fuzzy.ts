import fuzzysort from "fuzzysort";

const db: { [key: string]: set } = {}
let prepared: card[]
let options = {keys: ["wordPrepared", "definitionPrepared"], limit: 1};

export function prepareSearch(sets: any) {
    Object.assign(db, sets)
    let targets = Object.values(db).flatMap(set => set)
    prepared = targets.map(t => ({
        ...t,
        wordPrepared: fuzzysort.prepare(t.word),
        definitionPrepared: fuzzysort.prepare(t.definition)
    }))

    console.log(prepared)


}

export function searchFuzzy(question: string) {
    if(!prepared) return
    const results = fuzzysort.go(question, prepared, options);
    return results[0]?.obj

}
