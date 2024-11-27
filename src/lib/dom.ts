const $ = (selector: string): Element | null => document.querySelector(selector)

const $$ = (selector: string):  NodeListOf<Element> => document.querySelectorAll(selector)

export { $, $$ }