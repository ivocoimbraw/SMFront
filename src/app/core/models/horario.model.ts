import { Doctor } from "./doctor.model";
import { Especialidad } from "./especialidad.model";
import { Page } from "./page.model";

export interface Horario {
    id: number;
    
    horaInicio: string;

    horaFin: string;

    maxCitas: number;

    dia: DiaSemana;

    doctor: Doctor;

    especialidad: Especialidad;
};

export interface HorarioPage extends Page{
    content: Horario[];
}

export enum DiaSemana {
    LUNES = 'LUNES',
    MARTES = 'MARTES',
    MIERCOLES = 'MIERCOLES',
    JUEVES = 'JUEVES',
    VIERNES = 'VIERNES',
    SABADO = 'SABADO',
    DOMINGO = 'DOMINGO',
  }

  const diaSemanaMap: { [key in DiaSemana]: number } = {
    [DiaSemana.LUNES]: 1,
    [DiaSemana.MARTES]: 2,
    [DiaSemana.MIERCOLES]: 3,
    [DiaSemana.JUEVES]: 4,
    [DiaSemana.VIERNES]: 5,
    [DiaSemana.SABADO]: 6,
    [DiaSemana.DOMINGO]: 0,
};


export function getHorariosRestantesDeLaSemana(horarios: Horario[]): Horario[] {
    const diaActual = new Date().getDay(); // 0 = Domingo, 1 = Lunes, etc.

    return horarios.filter(horario => diaSemanaMap[horario.dia] >= diaActual);
}