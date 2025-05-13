import { Routes } from '@angular/router';
import { ConsentFormComponent } from './components/consent-form/consent-form.component';
import { ConsentListComponent } from './components/consent-list/consent-list.component';

export const routes: Routes = [
    {
        path: 'new-consent',
        component: ConsentFormComponent
    },
    {
        path: 'consent-list',
        component: ConsentListComponent
    }
];
