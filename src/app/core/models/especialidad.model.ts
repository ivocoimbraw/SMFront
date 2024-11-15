import { Page } from "./page.model";

export interface Especialidad {
    id: number,
    name: string;
}

export interface EspecialidadPage extends Page {
    content: Especialidad[];
}