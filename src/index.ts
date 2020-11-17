import quizlet, {findClosest, processHtml} from "./quizlet/quizlet";

import {readFileSync} from "fs";

let buffer = JSON.parse(readFileSync('temp.json').toString());
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
    const closestMatch = findClosest("dash of milk", buffer)


})()
