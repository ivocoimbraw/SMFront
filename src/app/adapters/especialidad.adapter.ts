import { EspecialidadPage } from "@app/core/models/especialidad.model";

export const EspecialidadAdapter = (especialidadPage: EspecialidadPage) => {
    return especialidadPage.content;
}