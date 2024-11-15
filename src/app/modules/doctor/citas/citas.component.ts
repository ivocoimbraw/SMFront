import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TableComponent } from "../../../shared/components/table/table.component";
import { Cita, CitaResumen, CitaService, CloudinaryService, Column, DocumentoSave, Page, pageDefault } from '@app/core';
import { map, Observable, of } from 'rxjs';
import { CitaAdapter } from '@app/adapters/cita.adapter';
import { PageAdapter } from '@app/adapters';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { DocumentoService } from '@app/core/services/documento.service';

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [TableComponent, MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule, AsyncPipe, JsonPipe,],
  templateUrl: './citas.component.html',
  styleUrl: './citas.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CitasComponent {
  idNumber: string = '';
  pageInfo: Page = pageDefault;
  citaService = inject(CitaService);
  cloudinaryService = inject(CloudinaryService);
  cita$: Observable<CitaResumen[]> = of([]);
  citaSelected!: CitaResumen;
  documentoService = inject(DocumentoService);

  loadCita(idPaciente: number, page: number): Observable<CitaResumen[]> {
    return this.citaService.findCitaByPacienteId(idPaciente, this.pageInfo.number).pipe(
      map(citaPage => {
        this.pageInfo = PageAdapter(citaPage);
        return citaPage.content.map(cita => this.convertirACitaResumen(cita));
      })
    );
  }

  search() {
    const idPaciente: number = Number(this.idNumber);
    console.log("Se colocó una ci", idPaciente);
    this.cita$ = this.loadCita(idPaciente, this.pageInfo.number);
  }

  private convertirACitaResumen(cita: Cita): CitaResumen {
    return {
      idCita: cita.id,
      idPaciente: cita.paciente.id,
      fecha: cita.fecha,
      pacienteName: cita.paciente.name,  
      horaInicio: cita.horario.horaInicio,
      horaFin: cita.horario.horaFin      
    };
  }

  onSelected($event: CitaResumen) {
    console.log($event);
    this.citaSelected = $event;
  }
    

  column: Column[] = [
    {header: 'Fecha', field: 'fecha'},
    {header: 'Paciente', field: 'pacienteName'},
    {header: 'Hora Inicio', field: 'horaInicio'},
    {header: 'Hora Fin', field: 'horaFin'},
  ]


  uploadMessage: string | null = null;
  selectedFile!: File;


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  uploadAndSave(): void {
    if (this.selectedFile) {
      this.cloudinaryService.uploadImage(this.selectedFile).subscribe({
        next: (response) => {
          console.log(response);
          const fileUrl = response.secure_url;
          console.log('Documento subido a Cloudinary:', fileUrl);

          // Crear objeto DocumentoSave
          const documento: DocumentoSave = {
            id: 0, 
            url: fileUrl,
            cita: { id: this.citaSelected.idCita }, // Reemplaza con el ID de la cita correspondiente
            paciente: { id: this.citaSelected.idPaciente }, // Reemplaza con el ID del paciente correspondiente
          };

          // Guardar el documento en el backend
          this.documentoService.saveDocumento(documento).subscribe({
            next: () => {
              console.log('Documento guardado exitosamente en el backend.');
            },
            error: (err) => {
              console.error('Error al guardar el documento en el backend:', err);
            },
          });
        },
        error: (err) => {
          console.error('Error al subir el documento:', err);
        },
      });
    } else {
      console.error('No se seleccionó ningún archivo.');
    }
  }

  }
