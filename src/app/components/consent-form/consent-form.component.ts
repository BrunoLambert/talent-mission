import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { isEmailValid } from '../../helpers/isEmailValid';

@Component({
  selector: 'app-consent-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: 'consent-form.component.html',
  styleUrls: ['consent-form.component.css']
})

export class ConsentFormComponent {
  name = '';
  email = '';
  consent = {
    newsletter: false,
    targetedAds: false,
    statistics: false
  };
  errorMessage = '';

  giveConsent() {
    try {
      if (isEmailValid(this.email)) {
        fetch("/api/consents", {
          method: "POST",
          body: JSON.stringify({
            name: this.name,
            email: this.email,
            consent: this.consent
          }),
          headers: { 'Content-Type': 'application/json' }
        })
      } else {
        this.errorMessage = "E-mail inválido"
      }
    } catch (error) {
      console.error(error)
    }
  }
}
