import {card} from "../util";
import {handleFuzzyResult} from "./content";

let server = true;

let ws: Promise<WebSocket> = createSocket()

function createSocket() {
    const url = server ? 'wss://quizlet-assist-server.herokuapp.com' : 'ws://localhost:8080';
    return new Promise<WebSocket>(res => {
        const connection = new WebSocket(url)
        connection.onopen = function () {
            res(connection)
        }
        connection.onmessage = function (message) {
            const data = message.data;
            const parsed = JSON.parse(data)
            // console.log(parsed)
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
}

export const cache: { [key: string]: card } = {}


function requestMissing(cardIds: string[]) {
    let cards = cardIds.filter(card => !cache[card]);
    if (cards.length) send({cards})
}

export async function send(data: any) {
    if (!((await ws).readyState == WebSocket.OPEN)) ws = createSocket();
    (await ws).send(JSON.stringify(data))
}

