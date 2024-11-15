import { Horario } from "./horario.model";
import { Paciente } from "./paciente.model";
import { Page } from "./page.model";

export enum EstadoCita {
    PENDIENTE = 'PENDIENTE',
    CANCELADA = 'CANCELADA',
    ASISTIDA = 'ASISTIDA',
    NO_ASISTIDA = 'NO ASISTIDA'
}

export interface Cita {
    id: number;
    fecha: string;  // En TypeScript, las fechas suelen manejarse como strings en formato ISO
    estado: EstadoCita;
    horario: Horario;
    paciente: Paciente;
}

export interface CitaPage extends Page{
    content: Cita[];
}

export interface CitaResumen {
    idCita: number;
    idPaciente: number;
    fecha: string;
    pacienteName: string;
    horaInicio: string;  
    horaFin: string;
}
  