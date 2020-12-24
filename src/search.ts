import OnClickData = chrome.contextMenus.OnClickData;
import Tab = chrome.tabs.Tab;
import serp from "./serp";
import {getId, getSets} from "./quizlet";


export async function handleClick(info: OnClickData, tab: Tab) {
    await improveDB(info, tab);
}

async function improveDB(info: chrome.contextMenus.OnClickData, tab: Tab) {
    console.log(info.selectionText)
    const results = await serp("site:quizlet.com " + info.selectionText)
    const ids = results.map(result => getId(result.link)).filter(it => it)
    const sets = await getSets(ids)
    sendDb(tab,sets)
}

function sendDb(tab: Tab,sets) {
    chrome.tabs.sendMessage(tab.id, sets);
}

