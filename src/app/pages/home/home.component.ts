import { CommonModule } from '@angular/common';
import {
  Component, WritableSignal, inject, signal,
} from '@angular/core';
import { InscriptionsService } from '@core/api/inscriptions.service';
import { CourseCardComponent } from '@shared/components/course-card/course-card.component';
import { CourseFilterComponent } from '@shared/components/course-filter/course-filter.component';
import { CoursePaginatorComponent } from '@shared/components/course-paginator/course-paginator.component';
import { UserHeaderComponent } from '@shared/components/user-header/user-header.component';
import { IInscription, IRegisteredCourses, RegisteredCourses } from '@shared/interfaces/registered-courses';

@Component({
  selector: 'app-pages-home',
  standalone: true,
  imports: [
    CommonModule, UserHeaderComponent, CourseFilterComponent, CourseCardComponent,
    CoursePaginatorComponent, CoursePaginatorComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private apiInscriptionsService: InscriptionsService = inject(InscriptionsService);

  public register: IRegisteredCourses = new RegisteredCourses();
  public filteredInscriptions: WritableSignal<IInscription[]> = signal([]);
  public paginatedInscriptions: WritableSignal<IInscription[]> = signal([]);

  constructor() {
    this.apiInscriptionsService.getRegisteredCourses().subscribe({
      next: (response) => {
        this.register = response;
        this.filteredInscriptions.set(response.inscriptions);
      },
      error: () => { },
    });
  }

  onMappedInscriptions(event: IInscription[]): void {
    this.filteredInscriptions.set(event);
  }
}
