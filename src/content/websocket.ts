import {card} from "../util";
import {handleFuzzyResult} from "./content";

const url = 'ws://localhost:8080'
const ws: Promise<WebSocket> = new Promise(res => {
    const connection = new WebSocket(url)
    connection.onopen = function () {
        res(connection)
    }
    connection.onmessage = function (message) {
        const data = message.data;
        const parsed = JSON.parse(data)
        console.log(parsed)
        if (Array.isArray(parsed)) {
            requestMissing(parsed)
            handleFuzzyResult(parsed)
        } else if ('setId' in parsed) {
            let setId = parsed['setId'];
            chrome.runtime.sendMessage({scrape: setId}, response => send({[setId]: response}));
        } else if ('cards' in parsed) {
            for (const card of parsed['cards']) cache[card.id] = card
            handleFuzzyResult()
        }
    }
})
export const cache: { [key: string]: card } = {}

// window["cache"] = cache

function requestMissing(cardIds: string[]) {

    let cards = cardIds.filter(card => !cache[card]);
    if (cards.length) send({cards})
}

async function send(data: any) {
    (await ws).send(JSON.stringify(data))
}

export async function fuzzy(target: string) {
    send(target)
}

export async function serverSearch(search: string) {
    await send({search})
}
