import {
  Component, InputSignal, ModelSignal, Signal, WritableSignal, computed, input, model, signal,
  untracked,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { IInscription } from '@shared/interfaces/registered-courses';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-course-paginator',
  standalone: true,
  imports: [],
  templateUrl: './course-paginator.component.html',
})
export class CoursePaginatorComponent {
  public filteredInscriptions: InputSignal<IInscription[]> = input.required<IInscription[]>();
  public paginatedInscriptions: ModelSignal<IInscription[]> = model.required<IInscription[]>();

  public pagination: Signal<number[]> = computed(() => {
    const mapped: IInscription[] = this.filteredInscriptions();
    let pages = Math.floor(mapped.length / 8);
    if (mapped.length % 8 > 0) { pages += 1; }
    return [...Array(pages).keys()];
  });
  public pagination$: Observable<number[]> = toObservable(this.pagination);
  public currentPage: WritableSignal<number> = signal(1);

  constructor() {
    this.pagination$.subscribe({
      next: () => {
        this.currentPage.set(1);
        this.paginate(0);
      },
    });
  }

  previewsPage(): void {
    if (this.currentPage() > 0) {
      this.paginate(this.currentPage() - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage() < this.pagination().length - 1) {
      this.paginate(this.currentPage() + 1);
    }
  }

  paginate(page: number): void {
    this.currentPage.set(page);
    const elements = 8;
    const start = (elements * this.currentPage());
    const pagedItems: IInscription[] = [...untracked(this.filteredInscriptions)];
    this.paginatedInscriptions.set(pagedItems.splice(start, elements));
  }
}
