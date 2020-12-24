export const cache = {
    get(keys: string[]): Promise<any> {
        return new Promise<any[]>(res => chrome.storage.local.get(keys, res))

    },
    set(key, data) {
        return new Promise<void>(res => chrome.storage.local.set({[key]: data}, res))
    }
}
