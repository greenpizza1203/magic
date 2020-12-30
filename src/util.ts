export type card = { word: string, definition: string }
export type set = card[]

export function lerpColor(a: string, b: string, amount: number): string {

    const ah = parseInt(a.replace(/#/g, ''), 16),
        ar = ah >> 16, ag = ah >> 8 & 0xff, ab = ah & 0xff,
        bh = parseInt(b.replace(/#/g, ''), 16),
        br = bh >> 16, bg = bh >> 8 & 0xff, bb = bh & 0xff,
        rr = ar + amount * (br - ar),
        rg = ag + amount * (bg - ag),
        rb = ab + amount * (bb - ab);

    return '#' + ((1 << 24) + (rr << 16) + (rg << 8) + rb | 0).toString(16).slice(1);
}

export async function getString(path:string){
    return fetchString(chrome.runtime.getURL(path))
}
export async function fetchString(url: string): Promise<string> {
    return (await fetch(url)).text();
}

export function createWorker(code: string) {

    const blob = new Blob([code], {type: 'application/javascript'});
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
