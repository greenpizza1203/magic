import cheerio from "cheerio";
import got from "got";
import {findBestMatch} from "string-similarity";

const scaper = got.extend({
    headers: {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:24.0) Gecko/20100101 Firefox/24.0'}
});

export function findClosest(question: string, data: []) {

    const mashed = data.map(({word, definition}) => `${word} ${definition}`)
    console.log(mashed)
    const matches = findBestMatch(question, mashed);
    console.log(data[matches.bestMatchIndex])
}

export default async function quizlet(question: string, url: string) {

    const response = await scapeHTML(url);
    const data = processHtml(response)
    return findBestMatch(question, data)
    // const closestMatch = findClosest(question, data)
    // console.log(data)

}

async function scapeHTML(url: string): Promise<string> {
    return (await scaper.get(url)).body;
}

export function processHtml(html: string) {
    const $ = cheerio.load(html, {normalizeWhitespace: false, xmlMode: false, decodeEntities: true});
    let script = $('script').filter(function () {
            return $(this).html().startsWith('(function(){window.Quizlet["setPageData"]')
        }
    ).html()
    let start = script.indexOf("= {") + 2;
    let end = script.indexOf("QLoad") - 2;
    let json = script.substring(start, end).toString();
    const set: { [key: string]: any } = JSON.parse(json).termIdToTermsMap;
    return Object.entries(set).map(([, {word, definition}]) => ({word, definition}))
}
