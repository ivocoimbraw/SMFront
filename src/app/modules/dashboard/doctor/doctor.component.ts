import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DoctorAdapter, PageAdapter } from '@app/adapters';
import { DoctorService } from '@app/core/services';
import { Doctor, Page, pageDefault } from '@app/core/models';
import { PaginatorComponent, TableComponent } from '@app/shared/components';


@Component({
  selector: 'app-doctor',
  standalone: true,
  imports: [AsyncPipe, TableComponent, PaginatorComponent],
  templateUrl: './doctor.component.html',
  styleUrl: './doctor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DoctorComponent {
  doctorService = inject(DoctorService);
  pageInfo:Page = pageDefault;
  doctors$: Observable<Doctor[]> = this.loadDoctors(pageDefault.number);

  loadDoctors(pageNumber: number): Observable<Doctor[]> {
    return this.doctorService.findAllDoctor(pageNumber).pipe(
      map(result => {
        this.pageInfo = PageAdapter(result);
        return DoctorAdapter(result);
      })
    );
  }

  onPageInfoChange(newPage: Page | undefined) {
    if(newPage){
      this.doctors$ = this.loadDoctors(newPage.number);
    }
  }

  columns = [
    { field: 'id', header: 'ID' },
    { field: 'lastName', header: 'Last Name' }, 
    { field: 'dateOfBirth', header: 'Date Of Birth' },
  ];

  onElementSelected($event: Doctor) {
    console.log($event);
  }
}
