import {cards, createElement, parent} from "./mouseover"
import {cache, fuzzy, serverSearch} from "./websocket";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    serverSearch(request)
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
    console.trace("target", targetText)

    if (targetText) {
        parent.classList.remove("outerFade")
        console.log("requesting:", targetText)
        fuzzy(targetText)
        // chrome.runtime.sendMessage(targetText, handleFuzzyResult)
    } else {
        parent.classList.add("outerFade")
    }
}

let oldCardIds = []

export function handleFuzzyResult(cardIds?: string[]) {
    if (!cardIds) cardIds = oldCardIds;
    let strings = cardIds.filter(id => cache[id]);
    if (!strings.length) {
        parent.classList.add("fade")

    } else {
        strings.forEach((id, index) => {
            const item = cache[id];
            console.log(id)
            console.log(item)
            const cardElement = cards[index];
            const wordElement = cardElement.firstElementChild;
            const definitionElement = cardElement.lastElementChild;
            wordElement.innerText = item.word;
            definitionElement.innerText = item.definition;
            // definitionElement.style.borderTopColor = lerpColor("#1fd200", "#f00", score)
        });
        parent.classList.remove("fade")

    }

    parent.classList.remove("fade")
    // parent.classList.add("fade")
}

