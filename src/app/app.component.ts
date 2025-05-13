import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'Talent-Mission';

  links = [
    {
      name: "Home",
      src: "/"
    },
    {
      name: "New Consent",
      src: "new-consent"
    },
    {
      name: "Consent List",
      src: "consent-list"
    }
  ]
}
