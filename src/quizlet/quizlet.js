"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processHtml = exports.findClosest = void 0;
const cheerio_1 = __importDefault(require("cheerio"));
const got_1 = __importDefault(require("got"));
const string_similarity_1 = require("string-similarity");
const scaper = got_1.default.extend({
    headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:24.0) Gecko/20100101 Firefox/24.0' }
});
function findClosest(question, data) {
    const mashed = data.map(({ word, definition }) => `${word} ${definition}`);
    console.log(mashed);
    const matches = string_similarity_1.findBestMatch(question, mashed);
    console.log(data[matches.bestMatchIndex]);
}
exports.findClosest = findClosest;
async function quizlet(question, url) {
    const response = await scapeHTML(url);
    const data = processHtml(response);
    return string_similarity_1.findBestMatch(question, data);
    // const closestMatch = findClosest(question, data)
    // console.log(data)
}
exports.default = quizlet;
async function scapeHTML(url) {
    return (await scaper.get(url)).body;
}
function processHtml(html) {
    const $ = cheerio_1.default.load(html, { normalizeWhitespace: false, xmlMode: false, decodeEntities: true });
    let script = $('script').filter(function () {
        return $(this).html().startsWith('(function(){window.Quizlet["setPageData"]');
    }).html();
    let start = script.indexOf("= {") + 2;
    let end = script.indexOf("QLoad") - 2;
    let json = script.substring(start, end).toString();
    const set = JSON.parse(json).termIdToTermsMap;
    return Object.entries(set).map(([, { word, definition }]) => ({ word, definition }));
}
exports.processHtml = processHtml;
//# sourceMappingURL=quizlet.js.map