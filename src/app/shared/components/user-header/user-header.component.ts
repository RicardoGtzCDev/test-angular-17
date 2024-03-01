import {
  Component, InputSignal, Signal, computed, input,
} from '@angular/core';
import { IPeople } from '@shared/interfaces/registered-courses';

@Component({
  selector: 'app-user-header',
  standalone: true,
  imports: [],
  templateUrl: './user-header.component.html',
})
export class UserHeaderComponent {
  public email: InputSignal<string> = input.required<string>();
  public user: InputSignal<IPeople> = input.required<IPeople>();
  public initials: Signal<string> = computed(() => `${this.user().name.charAt(0)}${this.user().lastName.charAt(0)}`);
  constructor() { }
}
