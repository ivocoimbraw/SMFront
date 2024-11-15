import { Persona } from "./doctor.model";

export interface Paciente extends Persona {
    cellPhone: string;
    user: User;
}


export interface User {
    id: number;
    username: string;
    email: string;
}

