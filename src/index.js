"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const quizlet_1 = require("./quizlet/quizlet");
const fs_1 = require("fs");
let buffer = JSON.parse(fs_1.readFileSync('temp.json').toString());
// let processHtml1 = proc(buffer);
(async () => {
    // const data = await search("Coffee");
    // console.log(data[0])
    // const data = [
    //     {
    //         link: 'https://quizlet.com/au/278065676/coffee-flash-cards/',
    //
    //
    //     }
    // ]
    // await quizlet(data[0].link)
    // const data = processHtml(buffer)
    const closestMatch = quizlet_1.findClosest("dash of milk", buffer);
})();
//# sourceMappingURL=index.js.map