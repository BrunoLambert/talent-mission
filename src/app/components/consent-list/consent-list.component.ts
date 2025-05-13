import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsentData } from '../../types/Consent';

@Component({
  selector: 'app-consent-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'consent-list.component.html',
  styleUrls: ['consent-list.component.css']
})

export class ConsentListComponent implements OnInit {
  consents: ConsentData[] = [];

  ngOnInit() {
    fetch('/api/consents')
      .then(res => res.json())
      .then((data: ConsentData[]) => {
        this.consents = data;
      });
  }

  formatConsent(consent: ConsentData["consent"]): string {
    return Object.entries(consent)
      .filter(([_, value]) => value)
      .map(([key]) => key)
      .join(', ');
  }
}
