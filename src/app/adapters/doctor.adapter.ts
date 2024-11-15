import { Doctor, DoctorPage } from "@app/core/models/doctor.model";

export const DoctorAdapter = (doctorPage: DoctorPage) => {
    return doctorPage.content;
}