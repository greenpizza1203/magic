export async function scrapeSet(id: string, actuallyScrape = true): Promise<any> {
    console.log(`scraping quizlet set #${id}`)
    if (!actuallyScrape) return;
    const response = await fetch("https://quizlet.com/webapi/3.2/terms?%5BisPublished%5D=true&filters%5BsetId%5D=" + id)

    const json = await response.json()
    const cards = json.responses[0].models.term

    return cards.filter(card => !card.isDeleted).map(({word, definition, id}) => ({word, definition, id}))

}

