import {searchFuzzy} from "../fuzzy";

const element = document.createElement("div")

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

function createElement() {
    injectCSS();

    element.style.width = '20em'
    window["bruh"] = element;
    element.style.height = 'auto'
    element.style.position = 'absolute'
    element.style.zIndex = "100000";
    element.style.background = "#f00";
    element.style.pointerEvents = 'none'
    element.id = 'limeLightElement'
    element.classList.add("fade")
    document.body.appendChild(element)
}

function handleMouse(event: MouseEvent) {
    let text = window.getSelection().toString() || getTextFromElement(event);
    element.style.left = event.x + "px"
    element.style.top = event.y + "px";
    updateMouseOver(text);

}

function getTextFromElement(event: MouseEvent) {
    const element = document.elementFromPoint(event.clientX, event.clientY) as HTMLElement;
    const tag = element?.tagName;
    if (tag !== 'P' && tag !== "SPAN" && tag !== "PRE") return;
    return element?.innerText;
}

export function enableMouseover() {
    createElement();
    document.onmousemove = handleMouse
}


let targetText: string;

export function updateMouseOver(text) {
    if (targetText === text) return;
    targetText = text;

    (text) ? showElement(text) : hideElement()


}

function showElement(text) {
    const closestCard = searchFuzzy(text)
    if (!closestCard) return
    // console.log("found ", closestCard)
    const {word, definition} = closestCard;
    element.innerText = `${word}\n${definition}`
    element.classList.remove("fade")
}

function hideElement() {
    element.classList.add("fade")
}
