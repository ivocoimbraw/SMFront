import { Page } from "@app/core/models/page.model";

export const PageAdapter = <T extends Page>(pageData: T): Page => {
    return {
        totalElements: pageData.totalElements,
        size: pageData.size,
        number: pageData.number
    };
};