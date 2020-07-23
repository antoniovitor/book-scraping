class Spider {
    static links: string[] | (() => Promise<string[]>)

    static execute: (link: string) => void
}

export default Spider
