import {getString} from "../util";

type CardElement = { firstElementChild: HTMLDivElement, lastElementChild: HTMLDivElement }
export let parent: HTMLDivElement;
export let cards: CardElement[] = []

export async function createElement() {
    parent = document.body.appendChild(document.createElement('div'))
    parent.classList.add("limeLightParent", "fade", "outerFade")

    for (let i = 0; i < 3; i++) {
        const placeholder = document.createElement('div');
        placeholder.innerHTML = await getString("mouseover.html")
        // css document
        let divItem = placeholder.firstElementChild;
        const cardElement = divItem as HTMLDivElement;
        parent.appendChild(divItem);

        cards.push(cardElement as unknown as CardElement)
    }

}
