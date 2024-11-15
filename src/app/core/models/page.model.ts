export interface Page {
    totalElements: number;
    size: number;
    number: number;
}

export const pageDefault: Page = {
    number:0,
    size:0,
    totalElements:0,
}
