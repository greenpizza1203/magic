import {search} from "./search/search";
import quizlet from "./quizlet/quizlet";


export default async function magic(query: string) {
    const url = (await search(query))[0].link
    const closestMatch = await quizlet(query, url)
    return closestMatch
}

// magic("How will automatic stabilizers affect the economy during a recession")
