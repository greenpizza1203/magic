import {searchFuzzy} from "../fuzzy";

let cardElement: HTMLDivElement;
let wordElement: HTMLDivElement;
let definitionElement: HTMLDivElement;

function injectCSS() {
    const style = document.createElement('style');
    // language=CSS
    style.innerHTML = `
        #limeLightElement {
            opacity: 1;
            transition: opacity 0.3s;
        }

        #limeLightElement.fade {
            opacity: 0;
        }
    `;
    document.head.appendChild(style);
}

const data = {
    "word": "Psychologists are skeptical about the existence of ESP because\na. ESP researchers frequently accept evidence that they know is fraudulent\nb. there is no way to scientifically test claims of ESP\nc. many apparent demonstrations of ESP have been shown to be stated illusions\nd. ESP experiments show the impact of ESP, but correlational studies do not.\ne. researchers have difficulty finding participants for ESP studies.",
    "definition": "c. many apparent demonstrations of ESP have been shown to be stated illusions",
};

async function injectElement() {
    const placeholder = document.createElement('div');
    let url = chrome.runtime.getURL("mouseover.html");
    let response = await fetch(url);
    placeholder.innerHTML = await response.text();
    cardElement = placeholder.firstChild as HTMLDivElement;
    document.body.appendChild(placeholder.firstChild);
    wordElement = document.getElementById("limeLightWord") as HTMLDivElement
    definitionElement = document.getElementById("limeLightDefinition") as HTMLDivElement
}

async function createElement() {
    injectCSS();
    await injectElement();
    wordElement.textContent = data.word
    definitionElement.textContent = data.definition

}

function handleMouse(event: MouseEvent) {
    let text = window.getSelection().toString() || getTextFromElement(event);


    updateMouseOver(text, event);
}

function getTextFromElement(event: MouseEvent) {
    const element = document.elementFromPoint(event.clientX, event.clientY) as HTMLElement;
    const tag = element?.tagName;
    if (tag !== 'P' && tag !== "SPAN" && tag !== "PRE") return;
    return element?.innerText;
}

export async function enableMouseover() {
    await createElement();
    document.onmousemove = handleMouse
}


let targetText: string;

export function updateMouseOver(text, event: MouseEvent) {
    if (targetText === text) return;
    targetText = text;
    if (text) {
        const closestCard = searchFuzzy(text)
        console.log(targetText, !!closestCard);
        (closestCard) ? showElement(closestCard, event) : hideElement()
    } else {
        hideElement()
    }
    // (text) ? showElement(text, event) : hideElement()


}

function showElement(closestCard, event: MouseEvent) {
    cardElement.style.left = event.x+40 + "px";
    cardElement.style.top = event.y+30 + "px";
    const {word, definition} = closestCard;
    wordElement.innerText = word
    definitionElement.innerText = definition
    cardElement.classList.remove("fade")
}

function hideElement() {
    cardElement.classList.add("fade")
}
