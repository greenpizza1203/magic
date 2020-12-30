import {card, lerpColor} from "../util";
import Fuse from "fuse.js";
import {cards, createElement, parent} from "./mouseover"
import FuseResult = Fuse.FuseResult;


createElement();
document.onmousemove = handleMouse

function handleMouse(event: MouseEvent) {
    let text = window.getSelection().toString() || getTextFromElement(event);
    parent.style.left = event.x + 40 + "px";
    parent.style.top = event.y + 30 + "px";
    updateSelection(text);
}

function getTextFromElement(event: MouseEvent) {
    const element = document.elementFromPoint(event.clientX, event.clientY) as HTMLElement;
    const tag = element?.tagName;
    if (tag !== 'P' && tag !== "SPAN" && tag !== "PRE") return;
    return element?.innerText;
}


let targetText: string;

export async function updateSelection(text) {
    if (targetText === text) return;
    targetText = text;

    if (text) {
        parent.classList.remove("outerFade")
        chrome.runtime.sendMessage(text, handleFuzzyResult)
    } else {
        parent.classList.add("outerFade")

    }
}

function handleFuzzyResult(e: FuseResult<card>[]) {
    console.log(e)
    if (e) {
        e.forEach(({item, score}, index) => {
            const cardElement = cards[index];
            const wordElement = cardElement.firstElementChild;
            const definitionElement = cardElement.lastElementChild;
            wordElement.innerText = item.word;
            definitionElement.innerText = item.definition;
            definitionElement.style.borderTopColor = lerpColor("#1fd200", "#f00", score)
        });

        parent.classList.remove("fade")
    } else {
        parent.classList.add("fade")
    }
}

