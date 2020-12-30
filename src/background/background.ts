import serp from "../serp";
import {getId, getSets} from "../quizlet";
import {prepareSearch, searchFuzzy} from "../fuzzy";
import Tab = chrome.tabs.Tab;
import OnClickData = chrome.contextMenus.OnClickData;
//
chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
        "title": `"I'm not cheating, I'm using my resources"`,
        "id": "search",
        "contexts": ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener(handleClick)

export async function handleClick(info: OnClickData, tab: Tab) {
    console.log(info.selectionText)
    injectCodeIfNeeded(tab);
    const results = await serp("site:quizlet.com " + info.selectionText)
    const ids = results.map(result => getId(result.link)).filter(it => it)
    const sets = await getSets(ids)
    await sendDb(tab, sets);
}


function injectCode(): Promise<any> {
    return new Promise(res => {
        chrome.tabs.insertCSS({file: "mouseover.css"})
        chrome.tabs.executeScript({
            file: 'content.js'
        }, res);
    })
}

function injectCodeIfNeeded(tab: chrome.tabs.Tab) {
    chrome.tabs.sendMessage(tab.id, null, async (e) => {
        if (!e) await injectCode();
    });
}


async function sendDb(tab: Tab, sets) {
    prepareSearch(sets)
}


chrome.runtime.onMessage.addListener(handleMessage)


function handleMessage(message, sender, respond) {
    const results = searchFuzzy(message);
    console.log(`Search: "${message}"`, results);
    respond(results)

}
