import {cards, createElement, parent} from "./mouseover"
import {cache, send} from "./websocket";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    (async function (search: string) {
        await send({search})
    })(request)
    sendResponse(true);
});


createElement();
document.onmousemove = (event: MouseEvent) => {
    parent.style.left = event.x + 40 + "px";
    parent.style.top = event.y + 30 + "px";
    updateSelection(getTextFromElement(event));

}

function getTextFromElement(event: MouseEvent) {
    const element = document.elementFromPoint(event.clientX, event.clientY) as HTMLElement;
    const tag = element?.tagName;
    if (tag !== 'P' && tag !== "SPAN" && tag !== "PRE") return;
    return element?.innerText;
}


let targetText: string;

export function updateSelection(mouseOverText?: string) {
    let text = window.getSelection().toString() || mouseOverText || targetText
    text = text?.trim();
    if (targetText === text) return;
    targetText = text;
    // console.trace("target", targetText)

    if (targetText) {
        parent.classList.remove("outerFade");
        // console.log("requesting:", targetText);
        // (async function (target: string) {
        send(targetText)
        // })(targetText)
    } else {
        parent.classList.add("outerFade")
    }
}

let oldCardIds = []

export function handleFuzzyResult(cardIds: string[] = oldCardIds) {
    oldCardIds = cardIds;
    let strings = cardIds.filter(id => cache[id]);
    // console.trace(strings)

    if (!strings.length) {
        parent.classList.add("fade")
    } else {
        cards.forEach((cardElement, index) => {
            cardElement.style.opacity = !strings[index] ? "0" : "1";
        })
        strings.forEach((id, index) => {

            const item = cache[id];
            // console.log(id)
            // console.log(item)
            const cardElement = cards[index];
            const wordElement = cardElement.firstElementChild;
            const definitionElement = cardElement.lastElementChild;
            wordElement.innerText = item.word;
            definitionElement.innerText = item.definition;
            // definitionElement.style.borderTopColor = lerpColor("#1fd200", "#f00", score)
        });
        parent.classList.remove("fade")

    }

}

