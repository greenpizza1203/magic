import {handleClick} from "./search";

chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
        "title": `"I'm not cheating, I'm using my resources"`,
        "id": "search",
        "contexts": ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener(handleClick)
chrome.browserAction.onClicked.addListener(injectCode);

function injectCode() {
    chrome.tabs.executeScript({
        file: 'content.js'
    });
    console.log("injecgting")
}
