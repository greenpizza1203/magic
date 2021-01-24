export function getId(url: string): string | undefined {
    let parts = new URL(url).pathname.split('/');
    let id = parts.find(part => (+part).toString() == part);
    if (!id) console.warn("unable to process quizlet url" + url)
    return id;
}

export async function scrapeSet(id: string, actuallyScrape = true): Promise<any> {
    console.log(`scraping quizlet set #${id}`)
    if (!actuallyScrape) return;
    // if (actuallyScrape) {
    const response = await fetch("https://quizlet.com/webapi/3.2/terms?%5BisPublished%5D=true&filters%5BsetId%5D=" + id)
    // } else {
    //     // return;
    //     response = {json: () => temp};
    // }
    const json = await response.json()
    const cards = json.responses[0].models.term
    // noinspection ES6MissingAwait
    // cache.set(id, simplified)
    return cards.map(({word, definition, id}) => ({word, definition, id}))

}

// export async function getSets(ids: string[], scrapeNew = true) {
//     let sets = await cache.get(ids);
//     if (!scrapeNew) return sets;
//     const firstNew = ids.find(id => !sets.hasOwnProperty(id))
//     if (firstNew) sets[firstNew] = await scrapeSet(firstNew)
//     return sets;
//
// }
//

