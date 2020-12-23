import {handleClick} from "./search";

chrome.runtime.onInstalled.addListener(function () {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: {hostContains: '.schoology.com'},
            })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});

chrome.contextMenus.create({
    "title": `"I'm not cheating, I'm using my resources"`,
    "id": "search",
    "contexts": ["all"]
});
chrome.contextMenus.onClicked.addListener(handleClick)
