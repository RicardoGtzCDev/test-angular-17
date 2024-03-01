import { CommonModule } from '@angular/common';
import {
  Component, InputSignal, ModelSignal, Signal, computed, input, model,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { IInscription } from '@shared/interfaces/registered-courses';

const ORDER_OPTIONS = ['Nombre (A-Z)', 'Nombre (Z-A)', 'Avance (0-100)', 'Avance (100-0)', 'Fecha de Inscripción'];
const PROGRESS_OPTIONS = ['Sin Iniciar', 'En progreso', 'Finalizado'];
@Component({
  selector: 'app-course-filter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
  ],
  templateUrl: './course-filter.component.html',
})
export class CourseFilterComponent {
  public inscriptions: InputSignal<IInscription[]> = input.required<IInscription[]>();
  public filteredInscriptions: ModelSignal<IInscription[]> = model.required<IInscription[]>();

  public sectorOptions: Signal<string[]> = computed(() => [
    ...new Set(this.inscriptions().map((value) => (value.course.sector.name))),
  ].sort((a, b) => {
    if (a < b) { return -1; }
    if (a > b) { return 1; }
    return 0;
  }));
  public progressOptions: Signal<string[]> = computed(() => [
    ...new Set(this.inscriptions().map((value) => {
      if (value.advance === 0) { return PROGRESS_OPTIONS[0]; }
      if (value.advance === 100) { return PROGRESS_OPTIONS[2]; }
      return PROGRESS_OPTIONS[1];
    }))]);

  public selectedOrder = new FormControl('');
  public selectedSector = new FormControl('');
  public selectedProgress = new FormControl('');
  public searchName = new FormControl('');

  public orderByOptions: string[] = ORDER_OPTIONS;

  constructor() { }

  orderByAndEmit = (by: string) => {
    const orderedItems = this.orderBy(by, [...this.filteredInscriptions()]);
    this.filteredInscriptions.set(orderedItems);
  };

  filterByAndEmit = () => {
    this.searchName.patchValue('');
    const orderBy = this.selectedOrder.getRawValue();
    if (orderBy) {
      const filteredItems = this.filter([...this.inscriptions()]);
      const orderedItems = this.orderBy(orderBy, filteredItems);
      this.filteredInscriptions.set(orderedItems);
    } else {
      const filteredItems = this.filter([...this.inscriptions()]);
      this.filteredInscriptions.set(filteredItems);
    }
  };

  searchByNameAndEmit = () => {
    const name = this.searchName.getRawValue();
    const orderBy = this.selectedOrder.getRawValue();
    let filteredItems = this.filter([...this.inscriptions()]);
    if ((name && name.length) && orderBy) {
      filteredItems = filteredItems.filter(
        (item) => item.course.name.toLowerCase().includes(name.toLowerCase()),
      );
      filteredItems = this.orderBy(orderBy, filteredItems);
    } else if (name?.length) {
      filteredItems = filteredItems.filter(
        (item) => item.course.name.toLowerCase().includes(name.toLowerCase()),
      );
    }
    this.filteredInscriptions.set(filteredItems);
  };

  resetForms = () => {
    this.searchName.patchValue('');
    this.selectedOrder.patchValue('');
    this.selectedSector.patchValue('');
    this.selectedProgress.patchValue('');
    this.filteredInscriptions.set(this.inscriptions());
  };

  private orderBy(by: string, items: IInscription[]): IInscription[] {
    let orderedItems: IInscription[] = [];
    switch (by) {
      case 'Nombre (A-Z)':
        orderedItems = items.sort((a, b) => {
          if (a.course.name < b.course.name) { return -1; }
          if (a.course.name > b.course.name) { return 1; }
          return 0;
        });
        break;
      case 'Nombre (Z-A)':
        orderedItems = items.sort((a, b) => {
          if (b.course.name < a.course.name) { return -1; }
          if (b.course.name > a.course.name) { return 1; }
          return 0;
        });
        break;
      case 'Avance (0-100)':
        orderedItems = items.sort((a, b) => a.advance - b.advance);
        break;
      case 'Avance (100-0)':
        orderedItems = items.sort((a, b) => b.advance - a.advance);
        break;
      case 'Fecha de Inscripción':
        orderedItems = items.sort((a, b) => {
          if (a.inscripcionDate < b.inscripcionDate) { return -1; }
          if (a.inscripcionDate > b.inscripcionDate) { return 1; }
          return 0;
        });
        break;
      default:
        orderedItems = items;
        break;
    }
    return orderedItems;
  }

  private filter(items: IInscription[]): IInscription[] {
    let filteredItems: IInscription[] = [];
    const filterSector = this.selectedSector.getRawValue();
    const filterProgress = this.selectedProgress.getRawValue();
    if (filterSector && filterProgress) {
      filteredItems = this.filterBy('sector', items, filterSector);
      filteredItems = this.filterBy('progress', filteredItems, filterProgress);
    } else if (filterSector) {
      filteredItems = this.filterBy('sector', items, filterSector);
    } else if (filterProgress) {
      filteredItems = this.filterBy('progress', items, filterProgress);
    } else {
      filteredItems = items;
    }
    return filteredItems;
  }

  private filterBy = (by: string, items: IInscription[], filter: string) => {
    let filteredItems: IInscription[] = [];
    switch (by) {
      case 'sector':
        filteredItems = items.filter((item) => item.course.sector.name === filter);
        break;
      case 'progress':
        if (filter === PROGRESS_OPTIONS[0]) {
          filteredItems = items.filter((item) => item.advance === 0);
        } else if (filter === PROGRESS_OPTIONS[2]) {
          filteredItems = items.filter((item) => item.advance === 100);
        } else {
          filteredItems = items.filter((item) => item.advance !== 0 && item.advance !== 100);
        }
        break;
      default:
        filteredItems = items;
        break;
    }
    return filteredItems;
  };
}
