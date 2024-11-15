import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, Input, output } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { TableColumn } from '@app/core/models/table.model';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent<T> {
  @Input() columns: TableColumn[] = [];        // Configuración de las columnas
  @Input() data: T[] = [];                     // Datos de la tabla

  dataSource = new MatTableDataSource<T>(this.data);
  displayedColumns: string[] = [];
  elementSelected = output<T>();

  ngOnChanges() {
    this.dataSource.data = this.data;
    this.displayedColumns = this.columns.map(c => c.field);
  }

  unClick(element: T) {
    console.log("Elemento seleccionado");
    this.elementSelected.emit(element);
  }

}
