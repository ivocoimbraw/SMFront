import { Cita } from "./cita.model";
import { Paciente } from "./paciente.model";
import { Page } from "./page.model";


export interface Documento {
    id: number;
    url: string;
    createdAt: number[];
    updatedAt: number[];
    cita: Cita; 
    paciente: Paciente;
}

export interface DocumentoPage extends Page{
    content: Documento[];
}

export interface DocumentoSave {
    id: number;
    url: string;
    cita: {
        id: number
    }; 
    paciente: {id: number};
}