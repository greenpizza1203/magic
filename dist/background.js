/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/background.ts":
/*!***************************!*\
  !*** ./src/background.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.handleClick = void 0;
const quizlet_1 = __webpack_require__(/*! ./quizlet */ "./src/quizlet.ts");
//todo:permissions
chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
        "title": `"I'm not cheating, I'm using my resources"`,
        "id": "search",
        "contexts": ["selection"]
    });
});
chrome.contextMenus.onClicked.addListener(handleClick);
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    (async () => {
        if (request.scrape)
            sendResponse(await quizlet_1.scrapeSet(request.scrape));
    })();
    return true;
});
async function handleClick(info, tab) {
    await chrome.tabs.sendMessage(tab.id, info.selectionText, async (e) => {
        //just checking
        chrome.runtime.lastError?.message;
        if (!e) {
            const target = { tabId: tab.id };
            chrome.scripting.insertCSS({ files: ["mouseover.css"], target });
            chrome.scripting.executeScript({ files: ['content.js'], target }, () => {
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
exports.handleClick = handleClick;
// chrome.runtime.lastE


/***/ }),

/***/ "./src/quizlet.ts":
/*!************************!*\
  !*** ./src/quizlet.ts ***!
  \************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.scrapeSet = exports.getId = void 0;
function getId(url) {
    let parts = new URL(url).pathname.split('/');
    let id = parts.find(part => (+part).toString() == part);
    if (!id)
        console.warn("unable to process quizlet url" + url);
    return id;
}
exports.getId = getId;
async function scrapeSet(id, actuallyScrape = true) {
    console.log(`scraping quizlet set #${id}`);
    if (!actuallyScrape)
        return;
    // if (actuallyScrape) {
    const response = await fetch("https://quizlet.com/webapi/3.2/terms?%5BisPublished%5D=true&filters%5BsetId%5D=" + id);
    // } else {
    //     // return;
    //     response = {json: () => temp};
    // }
    const json = await response.json();
    const cards = json.responses[0].models.term;
    // noinspection ES6MissingAwait
    // cache.set(id, simplified)
    return cards.map(({ word, definition, id }) => ({ word, definition, id }));
}
exports.scrapeSet = scrapeSet;
// export async function getSets(ids: string[], scrapeNew = true) {
//     let sets = await cache.get(ids);
//     if (!scrapeNew) return sets;
//     const firstNew = ids.find(id => !sets.hasOwnProperty(id))
//     if (firstNew) sets[firstNew] = await scrapeSet(firstNew)
//     return sets;
//
// }
//


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/background.ts");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;