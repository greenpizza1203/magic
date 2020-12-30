/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/content/content.ts":
/*!********************************!*\
  !*** ./src/content/content.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.updateSelection = void 0;
const util_1 = __webpack_require__(/*! ../util */ "./src/util.ts");
const mouseover_1 = __webpack_require__(/*! ./mouseover */ "./src/content/mouseover.ts");
mouseover_1.createElement();
document.onmousemove = handleMouse;
function handleMouse(event) {
    let text = window.getSelection().toString() || getTextFromElement(event);
    mouseover_1.parent.style.left = event.x + 40 + "px";
    mouseover_1.parent.style.top = event.y + 30 + "px";
    updateSelection(text);
}
function getTextFromElement(event) {
    const element = document.elementFromPoint(event.clientX, event.clientY);
    const tag = element?.tagName;
    if (tag !== 'P' && tag !== "SPAN" && tag !== "PRE")
        return;
    return element?.innerText;
}
let targetText;
async function updateSelection(text) {
    if (targetText === text)
        return;
    targetText = text;
    if (text) {
        mouseover_1.parent.classList.remove("outerFade");
        chrome.runtime.sendMessage(text, handleFuzzyResult);
    }
    else {
        mouseover_1.parent.classList.add("outerFade");
    }
}
exports.updateSelection = updateSelection;
function handleFuzzyResult(e) {
    console.log(e);
    if (e) {
        e.forEach(({ item, score }, index) => {
            const cardElement = mouseover_1.cards[index];
            const wordElement = cardElement.firstElementChild;
            const definitionElement = cardElement.lastElementChild;
            wordElement.innerText = item.word;
            definitionElement.innerText = item.definition;
            definitionElement.style.borderTopColor = util_1.lerpColor("#1fd200", "#f00", score);
        });
        mouseover_1.parent.classList.remove("fade");
    }
    else {
        mouseover_1.parent.classList.add("fade");
    }
}


/***/ }),

/***/ "./src/content/mouseover.ts":
/*!**********************************!*\
  !*** ./src/content/mouseover.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createElement = exports.cards = exports.parent = void 0;
const util_1 = __webpack_require__(/*! ../util */ "./src/util.ts");
exports.cards = [];
async function createElement() {
    exports.parent = document.body.appendChild(document.createElement('div'));
    exports.parent.classList.add("limeLightParent", "fade", "outerFade");
    for (let i = 0; i < 3; i++) {
        const placeholder = document.createElement('div');
        placeholder.innerHTML = await util_1.getString("mouseover.html");
        // css document
        let divItem = placeholder.firstElementChild;
        const cardElement = divItem;
        exports.parent.appendChild(divItem);
        exports.cards.push(cardElement);
    }
}
exports.createElement = createElement;


/***/ }),

/***/ "./src/util.ts":
/*!*********************!*\
  !*** ./src/util.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createWorker = exports.fetchString = exports.getString = exports.lerpColor = void 0;
function lerpColor(a, b, amount) {
    const ah = parseInt(a.replace(/#/g, ''), 16), ar = ah >> 16, ag = ah >> 8 & 0xff, ab = ah & 0xff, bh = parseInt(b.replace(/#/g, ''), 16), br = bh >> 16, bg = bh >> 8 & 0xff, bb = bh & 0xff, rr = ar + amount * (br - ar), rg = ag + amount * (bg - ag), rb = ab + amount * (bb - ab);
    return '#' + ((1 << 24) + (rr << 16) + (rg << 8) + rb | 0).toString(16).slice(1);
}
exports.lerpColor = lerpColor;
async function getString(path) {
    return fetchString(chrome.runtime.getURL(path));
}
exports.getString = getString;
async function fetchString(url) {
    return (await fetch(url)).text();
}
exports.fetchString = fetchString;
function createWorker(code) {
    const blob = new Blob([code], { type: 'application/javascript' });
    // } catch (e) { // Backwards-compatibility
    //     // @ts-ignore
    //     window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;
    //     // @ts-ignore
    //     blob = new BlobBuilder();
    //     blob.append(code);
    //     blob = blob.getBlob();
    // }
    // @ts-ignore
    return new Worker(URL.createObjectURL(blob));
}
exports.createWorker = createWorker;


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
/******/ 	__webpack_require__("./src/content/content.ts");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;