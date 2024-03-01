import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pages-not-found',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {
  public message: string = 'Oops... La página que estás buscando no existe o se encuentra en mantenimiento.';

  constructor() { }
}
