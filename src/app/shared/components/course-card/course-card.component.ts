import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, InputSignal, input } from '@angular/core';
import { IInscription } from '@shared/interfaces/registered-courses';
import { TruncateTextPipe } from '@shared/pipes/truncate-text.pipe';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule, TruncateTextPipe, NgOptimizedImage],
  templateUrl: './course-card.component.html',
})
export class CourseCardComponent {
  course: InputSignal<IInscription> = input.required<IInscription>();
  constructor() { }
}
