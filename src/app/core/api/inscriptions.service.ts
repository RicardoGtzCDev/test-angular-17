import { Injectable } from '@angular/core';
import { INSCRIPTIONS } from '@core/constants/inscriptions';
import { IRegisteredCourses } from '@shared/interfaces/registered-courses';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InscriptionsService {
  private register: IRegisteredCourses = INSCRIPTIONS;
  constructor() { }

  getRegisteredCourses(): Observable<IRegisteredCourses> {
    return of(this.register);
  }
}
