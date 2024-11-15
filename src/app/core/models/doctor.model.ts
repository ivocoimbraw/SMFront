import { Especialidad } from "./especialidad.model";
import { Page } from "./page.model";

export interface Persona {
    
    id: number,

    name: string;

    lastName: string;

    dateOfBirth: string;
}


export interface Doctor extends Persona {
    especialidades: Especialidad[];
}

export interface DoctorPage extends Page {
    content: Doctor[];
}