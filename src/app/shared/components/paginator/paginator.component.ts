import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import { Page } from '@app/core/models/page.model';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [MatPaginatorModule, AsyncPipe],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginatorComponent {
  page = input<Page>();
  pageChange = output<Page>();

  onPageChange(event: PageEvent) {
    const pageEvent: Page = {
      number: event.pageIndex,
      size: event.pageSize,
      totalElements: event.length,
    }
    this.pageChange.emit(pageEvent);
  }

}
