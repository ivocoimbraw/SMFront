import { HorarioPage } from "@app/core/models/horario.model";


export const HorarioAdapter = (horarioPage: HorarioPage) => {
    return horarioPage.content;
}