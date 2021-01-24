import Tab = chrome.tabs.Tab;
import OnClickData = chrome.contextMenus.OnClickData;
import {scrapeSet} from "./quizlet";
//todo:permissions
chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
        "title": `"I'm not cheating, I'm using my resources"`,
        "id": "search",
        "contexts": ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener(handleClick)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        (async () => {
            if (request.scrape) sendResponse(await scrapeSet(request.scrape));

        })()
        return true
    }
);

export async function handleClick(info: OnClickData, tab: Tab) {
    await chrome.tabs.sendMessage(tab.id, info.selectionText, async (e) => {
        //just checking
        chrome.runtime.lastError?.message
        if (!e) {
            const target = {tabId: tab.id}
            chrome.scripting.insertCSS({files: ["mouseover.css"], target},)
            chrome.scripting.executeScript({files: ['content.js'], target}, () => {
                chrome.tabs.sendMessage(tab.id, info.selectionText);
            });
        }
    });

    // chrome.tabs.sendMessage(tab.id, info.selectionText)
    // chrome.scripting.executeScript(tab.id, info.selectionText, async (e) => {
    //     if (!e) {
    //         chrome.tabs.insertCSS({file: "mouseover.css"});
    //         await chrome.tabs.executeScript({file: 'content.js'})
    //     }
    // })
}

// chrome.runtime.lastE
