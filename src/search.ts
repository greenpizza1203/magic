import OnClickData = chrome.contextMenus.OnClickData;
import Tab = chrome.tabs.Tab;
import serp from "./serp";

export async function handleClick(info: OnClickData, tab: Tab) {
    console.log(info.selectionText)
    const results = await serp("site:quizlet.com " + info.selectionText)
    console.log(results)
}
